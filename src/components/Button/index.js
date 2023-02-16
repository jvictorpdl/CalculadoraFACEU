//import "./Buttom.css";
import { ButtonPrimary, ButtonSecondary } from "./styles";

function Button(props) {
  
  if (props.color === 'primary') {
    return <ButtonPrimary color='primary'>{props.text}</ButtonPrimary>;
  } else {
    return <ButtonSecondary color='secondary'>{props.text}</ButtonSecondary>;
  }
}

export default Button;
