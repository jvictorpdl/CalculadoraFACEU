import { Container, Containertwo } from "./styles";
import Button from "../Button";

export default function Box(props) {
    const handleClick = () => {
        if (props.boxname === 'Dados do Rio') {
            props.setRepresa(false); // Altera represa para false se clicar em "Dados do Rio"
        } else if (props.boxname === 'Dados da Represa') {
            props.setRepresa(true); // Altera represa para true se clicar em "Dados da Represa"
        }
        props.setStep(props.numberStep);
    };

    // Define a cor do botão com base no valor de represa
    let buttonColor = 'primary';

    if ((props.boxname === 'Dados do Rio' && props.represa) || 
        (props.boxname === 'Dados da Represa' && !props.represa)) {
        buttonColor = 'inactive';
    }

    return (
        <Container>
            <Containertwo>
                {props.boxname}
            </Containertwo>
            <Button color={buttonColor} text={props.text} handle={handleClick} />
        </Container>
    );
}

// Define valores padrão para as props
Box.defaultProps = {
    represa: false,
    text: "Inserir dados"
};

// import { Container, Containertwo } from "./styles";
// import Button from "../Button";

// export default function Box(props) {
//     return <Container>
//         <Containertwo>
//             {props.boxname}
//         </Containertwo>

//         <Button color="primary" text="Inserir dados" handle={() => { props.setStep(props.numberStep);}} />


//     </Container>
// }

