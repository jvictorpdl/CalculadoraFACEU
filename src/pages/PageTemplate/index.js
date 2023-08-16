import React from "react";
import Header from "../../components/Header";
import { Container } from "./styles";
function PageTemplate(props) {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
}
export default PageTemplate;
