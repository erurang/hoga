import Chart, { CrosshairMode } from "kaktana-react-lightweight-charts";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const LightChart = ({
  timerTimestamp,
  tic_trade_price,
  tic_trade_timestamp,
  timestamp,
  tic_trade_volume,
}) => {
  // const tradeIndex = tic_trade_timestamp.findIndex((n) => timestamp <= n);
  // console.log("test :", tradeIndex);

  // console.log("chart업데이트");
  const [tradeIndex, setTradeIndex] = useState(
    tic_trade_timestamp.findIndex((n) => timestamp <= n)
  );

  const [hours, setHours] = useState(new Date(timerTimestamp).getHours());
  const [minutes, setMinutes] = useState(new Date(timerTimestamp).getMinutes());

  const [close, setClose] = useState(tic_trade_price[0]);

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
            color: close < tic_trade_price[tradeIndex] ? "blue" : "red",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (new Date(timerTimestamp).getMinutes() !== minutes) {
      if (minutes + 1 === 60) {
        setMinutes(0);
        setHours((prev) => prev + 1);
      } else {
        setMinutes((prev) => prev + 1);
      }

      setClose(tic_trade_price[tradeIndex]);

      setChart({
        ...chart,
        candlestickSeries: [
          {
            data: [
              ...chart.candlestickSeries[0].data,
              {
                time: tic_trade_timestamp[tradeIndex],
                open: tic_trade_price[tradeIndex],
                close,
                high: tic_trade_price[tradeIndex],
                low: tic_trade_price[tradeIndex],
              },
            ],
          },
        ],
        histogramSeries: [
          {
            data: [
              ...chart.histogramSeries[0].data,
              {
                time: tic_trade_timestamp[tradeIndex],
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
      price.open = tic_trade_price[tradeIndex];

      // 고가
      price.high =
        price.high < tic_trade_price[tradeIndex]
          ? tic_trade_price[tradeIndex]
          : price.high;

      // 저가
      price.low =
        price.low > tic_trade_price[tradeIndex]
          ? tic_trade_price[tradeIndex]
          : price.low;

      // volume candle
      const volume = chart.histogramSeries[0].data.pop();

      if (timerTimestamp >= tic_trade_timestamp[tradeIndex]) {
        volume.value += tic_trade_volume[tradeIndex];
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

    if (timerTimestamp >= tic_trade_timestamp[tradeIndex]) {
      setTradeIndex((prev) => prev + 1);
    }
  }, [timerTimestamp, timestamp]);

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
