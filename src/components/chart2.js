import { useEffect, useState } from "react";
import styled from "styled-components";
import Timer from "./timer";
import axios from "axios";

const Chart = ({ coin, date }) => {
  const [data, setData] = useState({
    data: null,
    error: false,
    loading: true,
  });

  // 여기서 타이머를 쓰는게아니라..
  // 전역으로 돌려서 위에서 사용하게끔 만들면..
  // 이 컴포넌트는 타이머가 이동할때 리렌더링될 필요가 없지않나?
  // => 그래도 타이머의 숫자에 따라 표기를해야하는데
  // => 리렌더링을 줄일려면.. 타이머로 아예 상태를 넘겨주자.

  useEffect(async () => {
    // api요청한다치고.. db에서 가져옴
    try {
      // 임의서버임
      // coin 과 date를 같이 날려서 받아오는거로 처리함
      // 일단은 그냥 가져오는걸로
      console.log("데이터 가져오는중...");
      const getData = await axios.get("http://localhost:4000/users/getData");
      const orderbook = getData.data.orderbook;
      const coinName = getData.data.coinName;
      const timestamp = getData.data.timestamp;
      const total_ask_size = getData.data.total_ask_size;
      const total_bid_size = getData.data.total_bid_size;

      setData({
        ...data,
        data: {
          coinName,
          timestamp,
          orderbook,
          total_ask_size,
          total_bid_size,
        },
        loading: false,
      });
    } catch (e) {
      console.log("데이터 가져오기 오류!", e);
      setData({ ...data, error: true, loading: false });
    }
  }, []);

  console.log("컴포넌트 마운트됨", data);

  if (data.loading) return <h1>로딩중입니다..</h1>;
  else if (data.error) return <h1>데이터를 받아올수 없습니다.</h1>;

  return (
    <>
      <h1>
        {coin},{date}
      </h1>
      <Timer
        date={date}
        orderbook={data.data.orderbook}
        timestamp={data.data.timestamp}
        total_ask_size={data.data.total_ask_size}
        total_bid_size={data.data.total_bid_size}
      />
    </>
  );
};

export default Chart;
