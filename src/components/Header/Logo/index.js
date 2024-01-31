import React from "react";
import { LogoImg } from "./styles";
import icon from "../../../assets/icon.png"


export default function Logo() {
  return <LogoImg>
    <img src={icon} alt='logo'/>
  </LogoImg> 
}

