import styled from "styled-components";

const Container = styled.div``;

const GlobalStyles = (props) => {
  return <Container>{props.children}</Container>;
};

export default GlobalStyles;
