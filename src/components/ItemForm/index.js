import { useState } from "react";
import { Input } from "../Input";
import { Container, Label } from "./styles";

export default function ItemForm(props) {
  const [locale, setLocale] = useState(props.locale);

  function updateData(value) {
    props.setData({ ...props.data, ...value });
  }

  return (
    <Container>
      <Label>
        <span className="tooltiptext">
          {props.tooltip}
        </span>
        {props.title}
        {props.sub && <sub>{props.sub}</sub>}
      </Label>
      <Input
        disabled={props.disabled}
        placeholder={props.unity}
        value={props.value ? props.value : props.data[props.locale]}
        onChange={props.handle ?
          (evento => props.handle(evento.target.value)) :
          ((evento) => updateData({ [`${locale}`]: evento.target.value }))
        }
      />
    </Container>
  );
}
