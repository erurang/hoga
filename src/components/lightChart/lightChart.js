import Chart from "kaktana-react-lightweight-charts";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  BaseContext,
  TickerIndexContext,
} from "../../context/exchange/exchange";

const LightChart = () => {
  const { state } = useContext(BaseContext);

  // console.log("lightchart 업데이트");

  const {
    ticker: { tic_trade_timestamp, tic_trade_price, tic_trade_volume },
  } = state;

  const { state: tickerIndex } = useContext(TickerIndexContext);

  const [hours, setHours] = useState(
    new Date(tic_trade_timestamp[tickerIndex]).getHours()
  );
  const [minutes, setMinutes] = useState(
    new Date(tic_trade_timestamp[tickerIndex]).getMinutes()
  );
  const [close, setClose] = useState(tic_trade_price[0]);

  // 시간만들기
  // const [] = useState(1);

  const [chart, setChart] = useState({
    options: {
      alignLabels: true,
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
        secondsVisible: true,
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
            high: tic_trade_price[0],
            low: tic_trade_price[0],
            close: tic_trade_price[0],
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
            color: "red",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (new Date(tic_trade_timestamp[tickerIndex]).getMinutes() !== minutes) {
      if (minutes + 1 === 60) {
        setMinutes(0);
        setHours((prev) => prev + 1);
      } else {
        setMinutes((prev) => prev + 1);
      }

      setClose(tic_trade_price[tickerIndex]);

      setChart({
        ...chart,
        candlestickSeries: [
          {
            data: [
              ...chart.candlestickSeries[0].data,
              {
                time: tic_trade_timestamp[tickerIndex],
                open: tic_trade_price[tickerIndex],
                close,
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
    } else {
      // price candle
      const price = chart.candlestickSeries[0].data.pop();
      // 시가
      price.close = close;

      // 종가
      price.open = tic_trade_price[tickerIndex];

      // 고가
      price.high =
        price.high < tic_trade_price[tickerIndex]
          ? tic_trade_price[tickerIndex]
          : price.high;

      // 저가
      price.low =
        price.low > tic_trade_price[tickerIndex]
          ? tic_trade_price[tickerIndex]
          : price.low;

      // volume candle
      const volume = chart.histogramSeries[0].data.pop();

      if (
        tic_trade_timestamp[tickerIndex] >= tic_trade_timestamp[tickerIndex]
      ) {
        volume.value += tic_trade_volume[tickerIndex];
      }

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
  }, [tickerIndex]);

  return (
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
  );
};

export default LightChart;
