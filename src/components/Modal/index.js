import { Container, Header, Content } from "./styles"
import ModalComp from 'react-modal'
import CloseIcon from "../../assets/Close.svg"
import "./style.css"

export default function Modal(props) {

    return (
        <Container>
            <ModalComp
                isOpen={props.modalIsOpen}
                className="modal-content"
                onRequestClose={props.closeModal}
                contentLabel="Example Modal"
            >
                <Header>

                    <div>
                        <h2>
                            {props.title}

                        </h2>
                    </div>
                    <img onClick={props.closeModal} src={CloseIcon} />
                </Header>
                <Content>
                    {props.children}

                </Content>
            </ModalComp>
        </Container>
    )
}