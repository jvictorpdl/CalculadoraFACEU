import { Input } from "../Input";
import { Container } from "./styles";

export default function ItemForm(props) {
  return (
    <Container>
      <label>
        {props.title}
        {props.sub && <sub>{props.sub}</sub>}
      </label>
      <Input disabled={props.disabled} placeholder={props.unity} />
    </Container>
  );
}
