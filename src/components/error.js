import styled from "styled-components";

const ContainerStyled = styled.div`
  position: absolute;
  width: 200px;
  height: 50px;
  background-color: black;
  font-size: 30px;
  text-align: center;
  color: white;
  z-index: 1;
  top: 250px;
  left: 160px;
`;

const ErrorPopUP = ({ message }) => {
  return (
    <ContainerStyled>
      <button onClick={() => {}}>닫기</button>
      <span>{message}</span>
    </ContainerStyled>
  );
};

export default ErrorPopUP;
