import axios from "axios";

async function getDataApi(date = null, coin = null) {
  console.log("데이터 가져오는중...");

  const getData = await axios.get("http://localhost:4000/users/getData");

  const getHoga = getData.data.hoga;
  const orderbook = getHoga.orderbook;
  const coinName = getHoga.coinName;
  const timestamp = getHoga.timestamp;
  const total_ask_size = getHoga.total_ask_size;
  const total_bid_size = getHoga.total_bid_size;

  const getTrade = getData.data.trade;
  const ask_bid = getTrade.ask_bid;
  const change = getTrade.change;
  const change_price = getTrade.change_price;
  const prev_closing_price = getTrade.prev_closing_price;
  const trade_price = getTrade.trade_price;
  const trade_timestamp = getTrade.timestamp;
  const trade_volume = getTrade.trade_volume;

  const getTicker = getData.data.ticker;
  const tic_trade_price = getTicker.trade_price;
  const tic_trade_timestamp = getTicker.timestamp;
  const tic_trade_volume = getTicker.trade_volume;

  const data = {
    hoga: {
      coinName,
      timestamp,
      orderbook,
      total_ask_size,
      total_bid_size,
    },
    trade: {
      ask_bid,
      change,
      change_price,
      prev_closing_price,
      trade_price,
      trade_timestamp,
      trade_volume,
    },
    ticker: {
      tic_trade_price,
      tic_trade_timestamp,
      tic_trade_volume,
    },
    loading: false,
  };

  return data;
}

export { getDataApi };
