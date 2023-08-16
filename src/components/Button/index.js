//import "./Buttom.css";
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from "./styles";

function Button(props) {
  
  if (props.color === 'primary')  {
    return <ButtonPrimary onClick={() => props.handle()} color='primary'>{props.text}</ButtonPrimary>;
  } else if(props.color === "tertiary"){
    return <ButtonTertiary onClick={() => props.handle()} color='tertiary'>{props.text}</ButtonTertiary>;
  }else{
    return <ButtonSecondary onClick={() => props.handle()} color='secondary'>{props.text}</ButtonSecondary>;
  }
}

export default Button;
