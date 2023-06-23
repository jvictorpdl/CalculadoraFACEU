import { Container, helpTitle, HelpButton } from "./styles"
import InfoIcon from "../../assets/Info.svg"
import { useState } from "react";



export default function HelpModal(props) {
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }
    return (
        <Container onClick={props.handle}>
            <img src={InfoIcon} />
            <HelpButton>
                {props.title}
            </HelpButton>


        </Container>
    )
}