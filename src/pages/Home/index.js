import { useState } from "react";
import PageTemplate from "../PageTemplate";
import { Container, Title, Card, TitleCard, FormGrid, Item } from "./styles";
import Button from "../../components/Button";

function Home() {
  const [calculated, setCalculated] = useState(false);

  return (
    <PageTemplate>
      <Title>Title</Title>
      <Container>
        <Title>Titulo do card</Title>
        <Card>
          <div>
            <TitleCard>rio</TitleCard>
            <FormGrid>
              <Item>
                text
                <input />
              </Item>
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
            </FormGrid>
          </div>
          <div>
            <TitleCard>rio</TitleCard>
            <FormGrid>
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
            </FormGrid>
          </div>
        </Card>
        {calculated && <Card>resultados</Card>}
      </Container>
    </PageTemplate>
  );
}
export default Home;
