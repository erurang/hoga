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

1. 메인 페이지
2. 거래소 페이지
3. 내 보유 코인 페이지
4. 회원가입 페이지
5. 입출금 페이지 ( 호가플레이에선 포인트였음 )
6. 고객센터 페이지

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

상태관리는 일단 context API 사용, 필요한 상태 리스트

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

1. 타이머가 흘러감과 상관없이 체결데이터의 timestamp로 1초간격으로 화면을 업데이트함

내가 개발전에 걱정했던 부분은 이랬음.

1. 타이머가 millisecond 단위이다
    1. 그럼 밀리세컨드 단위로 db의 timestamp의 데이터와 비교한다
        1. 0.001초마다 db의 timestamp가 존재하는지 비교한다??
        2. 0.001초만에 수많은 데이터를 비교하여 화면을 갱신할수있을까?

위와 같은 의문이 많았다. 그래서 다시 아래처럼 생각해보았다.

1. 날짜를 선택한다. (0)
2. 코인을 선택한다. (0)                                         
3. 1 and 2 === true => 체겯데이터를 가져온다. (0)
    1. 체결데이터의 timestamp 현재값과 다음값의 상태를 전역으로 기억한다. (0)
4. 타이머 시작 버튼을 누른다. (0)
    1. 타이머의 timestamp와 체결데이터의 timestamp와 비교한다 (0)
        1. 타이머 timestamp >= 체결데이터 timestamp 라면 (0)
        2. 체결데이터 timestamp 상태를 다음 체결데이터로 갱신한다 (0)
        3. 화면을 업데이트한다 (0)

지금 생각되는 필요한 상태는 아래정도일꺼같다.

1. 날짜를 선택해야한다.
    1. 날짜가 있어야 그 날짜의 timestamp 값을 구할수있음.
    2. 선택한 날짜를 전역으로 관리한다.
2. 타이머의 timestamp를 전역으로 관리한다.
3. 체결데이터의 timestamp를 전역으로 관리한다.
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

이제 남은 작업은 현재가 대비%, 각 timestamp의 체결량 , 컴포넌트 최적화 , CSS, db <-> front api 실험 정도 남은거같다.

## 10/2~4

새로운 타이머 기능을 추가하면서 우연히 발견한 문제점

왜 타이머가 내가 세는 속도보다 느리게 업데이트되는거같지..?

그래서 테스트를 해보니깐 한 10초 부분부터 기존의 타이머보다 느려지기 시작하더니 시간차이가 계속 늘어나는걸 발견했다.

또는 아예 1초같은 2초로 작동하는 경우도 있었다.

왜 느려지나 생각해볼말한건.. 화면의 업데이트가 느리다 라는것은.. 브라우저의 렌더링이 잦아서 연산을 많이 한다는뜻.

즉 컴포넌트 렌더링을 횟수를 줄여야만 했다. 리액트에서 컴포넌트가 렌더링된다?

1. 컴포넌트의 state에 변경이 일어난다
2. props의 변경이 일어난다  

나는 위의 과정중 1번이 매번 일어났다. 왜냐하면 현재의 상태는 하나의 contextAPI에서 관리되기 떄문이다.

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

코인의 데이터를 props로 `timer` 컴포넌트로 넘김 `timer`에선 시간 상태만 관리

`timer`컴포넌트에서 `orderbook` 화면으로 넘겨 전체 체결화면을 만듬

이제 0.01초씩 시간이 지날때마다 불필요한 렌더링이 사라지게 되었음.

## 10/5

체결데이터로 호가만들기 시작. 내가 api 테스트할려고 임의 서버로 만들어서 아래처럼 관리함

```
getData() {
    return {
      // data : {} 얘도 고쳐놀예정
      coinName: Object.values(coin.code)[0],
      orderbook: Object.values(coin.orderbook_units).slice(0, 500),
      timestamp: Object.values(coin.timestamp).slice(0, 500),
      total_ask_size: Object.values(coin.total_ask_size).slice(0, 500),
      total_bid_size: Object.values(coin.total_bid_size).slice(0, 500),
      trade: {
        prev_closing_price: Object.values(trade.prev_closing_price)[0],
        // trade timestamp랑 timestamp랑 뭔차인지모르겟다
        timestamp: Object.values(trade.timestamp),
        change: Object.values(trade.change).slice(0, 500),
        change_price: Object.values(trade.change_price).slice(0, 500),
        trade_price: Object.values(trade.trade_price).slice(0, 500),
        trade_volume: Object.values(trade.trade_volume).slice(0, 500),
        ask_bid: Object.values(trade.ask_bid).slice(0, 500),
      },
    };
  }
```

아마 이렇게하면 되지않을까 싶다

1. `Chart` 컴포넌트에서 한번에 데이터를 다 받아온다 
2. `timer` 컴포넌트에서 현재 `timestamp`와 `tradedata`를 `trade` 컴포넌트로 넘겨줌
3. `trade` 컴포넌트에서 받은 데이터를 표시함

기능구현완료 

발견한 버그

- [ ] trade는 hoga보다 훠어어얼씬 많은 체결데이터가 필요함. 안그러면 Trade 컴포넌트 오류뜸
- [ ] 1/5/10/30 버튼을 눌렀을때 받아온 데이터에 timestamp.findIndex() === -1이면 데이터없음 팝업띄어야함

1. A => B 컴포넌트 Props로 함수를 넘겨주면서 B컴포넌트에서 리렌더링 되지않도록 memo 적용, props로 넘기는 함수에 usecallback 적용
	=> usecallback으로 내부에서 계산되는 모든 값들이 저장되어 사용안댐

2. 체결데이터의 잦은렌더링으로 infinite loop 오류뜸

## 10/6~

1. lightning-chart 라이브러리를 사용하여 차트 그리기
2. CSS 수정


