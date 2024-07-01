import React from "react";
import { LogoImg } from "./styles";
import icon from "../../../assets/icon.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <LogoImg>
      <Link to="/">
        <img src={icon} alt="logo" />
      </Link>
    </LogoImg>
  );
}










// import React from "react";
// import { LogoImg } from "./styles";
// import icon from "../../../assets/icon.png"


// export default function Logo() {
//   return <LogoImg>
//     <img src={icon} alt='logo'/>
//   </LogoImg> 
// }

