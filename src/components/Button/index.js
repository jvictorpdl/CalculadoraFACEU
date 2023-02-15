//import "./Buttom.css";
import { ButtonPrimary } from "./styles";

function Button(props) {
  const calcular = () => {
    props.calcular(true);
  };
  return <ButtonPrimary onClick={calcular}>Calcular</ButtonPrimary>;
}

export default Button;
