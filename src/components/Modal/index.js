import { Container, Header, Content, ContainerChildren } from "./styles"
import ModalComp from 'react-modal'
import CloseIcon from "../../assets/X.svg"
import "./style.css"

// esconde o resto da página do leitor de tela enquanto o modal está aberto
ModalComp.setAppElement('#root');

export default function Modal(props) {

const modaltitle = {
    color: '#1F2937',        // Cor do texto (era 'color')
    fontSize: 'clamp(18px, 4.5vw, 24px)',
    lineHeight: 1.3,
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
                contentLabel={props.title}
            >
                <Header>

                    <div>
                        <h2 style={modaltitle}>
                            {props.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={props.closeModal}
                        aria-label="Fechar"
                        title="Fechar"
                        style={{ flexShrink: 0, minWidth: 32, minHeight: 32, padding: 4, border: 0, background: 'transparent', cursor: 'pointer', opacity: 0.9 }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
                    >
                        <img src={CloseIcon} alt="" />
                    </button>
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