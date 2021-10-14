import Chart from "kaktana-react-lightweight-charts";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import actionType from "../../context/exchange/action";
import {
  BaseContext,
  IsPlayContext,
  TickerIndexContext,
} from "../../context/exchange/exchange";
import TimerButton from "../timer/timerButton";

const LightChart = () => {
  const { state } = useContext(BaseContext);

  const { state: tickerIndex } = useContext(TickerIndexContext);
  const { state: isPlay, dispatch: isPlayDispatch } = useContext(IsPlayContext);

  const {
    ticker: { tic_trade_timestamp, tic_trade_price, tic_trade_volume },
  } = state;

  const [minutes, setMinutes] = useState(
    new Date(tic_trade_timestamp[tickerIndex]).getMinutes()
  );

  const [candleArray, setCandleArray] = useState([]);
  const [volumeArray, setVolumeArray] = useState([]);

  const [type, setType] = useState(3);

  const [chart, setChart] = useState({
    options: {
      alignLabels: true,
      localization: {
        locale: "ko-kr",
      },
      timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: false,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    },
    rightPriceScale: {
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
      borderVisible: false,
    },
    grid: {
      vertLines: {
        color: "rgba(42, 46, 57, 0)",
      },
      horzLines: {
        color: "rgba(42, 46, 57, 0.6)",
      },
    },
    layout: {
      backgroundColor: "#131722",
      textColor: "#d1d4dc",
    },
    candlestickSeries: [
      {
        data: [
          {
            time: tic_trade_timestamp[0],
            open: tic_trade_price[0],
            close: tic_trade_price[0],
            high: tic_trade_price[0],
            low: tic_trade_price[0],
          },
        ],
      },
    ],
    // histogramSeries: [
    //   {
    //     data: [
    //       {
    //         time: tic_trade_timestamp[0],
    //         value: 0,
    //       },
    //     ],
    //   },
    // ],
  });

  function handlePlusTimerButton(number) {
    // isPlayDispatch({ type: actionType.SET_IS_PLAY, play: false });
    const num = +number.target.innerText;
    makeCandle(num);
  }

  function makeCandle(num) {
    // isPlayDispatch({ type: actionType.SET_IS_PLAY, play: false });

    if (num === 1) {
      setType(1);
      console.log("1");
      console.log("candlearray:", candleArray);

      const candle = [
        ...candleArray,
        chart.candlestickSeries[0].data[
          chart.candlestickSeries[0].data.length - 1
        ],
      ];

      console.log(candle);

      // setChart({
      //   ...chart,
      //   candlestickSeries: [
      //     {
      //       data: [...candle],
      //     },
      //   ],
      // });
    } else if (num === 3) {
      setType(3);
      console.log("3");
      console.log("candleArray", candleArray);

      // 여태 만들어진 1분봉을 복사해온다
      let arr = [...candleArray];
      let arr2 = [...volumeArray];

      // 만약 만들어진 1분봉이 하나도 없으면 (타이머 막시작했을떄)
      // 최소 3개이상 캔들이 필요합니다. 메세지띄우기
      if (candleArray.length < 3) {
        console.log("최소 3개의 캔들이 필요함..");
        return;
      }

      const candle = [];
      const volume = [];

      // 3개씩 캔들을 나눈다.
      const divide = parseInt(arr.length / 3);

      // 3개씩 묶어서 배열에서 뺴낸다.
      for (let i = 0; i < divide; i++) {
        const a = arr.splice(0, 3);

        // 시작시간은 초기시간
        let time = a[0].time;
        let high = a[0].high;
        let low = a[0].low;
        let close = a[0].close;
        let open = a[0].open;
        //

        for (let x of a) {
          // 만약 가져온 값중 이게더 고가면 고가로 설정
          if (x.high > high) high = x.high;
          // 만약 가져온 값중 이게더 저가면 저가로설정
          if (x.low < low) low = x.low;
          // 종가
          close = x.close;
        }
        candle.push({ time, open, close, high, low });
      }

      // 3개씩 만들고 남은캔들에 대하여 다시 고가저가 탐색
      const lastCandle =
        chart.candlestickSeries[0].data[
          chart.candlestickSeries[0].data.length - 1
        ];

      for (let i = 0; i < arr.length; i++) {
        if (lastCandle.high < arr[i].high) lastCandle.high = arr[i].high;
        if (lastCandle.low > arr[i].low) lastCandle.low = arr[i].low;
      }

      console.log("new 3minute", candle);
      console.log(chart.candlestickSeries[0].data);

      setChart({
        ...chart,
        candlestickSeries: [
          {
            data: [...candle, lastCandle],
          },
        ],
      });
      // for (let i = 0; i < divide; i++) {
      //   const b = arr2.splice(0, 3);
      //   let value = 0;
      //   let time = b[0].time;

      //   for (let x of b) {
      //     value += x.value;
      //   }
      //   volume.push({ time, value });
      // }

      // console.log(candle);
      // setChart({
      //   ...chart,
      //   candlestickSeries: [
      //     {
      //       data: [...candle],
      //     },
      //   ],
      //   // histogramSeries: [
      //   //   {
      //   //     data: [
      //   //       ...volume,
      //   //       chart.histogramSeries[0].data[
      //   //         chart.histogramSeries[0].data.length - 1
      //   //       ],
      //   //     ],
      //   //   },
      //   // ],
      // });
    } else if (num === 5) {
      console.log("5");
      // 5개씩 짜르자.
      const arr = [...candleArray];

      const candle = [];
      const volume = [];

      const a = arr.splice(0, 5);

      let time = a[0].time;
      let high = a[0].high;
      let low = a[0].low;
      let close = a[0].close;
      let open = a[0].open;

      for (let x of a) {
        if (x.high > high) high = x.high;
        if (x.low < low) low = x.low;
        open = x.open;
        close = x.open;
      }

      candle.push({ time, open, close, high, low });

      console.log(candle);
    } else if (num === 10) {
      console.log("10");
    } else if (num === 30) {
      console.log("30");
    } else if (num === 60) {
      console.log("60");
    }
  }

  useEffect(() => {
    if (!isPlay) return;
    // 1분이 지날떄마다 마지막 캔들을 등록함.
    else if (
      new Date(tic_trade_timestamp[tickerIndex]).getMinutes() !== minutes
    ) {
      console.log("다름ㅇㅇ", tic_trade_timestamp[tickerIndex]);
      if (minutes + 1 === 60) setMinutes(0);
      else setMinutes((prev) => prev + 1);

      // 만들어진 1분봉 저장
      console.log(
        "실행됨ㅇㅇ",
        chart.candlestickSeries[0].data[
          chart.candlestickSeries[0].data.length - 1
        ]
      );
      setCandleArray(
        candleArray.concat(
          chart.candlestickSeries[0].data[
            chart.candlestickSeries[0].data.length - 1
          ]
        )
      );
      // 거래량
      // setVolumeArray(
      //   volumeArray.concat(
      //     chart.histogramSeries[0].data[
      //       chart.histogramSeries[0].data.length - 1
      //     ]
      //   )
      // );

      //차트에 캔들추가
      if (
        new Date(tic_trade_timestamp[tickerIndex]).getMinutes() % type ===
        0
      ) {
        console.log(
          "캔들추가 ㅇㅇ",
          new Date(tic_trade_timestamp[tickerIndex])
        );
        setChart({
          ...chart,
          candlestickSeries: [
            {
              data: [
                ...chart.candlestickSeries[0].data,
                {
                  time: tic_trade_timestamp[tickerIndex],
                  open: tic_trade_price[tickerIndex],
                  close: tic_trade_price[tickerIndex],
                  high: tic_trade_price[tickerIndex],
                  low: tic_trade_price[tickerIndex],
                },
              ],
            },
          ],
          // histogramSeries: [
          //   {
          //     data: [
          //       ...chart.histogramSeries[0].data,
          //       {
          //         time: tic_trade_timestamp[tickerIndex],
          //         value: 0,
          //       },
          //     ],
          //   },
          // ],
        });
      }
    } else {
      // 분봉만들기
      const price = chart.candlestickSeries[0].data.pop();

      // console.log(price);
      price.time = tic_trade_timestamp[tickerIndex] + 86400000;

      price.high =
        price.high < tic_trade_price[tickerIndex]
          ? tic_trade_price[tickerIndex]
          : price.high;

      // 저가
      price.low =
        price.low > tic_trade_price[tickerIndex]
          ? tic_trade_price[tickerIndex]
          : price.low;

      price.close = tic_trade_price[tickerIndex];

      // volume candle
      // const volume = chart.histogramSeries[0].data.pop();

      // // console.log(price);
      // // console.log(volume);
      // if (
      //   tic_trade_timestamp[tickerIndex] >= tic_trade_timestamp[tickerIndex]
      // ) {
      //   volume.value += tic_trade_volume[tickerIndex];
      // }

      setChart({
        ...chart,
        candlestickSeries: [
          {
            data: [...chart.candlestickSeries[0].data, price],
          },
        ],
        // histogramSeries: [
        //   {
        //     data: [
        //       ...chart.histogramSeries[0].data,
        //       {
        //         time: tic_trade_timestamp[tickerIndex],
        //         value: 0,
        //       },
        //     ],
        //   },
        // ],
      });
    }
  }, [tickerIndex, isPlay]);

  return (
    <>
      <div>
        <TimerButton number={1} handlePlusTimerButton={handlePlusTimerButton} />
        <TimerButton number={3} handlePlusTimerButton={handlePlusTimerButton} />
        <TimerButton number={5} handlePlusTimerButton={handlePlusTimerButton} />
        <TimerButton
          number={10}
          handlePlusTimerButton={handlePlusTimerButton}
        />
        <TimerButton
          number={30}
          handlePlusTimerButton={handlePlusTimerButton}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Chart
          options={chart}
          candlestickSeries={chart.candlestickSeries}
          width={500}
        />
        {/* <Chart
          options={chart}
          histogramSeries={chart.histogramSeries}
          height={200}
          width={500}
        /> */}
      </div>
    </>
  );
};

export default LightChart;
