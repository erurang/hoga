import styled from "styled-components";
import { Link } from "react-router-dom";

const ContainerStyled = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: 2px solid white;
  height: 85px;
`;

const UlStyled = styled.ul`
  display: flex;
  align-items: center;
`;

const LiStyled = styled.li`
  width: 62px;
  line-height: 79px;
`;

const SpanStyled = styled.span`
  color: "#2b2b2b";
  font-size: 15px;
`;

const Header = () => {
  return (
    <ContainerStyled>
      <UlStyled>
        <LiStyled>
          <Link to="/" style={{ textDecoration: "none" }}>
            <SpanStyled>홈</SpanStyled>
          </Link>
        </LiStyled>
        <LiStyled>
          <Link to="/exchange" style={{ textDecoration: "none" }}>
            <SpanStyled>거래소</SpanStyled>
          </Link>
        </LiStyled>
      </UlStyled>
    </ContainerStyled>
  );
};

export default Header;
