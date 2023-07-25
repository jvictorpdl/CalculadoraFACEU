//import "./Buttom.css";
import { ButtonPrimary, ButtonSecondary } from "./styles";

function Button(props) {
  
  if (props.color === 'primary')  {
    return <ButtonPrimary onClick={() => props.handle()} color='primary'>{props.text}</ButtonPrimary>;
  } else {
    return <ButtonSecondary onClick={() => props.handle()} color='secondary'>{props.text}</ButtonSecondary>;
  }
}

export default Button;
