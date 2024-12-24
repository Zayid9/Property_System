import { Link } from "react-router-dom";
import logoImage from '/src/assets/images/logos/pms-logo.svg';
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={logoImage} alt="Logo" height="70" width="180" />
    </LinkStyled>
  );
};



export default Logo;
