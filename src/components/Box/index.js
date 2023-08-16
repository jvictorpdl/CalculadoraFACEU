import { Container, Containertwo } from "./styles";
import Button from "../Button";

export default function Box(props) {
    return <Container>
        <Containertwo>
            {props.boxname}
        </Containertwo>

        <Button color="primary" text="Inserir dados" handle={() => { props.setStep(props.numberStep);}} />

    </Container>
}