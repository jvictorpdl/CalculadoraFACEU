import { Container } from "./styles";

export default function Title(props) {
  return <Container>
      <h3 style={{ fontSize: "1.5em" }}>
        {props.title}
      </h3>
  </Container>;
}
