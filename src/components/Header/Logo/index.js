import React from "react";
import { LogoImg } from "./styles";
import logoFACEU from "../../../assets/logo-faceu.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <LogoImg>
      <Link to="/">
        <img src={logoFACEU} alt="FACEU" />
      </Link>
    </LogoImg>
  );
}
