import { Container } from "./styles";

export default function Title(props) {
  return <Container>
      <h2>
        {props.title}
      </h2>
  </Container>;
}
