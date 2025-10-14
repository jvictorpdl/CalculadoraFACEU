import { Container, HelpButton } from "./styles"
import InfoIcon from "../../assets/Info.svg"



export default function HelpModal(props) {


    return (
        <Container onClick={props.handle}>
            {/* <img src={InfoIcon} alt="Ícone de informação" /> */}
            <HelpButton>
                {props.title}
            </HelpButton>


        </Container>
    )
}