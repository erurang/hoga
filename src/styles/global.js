import styled from "styled-components";

const SGlobalStyles = styled.div`
  background-color: #e7ebef;
  width: 100%;
  height: 100%;
`;

const GlobalStyles = ({ children }) => {
  return <SGlobalStyles>{children}</SGlobalStyles>;
};

export default GlobalStyles;
