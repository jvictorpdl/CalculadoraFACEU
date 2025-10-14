import { Container, Header, Content, ContainerChildren, modaltitle } from "./styles"
import ModalComp from 'react-modal'
import CloseIcon from "../../assets/X.svg"
import "./style.css"
import { toPadding } from "chart.js/helpers";

export default function Modal(props) {

const modaltitle = {
    color: '#1F2937',        // Cor do texto (era 'color')
    fontSize: '24px',        // Tamanho da fonte (era 'font-size')
    fontWeight: 'bold',      // Peso da fonte (era 'font-weight')
    // marginBottom: '16px',    // Margem inferior (era 'margin-bottom')
    borderBottom: '1px solid #E5E7EB', // Exemplo de borda

};

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
                        <h2 style={modaltitle}> 
                            {props.title}
                        </h2>
                    </div>
                    <img
                        onClick={props.closeModal}
                        src={CloseIcon}
                        alt="Fechar"
                        title="Fechar"
                        style={{ cursor: 'pointer', opacity: 0.9 }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
                    />
                    {/* <img onClick={props.closeModal} src={CloseIcon} alt="Icone em forma de X" /> */}
                </Header>
                
                <Content>
                    <ContainerChildren>

                        {props.children}

                    </ContainerChildren>
                </Content>
            </ModalComp>
        </Container>
    )
}