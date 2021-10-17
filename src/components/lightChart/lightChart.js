import Chart from "kaktana-react-lightweight-charts";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import actionType from "../../context/exchange/action";
import {
  BaseContext,
  IsPlayContext,
  TickerIndexContext,
  TimeLoopContext,
} from "../../context/exchange/exchange";
import TimerButton from "../timer/timerButton";

const ContainerStyled = styled.div`
  display: flex;
  float: left;
`;

const LightChart = () => {
  const { state } = useContext(BaseContext);

  const { state: tickerIndex } = useContext(TickerIndexContext);
  const { state: isPlay, dispatch: isPlayDispatch } = useContext(IsPlayContext);

  const { state: timeLoop } = useContext(TimeLoopContext);

  const {
    ticker: { tic_trade_timestamp, tic_trade_price, tic_trade_volume },
  } = state;

  const [minutes, setMinutes] = useState(
    new Date(tic_trade_timestamp[tickerIndex]).getMinutes()
  );

  const [minutesCandle, setMinutesCandle] = useState({
    time: tic_trade_timestamp[0],
    open: tic_trade_price[0],
    close: tic_trade_price[0],
    high: tic_trade_price[0],
    low: tic_trade_price[0],
  });

  const [volumeCandle, setVolumeCandle] = useState({
    time: tic_trade_timestamp[tickerIndex],
    value: 0,
  });

  const [candleArray, setCandleArray] = useState([]);
  const [volumeArray, setVolumeArray] = useState([]);

  const [type, setType] = useState(1);

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
    histogramSeries: [
      {
        data: [
          {
            time: tic_trade_timestamp[0],
            value: 0,
          },
        ],
      },
    ],
  });

  function handlePlusTimerButton(number) {
    const num = +number.target.innerText;

    if (num !== type && candleArray.length > num - 1) {
      // isPlayDispatch({ type: actionType.SET_IS_PLAY, play: false });
      setType(num);
      makeCandle(num);
    }
  }

  function makeMinutesCandle(num) {
    let arr = [...candleArray];
    let arr2 = [...volumeArray];

    const candle = [];
    const volume = [];

    const divide = parseInt(arr.length / num);

    for (let i = 0; i < divide; i++) {
      const a = arr.splice(0, num);
      const b = arr2.splice(0, num);

      let time = a[0].time;
      let high = a[0].high;
      let low = a[0].low;
      let close = a[0].close;
      let open = a[0].open;

      for (let x of a) {
        if (x.high > high) high = x.high;

        if (x.low < low) low = x.low;

        close = x.close;
      }

      let value = 0;

      for (let x of b) {
        value += x.value;
      }

      candle.push({ time, open, close, high, low });
      volume.push({ time, value });
    }

    const lastCandle = { ...minutesCandle };
    const lastVolumeCandle = { ...volumeCandle };

    if (arr.length) {
      lastCandle.open = arr[0].open;
      for (let i = 0; i < arr.length; i++) {
        if (lastCandle.high < arr[i].high) lastCandle.high = arr[i].high;
        if (lastCandle.low > arr[i].low) lastCandle.low = arr[i].low;
      }

      for (let i = 0; i < arr2.length; i++) {
        lastVolumeCandle.value += arr2[i].value;
      }
    }
    setChart({
      ...chart,
      candlestickSeries: [
        {
          data: [...candle, lastCandle],
        },
      ],
      histogramSeries: [
        {
          data: [...volume, lastVolumeCandle],
        },
      ],
    });
  }

  function makeCandle(num) {
    if (num === 1) makeMinutesCandle(1);
    else if (num === 3) makeMinutesCandle(3);
    else if (num === 5) makeMinutesCandle(5);
    else if (num === 10) makeMinutesCandle(10);
    else if (num === 30) makeMinutesCandle(30);
    else if (num === 60) makeMinutesCandle(60);
  }

  useEffect(() => {
    if (!isPlay) return;
    else if (
      new Date(tic_trade_timestamp[tickerIndex]).getMinutes() !== minutes
    ) {
      if (minutes + 1 === 60) setMinutes(0);
      else setMinutes((prev) => prev + 1);

      setCandleArray(candleArray.concat(minutesCandle));
      setVolumeArray(volumeArray.concat(volumeCandle));

      setMinutesCandle({
        time: tic_trade_timestamp[tickerIndex],
        open: tic_trade_price[tickerIndex],
        close: tic_trade_price[tickerIndex],
        high: tic_trade_price[tickerIndex],
        low: tic_trade_price[tickerIndex],
      });

      setVolumeCandle({ time: tic_trade_timestamp[tickerIndex], value: 0 });

      console.log("1분봉 추가", candleArray);

      //차트에 캔들추가
      if (
        new Date(tic_trade_timestamp[tickerIndex]).getMinutes() % type ===
        0
      ) {
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
          histogramSeries: [
            {
              data: [
                ...chart.histogramSeries[0].data,
                {
                  time: tic_trade_timestamp[tickerIndex],
                  value: 0,
                },
              ],
            },
          ],
        });
      }
    } else {
      // 분봉만들기
      const price = chart.candlestickSeries[0].data.pop();

      // console.log(price);
      price.time = tic_trade_timestamp[tickerIndex];

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

      setMinutesCandle({
        time: price.time,
        open: minutesCandle.open,
        close: tic_trade_price[tickerIndex],
        high:
          tic_trade_price[tickerIndex] > minutesCandle.high
            ? tic_trade_price[tickerIndex]
            : minutesCandle.high,
        low:
          tic_trade_price[tickerIndex] > minutesCandle.low
            ? minutesCandle.low
            : tic_trade_price[tickerIndex],
      });

      // volume candle
      const volume = chart.histogramSeries[0].data.pop();

      // // console.log(price);
      // // console.log(volume);

      volume.value += tic_trade_volume[tickerIndex];

      setVolumeCandle({
        time: price.time,
        value: volumeCandle.value + tic_trade_volume[tickerIndex],
      });

      setChart({
        ...chart,
        candlestickSeries: [
          {
            data: [...chart.candlestickSeries[0].data, price],
          },
        ],
        histogramSeries: [
          {
            data: [...chart.histogramSeries[0].data, volume],
          },
        ],
      });
    }
  }, [tickerIndex, isPlay]);

  // useEffect(() => {
  //   // 1. tickerIndex를 가져온다
  //   // 2. candle volume array를 다시 1분 기준으로 만든다.. ?

  //   const candle = []
  //   const volume = []

  //   for (let i =0; i<= tickerIndex; i++) {

  //   }

  //   makeMinutesCandle(type);

  // }, [timeLoop]);
  return (
    <ContainerStyled>
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
        <Chart
          options={chart}
          histogramSeries={chart.histogramSeries}
          height={200}
          width={500}
        />
      </div>
    </ContainerStyled>
  );
};

export default LightChart;
