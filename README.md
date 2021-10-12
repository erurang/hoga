## 프로젝트 개요

hogaplay 라는 주식 모의투자 복기사이트가 존재한다. 코인도  실시간 데이터로 복기할수있는 사이트를 만들어보자

## SETUP

```
npx create-react-app
npm i styled-components
npm i react-router-dom
npm i react-helmet-async
```

## 기본 UI 계획

![image](https://user-images.githubusercontent.com/56789064/134822980-b5fb9318-0acc-449f-bff7-a6cd3ce227ce.png)


업비트의 UI를 따라서 만들계획

## 사용될 예상 라우터

- [x] 메인 페이지
- [x] 거래소 페이지
- [ ] 내 보유 코인 페이지
- [ ] 회원가입 페이지
- [ ] 입출금 페이지 ( 호가플레이에선 포인트였음 )
- [ ] 고객센터 페이지

일단 저 정도 페이지가 기본적으로 사용될것으로 추정

## 라우터 구상

1. 메인페이지
2. 거래소 페이지
3. 현재 업비트에서는 우측의 코인명을 클릭할때 라우터가 변경됨. 
   1. 거래소 url : https://upbit.com/exchange
   2. 거래소 코인 url  :  https://upbit.com/exchange?code=CRIX.UPBIT.KRW-BTC
   3. 우측의 코인명을 클릭할때마다 페이지가 변화되고 컴포넌트가 변경됨.

나머지는 차차 구상해보도록 함.

## 9/27 

서버에서 날려주는 특정 코인에 대한 정보를 요청하면 아래와 같은 데이터가 리턴됨

db에서 조건문으로 해당시간 되면 호가창변화하게 => 이건 얘기를 좀 해봐야할거같다.

1초마다 데이터를 받아와서 갱신하는 방식이 맞을지. 아니면 모든 데이터를 한번에 받아오는 방식이 맞을지

또는 데이터를 나눠서 받아오는 방식에 대해서도 알아봐야될거같다. ( 노드에는 pipe가 존재하는데.. 서버가 아직 어떨지 모르니깐.. )

![image](https://user-images.githubusercontent.com/56789064/134822963-71a46c9c-e62a-4d18-a78d-eed3355a2d43.png)
![image](https://user-images.githubusercontent.com/56789064/134822973-b914fef9-7403-4b07-a04e-c98c9913f5ab.png)

예상 플로우를 그려보면

프론트에서 모의투자(데이터를받을) 날짜를 정함
날짜를 정하고 코인을 정함
날짜와 코인에 맞는 데이터를 요청해서 가져옴
가져온 데이터를 화면에 표시
재생(시작)버튼을 누르면 호가창이 1초(… 이건 db에서 정해주는대로 만들기) 마다 갱신됨

필요한 상태 리스트

1.	날짜 선택하였나?
2.	코인을 선택하였나?
3.	시작버튼을 눌렀나?
4.	로딩상태인가?
5.	로딩이 끝난후 성공/실패 상태인가?
6.	시작버튼을 누른후 진행시각(timestamp)

## 9/29 ~30

데이터를 일단 받아와서 1초에 표현하는식으로 개발했음.

기존 개발 계획

1. 타이머가 흘러가면서 체결데이터가 존재하면 화면을 업데이트함

27일 개발

1. 타이머가 흘러감과 상관없이 체결데이터의 `timestamp`로 1초간격으로 화면을 업데이트함

내가 개발전에 걱정했던 부분은 이랬음.

1. 타이머가 millisecond 단위이다
    1. 그럼 밀리세컨드 단위로 db의 `timestamp`의 데이터와 비교한다
        1. 0.001초마다 db의 `timestamp`가 존재하는지 비교한다??
        2. 0.001초만에 수많은 데이터를 비교하여 화면을 갱신할수있을까?

위와 같은 의문이 많았다. 그래서 다시 아래처럼 생각해보았다.

1. 날짜를 선택한다. (0)
2. 코인을 선택한다. (0)                                         
3. 1 and 2 === true => 체겯데이터를 가져온다. (0)
    1. 체결데이터의 `timestamp` 현재값과 다음값의 상태를 전역으로 기억한다. (0)
4. 타이머 시작 버튼을 누른다. (0)
    1. 타이머의 `timestamp`와 체결데이터의 `timestamp`와 비교한다 (0)
        1. 타이머 `timestamp` >= 체결데이터 `timestamp` 라면 (0)
        2. 체결데이터 `timestamp` 상태를 다음 체결데이터로 갱신한다 (0)
        3. 화면을 업데이트한다 (0)

지금 생각되는 필요한 상태는 아래정도일꺼같다.

1. 날짜를 선택해야한다.
    1. 날짜가 있어야 그 날짜의 `timestamp` 값을 구할수있음.
    2. 선택한 날짜를 전역으로 관리한다.
2. 타이머의 `timestamp`를 전역으로 관리한다.
3. 체결데이터의 `timestamp`를 전역으로 관리한다.
4. 타이머의 시작 정지를 전역으로 관리한다.

기능 구현 완료.

## 10/1

+1 +5 +10 +30 ... 으로 버튼을 누를시에 타임스탬프 이동하는 방법에 대해얘기를 해보았다.

일단 처음 얘기는 각 시간(1분) 마다 `(시간: [timestamp])` 형식으로 저장해두는것이다.

근데 이렇게 하려고 막상 생각해보니까.. 분당 데이터로 생각해도 60x24 총 1200개 정도의 배열이 필요하다.

이걸 하나하나 키벨류로 만들기엔 너무 무리라고 생각했다.

그래서 생각이난것이. 어짜피 체결데이터의 시간으로 움직이면 되지않을까? 하는 생각이 들었다.

그래서 이동바(range)에 `value` 값을 `0~(코인 timestamp 갯수)` 로 설정해두고

게이지가 움직일때마다 새 상태를 갱신하도록 만들면 굳이 배열을 만들 필요가 없다는 생각을 했다.

결론은 잘 작동한다.

이제 남은 작업은 `현재가 대비%,` 각 `timestamp의` `체결량 `, `컴포넌트 최적화` ,` CSS, db <-> front api `실험 정도 남은거같다.

## 10/2~4

새로운 타이머 기능을 추가하면서 우연히 발견한 문제점

왜 타이머가 내가 세는 속도보다 느리게 업데이트되는거같지..?

그래서 테스트를 해보니깐 한 10초 부분부터 기존의 타이머보다 느려지기 시작하더니 시간차이가 계속 늘어나는걸 발견했다.

또는 아예 1초같은 2초로 작동하는 경우도 있었다.

왜 느려지나 생각해볼말한건.. 화면의 업데이트가 느리다 라는것은.. 브라우저의 렌더링이 잦아서 연산을 많이 한다는뜻.

즉 컴포넌트 렌더링을 횟수를 줄여야만 했다. 리액트에서 컴포넌트가 렌더링된다?

1. 컴포넌트의 `state`에 변경이 일어난다
2. `props`의 변경이 일어난다  

나는 위의 과정중 1번이 매번 일어났다. 왜냐하면 현재의 상태는 하나의 `contextAPI`에서 관리되기 떄문이다.

사용한 `useReducer()`의 경우 상태 변화가 일어나면 컴포넌트를 렌더링한다.

나는 모든 컴포넌트에 하나의 `useReducer()`를 연결하여 상태를 관리하고있었다.

즉 아래의 모든 경우에 렌더링이 계속 일어났다는 것이다.

1. 날짜를 바꾼다
2. 코인을 선택한다
3. play버튼을 누른다
4. 1,5,10,30분 이동 버튼을누른다
5. 타이머가 실행되는 0.01초마다
6. 호가창 업데이트

가장 큰 원인은 5번이다. 타이머가 실행되면 0.01초마다 모든 컴포넌트의 렌더링이 일어난다.

즉 나는 상태를 좀더 세부적으로 나눌 필요성이 생겼다.

==> 나는 기존의 상태관리를 이렇게 바꿧다

- ### Context API로 전역으로 관리하던 데이터들
   - 날짜
   - 코인선택여부
   - 타이머의 시작여부
   - 타이머의 0.01초 마다의 timestamp 갱신
   - 날짜와 코인을 선택후 불러올 코인 데이터 정보

- ### Context API
   - 날짜 선택여부
   - 코인 선택여부

=> 날짜 && 코인 === true 라면 `ChartContainer`에서 useEffect를 통해 API 요청

이때 `Chart` 컴포넌트를 생성시키고 `Chart` 컴포넌트에서 코인의 데이터를 관리함

코인의 데이터를 `props`로 `timer` 컴포넌트로 넘김 `timer`에선 시간 상태만 관리

`timer`컴포넌트에서 `orderbook` 화면으로 넘겨 전체 체결화면을 만듬

이제 0.01초씩 시간이 지날때마다 불필요한 렌더링이 사라지게 되었음.

## 10/5

체결데이터로 호가만들기 시작. 내가 api 테스트할려고 임의 서버로 만들어서 아래처럼 관리함

```
getData() {
    return {
      hoga: {
        coinName: Object.values(axs_hoga.code)[0],
        orderbook: Object.values(axs_hoga.orderbook_units),
        timestamp: Object.values(axs_hoga.timestamp),
        total_ask_size: Object.values(axs_hoga.total_ask_size),
        total_bid_size: Object.values(axs_hoga.total_bid_size),
      },
      trade: {
        prev_closing_price: Object.values(axs_trade.prev_closing_price)[0],
        // trade timestamp랑 timestamp랑 뭔차인지모르겟다
        timestamp: Object.values(axs_trade.timestamp),
        change: Object.values(axs_trade.change),
        change_price: Object.values(axs_trade.change_price),
        trade_price: Object.values(axs_trade.trade_price),
        trade_volume: Object.values(axs_trade.trade_volume),
        ask_bid: Object.values(axs_trade.ask_bid),
      },
      ticker: {
        timestamp: Object.values(axs_ticker.timestamp),
        trade_price: Object.values(axs_ticker.trade_price),
        trade_volume: Object.values(axs_ticker.trade_volume),
      },
    };
  }
```

아마 이렇게하면 되지않을까 싶다

1. `Chart` 컴포넌트에서 한번에 데이터를 다 받아온다 
2. `timer` 컴포넌트에서 현재 `timestamp`와 `tradedata`를 `trade` 컴포넌트로 넘겨줌
3. `trade` 컴포넌트에서 받은 데이터를 표시함

기능구현완료 

오류 내역

- [x] trade는 hoga보다 훠어어얼씬 많은 체결데이터가 필요함. 안그러면 Trade 컴포넌트 오류뜸 => 수정

## 10/6~8

- [x] lightning-chart 라이브러리를 사용하여 차트 그리기
- [x] tiemstamp가 trade,ticker,hoga 인덱스의 최대 timestamp를 넘어가면 오류띄우기
- [x] 체결의 timestamp와 chart의 timestamp를 맞추기위해 trade timestamp를 trade_timestmp로 변경
- [x] chart histogram volume 중복된 index의 거래량을 계속 더하는 버그 수정하기
- [x] 1/5/10/30 버튼을 눌렀을때 받아온 데이터에 timestamp.findIndex() === -1이면 데이터없음 팝업띄어야함

## 10/9~
- [x] orderbook에서 현재 거래되는 호가창 가격칸의 박스에 검은테두리 표시가 되지 않았던 버그 수정
- [x] api로 받아온 getData의 정보를 context로 바꿔 props를 없앤다.
- [x] 시간지연이 일어나는 이유는 무엇인가? 성능테스트
  - [ ] setTimeout과 setInterval?
- [x] 분봉을 눌렀을때 timer timestamp와 각 컴포넌트 index를 최신화시킴
- [ ] 분봉을 눌렀을때 chart와 volume 캔들 업데이트
- [ ] Code Refactor
- [ ] 전체적인 CSS 수정

## Code Refactor

1. Styled를 사용할때 네이밍 구분을 해주지않아 Styled 인지 Component인지 구분이 불가함.
   - [x] Styled 컴포넌트 뒤에 Styled를 붙여 구분하도록 변경할것
2. 컴포넌트의 구분 파일이 나누어있지 않아서 어떤게 어떤역할을 하는지 구분하기 힘듬
   - [x] 폴더로 구분해놓거나 네이밍을 routes.name 식으로 맞춰보자
3. Timer컴포넌트에서 orderbook/trade/lightchart/cointitle 의 4개의 컴포넌트를 가지고있음(독립적이지못함)
   - [x] timer에서 index까지 관리하여 쏴주는것이아니라 Context로 돌려서 상태를 받아올수있도록함
4. 중복된 코드의 CSS가 많음. 이걸 줄일 방법을 고안할것
   - [x] styled의 props를 통한 재사용성 높일것

### getData를 context로 지정하기

- [x] api로 받아온 getData의 정보를 context로 바꿔 props를 없앤다.

어느정도 기능을 구현한후에 나는 내 코드가 매우 난잡하다는 생각이들었다. 특히 상태관리와 Props를 Props.. 하는 이 사태가 너무 맘에들지않았다.

그리고 이것을 해결하기위해선 전역 상태 라이브러리 Redux와 리액트에서 제공하는 `ContextAPI`를 사용하는 방법밖엔 없었다.

README.md의 10/2~4일 개발 기록 글중 이런 나는 문장을 썻다

```
가장 큰 원인은 5번이다. 타이머가 실행되면 0.01초마다 모든 컴포넌트의 렌더링이 일어난다.
즉 나는 상태를 좀더 세부적으로 나눌 필요성이 생겼다.
```

처음에는 Context에 timer timestamp를 상태에 같이넣어두어서 context를 사용하는 모든 컴포넌트에서 0.01초마다 렌더링이 일어났다.

모든 컴포넌트가 0.01초마다 timestamp의 변경으로 렌더링이 일어나는것을 막기위해

timestamp를 한 컴포넌트에서 담당하여 필요한 컴포넌트에 Props를 해주는 방법으로

전체 컴포넌트의 렌더링 연산 횟수를 줄인다.

즉 timer 하나의 컴포넌트에서 상태를 가지고, 나머지 공통되는 데이터들은

날짜와 코인을 다시 설정하지않는이상 바뀔일이 없기떄문에 컴포넌트에서 렌더링이 한번만 일어날것이다.

Context
- getData selectDate selectCoin isPlay error(messege)

Timer 컴포넌트
- hours,minutes,seconds,milliseconds,timestamp
- index(timer timestamp와 data timestamp)
- tradeIndex

컴포넌트 구상과 상태관리는 아래 그림처럼 되어있다.

<img width="871" alt="스크린샷 2021-10-09 오전 3 49 11" src="https://user-images.githubusercontent.com/56789064/136610720-00b5ac50-2016-41ec-8192-9db51690b754.png">

각 컴포넌트에서 쓸떄없는 Prop와 중복되는 상태를 관리하는것을 볼수있다.

그래서 이것을 전역으로 돌리기위한 Refactor 작업을 하려한다.

- [x] Context를 아래처럼 변경함

```
const select = {
  date: null,
  coin: null,
  error: false,
};

const timer = {
  timestamp: 0,
  isPlay: false,
};

//// ⬇ ////

const base = {
  date: null,
  coin: null,
  error: null,
  loading: true,
  hoga: {},
  trade: {},
  ticker: {},
};
```

### 발견된 사이드이펙트..?

~~현재 타이머의 컴포넌트가 매우우우우 느린속도로 업데이트된다.. 1초가 흐르는데 거의 5초정도가 흐른다. ~~

~~이렇게 오래 걸린다는건.. 너무나 많은 렌더링 연산작업이 들어간다는것..~~

~~이게 느려질만한게 생각해보면 0.01초마다 `<Timer> <Orderbook> <Lightchart> <Trade>` 4개 컴포넌트의 조건문들을 둘러보고~~

~~상태를 0.01초마다 동시다발적으로 업데이트하고..  하니까 안느려질래야 안느려질수가 없는거같다..~~

~~컴포넌트의 렌더링을 줄일 방법과 현재의 비교 조건의 시간복잡도를 더 줄일 생각을 해야할거같다. (현재도 n번이긴한데..)~~

~~그리고 CSS가 렌더링에 미치는 영향도 고려해야할 부분이다. (레이아웃이 다시 일어나는 요소들을 없애기위해..) 한번 문제가 무엇인지 한번 찾아봐야할거같다.~~

위의 고민과는 다른 점에서 문제를 발견했다. 위의 말 그대로 렌더링이 자주 일어난다는것은 상태변경, props의 변경, 부모컴포넌트의 변경이 일어난다는것이다.

그래서 내가 짠 코드를 하나하나 다시 보았다. 아.. 이거였구나 하고 발견한것은 이 부분이다.

 ![스크린샷 2021-10-10 오후 8 36 10](https://user-images.githubusercontent.com/56789064/136693821-7edfed0b-39b4-4a16-bd34-f089a3714259.png)
 <img width="835" alt="스크린샷 2021-10-11 오후 5 08 34" src="https://user-images.githubusercontent.com/56789064/136754902-e7977f2c-9d08-49a1-98a4-c53ae8d7e45e.png">

처음에는 timestamp를 전역(`contextAPI`)로 두어 context를 사용하는 모든 컴포넌트에서 똑같이 0.01초마다 렌더링이 일어났다.

성능이 안좋아지는걸 눈으로 발견후에 Timer컴포넌트에서 timestamp만 관리하도록 변경하였고

Timestamp가 0.01초 동안 변할때마다 trade orderbook ticker의 timestamp배열과 비교하여  index를 기억하는 방식으로 변경하였다. 

하지만 이 방법도 타이머 컴포넌트 안에서 다른 컴포넌트를 부른다는 점에서 컴포넌트 독립성이 낮다고 생각이들었다.

그래서 index자체도 context로 돌려 컴포넌트간의 종속성을 최소화시켰다. 나는 쓸때없는 렌더링 시간을 최대한 줄여서 시간지연을 해결하는것이 목표였다. 

테스트 결과 1시간이 흐르는데 로컬에서는 1시간 15분정도가 걸린다. 뭐지 렌더링 시간이 긴건가? 무슨일이지? 성능 테스트를 안해볼수없었다.

## 10/11~12

### 성능 테스트

- [x] 시간지연이 일어나는 이유는 무엇인가? 성능테스트

1. 기존에 `Timer`에서 모든 로직을 담당하고 index를 다른 컴포넌트로 `props`로 넘겨줄때의 성능
   1. `React.memo`를 제거했을때와 안했을떄의 성능
2. `Timer`에서 모든 상태를 context로 넘겨 컴포넌트를 분리하여 다른 컴포넌트는 context에서 받아올때의 성능
   1. `React.memo`를 제거했을떄와 안했을떄의 성능

### 1번의 경우.

<img width="1285" alt="스크린샷 2021-10-12 오전 12 56 28" src="https://user-images.githubusercontent.com/56789064/136820258-d176e671-2332-471f-b7ed-09f93315560a.png">

`props`로 넘겨주었지만 `React.memo`로 인해 리렌더링이 일어나지않아 `hoga/trade/lightchart/cointitle` 값이 업데이트될떄 3.5~6ms 정도 소요되고

0.01초마다 `Timer` 컴포넌트의 변경으로는 0.1~0.3초 정도의 렌더링 시간이 소요된다

### 1-1번의 경우 

<img width="1401" alt="스크린샷 2021-10-12 오전 2 51 58" src="https://user-images.githubusercontent.com/56789064/136833555-7364badb-068c-454e-9753-8a16d3b5b9bb.png">

`Timer(부모) `컴포넌트가 업데이트될떄마다 `hoga/trade/lightchart/cointitle`(자식) 컴포넌트가 렌더링이 일어나는데

0.01초의 렌더링마다 2.5~3ms의 시간이 소요되며 자식 컴포넌트가 업데이트 될때도 최소 5.5ms의 렌더링시간이 소요된다

### 2번의 경우

<img width="1375" alt="스크린샷 2021-10-12 오전 2 36 54" src="https://user-images.githubusercontent.com/56789064/136831917-5efb3608-26ef-464e-a11c-ed9a266fd789.png">

1번의 경우와 비슷한걸 볼수있다.

### 2-1번의 경우

`React.memo`의 사용과 무관하게 `contextAPI`의 `useReducer`에서 상태가 변화될때만 컴포넌트를 업데이트시키기때문에 1번과 2번과 2-1번은 차이가없었다.

### 즉 시간지연은 컴포넌트의 렌더링에 관계가없다.

나는 컴포넌트의 렌더링이 늦어지기때문에 시간 지연이 일어났다고 생각했다. 그래서 여러 경우를 나눠서 성능 테스트를 해본결과.. 매번 컴포넌트가 렌더링되는데 매번 최고수준의 시간(6ms)마다 업데이트된다고해도 10ms(0.01초) 안으로 렌더링이 되기때문에

성능 문제는 아니라는것을 알았다. 그럼 대체 뭐때문에 나는 시간지연을 겪고있는건가??

[setTimeout과 setInterval을 이용한 호출 스케줄링](https://ko.javascript.info/settimeout-setinterval)글을 공부해보자.

## 10/12~

- [x] 분봉을 눌렀을때 timer timestamp와 각 컴포넌트 index를 최신화시킴

이전까지는 시간 이동 버튼을 눌렀을때 timer의 timestamp만 업데이트 시켯다.

그래서 `time.timestamp >= component timestamp`를 계속 만족하는 상황이 나와서 아래 3개의 dispatch가 계속 작동하였다.

즉 수정된 timestamp가 될때까지 까지 계속 +1씩 인덱스를 업데이트하여 페이지가 맛이가는 경우가생겼다. (버튼을눌러도 반응을안함..)

```
orderbookDispatch({ type: actionType.SET_ORDERBOOK_INDEX });
tradeDispatch({ type: actionType.SET_TRADE_INDEX });
tickerDispatch({ type: actionType.SET_TICKER_INDEX });
```

그래서 아래처럼 새로 만들어진 timestamp와 비교하여 인덱스를 덮어씌워 주었다.
```
const tradeIndex = trade_timestamp.findIndex((t) => {
        return t >= +newDate;
      });

const orderbookIndex = timestamp.findIndex((t) => {
        return t >= +newDate;
      });

const tickerIndex = tic_trade_timestamp.findIndex((t) => {
        return t >= +newDate;
      });

tradeDispatch({
        type: actionType.CLICK_MINUTES_BUTTON,
        num: tradeIndex,
      });

orderbookDispatch({
        type: actionType.CLICK_MINUTES_BUTTON,
        num: orderbookIndex,
      });

tickerDispatch({
        type: actionType.CLICK_MINUTES_BUTTON,
        num: tickerIndex,
      });
```
