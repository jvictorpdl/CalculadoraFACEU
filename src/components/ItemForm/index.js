import { useState } from "react";
import { Input } from "../Input";
import { Container } from "./styles";

export default function ItemForm(props) {
  const [locale, setLocale] = useState(props.locale);

  function updateData(value) {
    props.setData({ ...props.data, ...value });
  }

  return (
    <Container>
      <label>
        {props.title}
        {props.sub && <sub>{props.sub}</sub>}
      </label>
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
