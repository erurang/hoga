import Day from "react-calendar";

function test(e) {
  console.log(e, "dd");
}

const Calendar = () => {
  return <Day onChange={(e) => test(e)} />;
};

export default Calendar;
