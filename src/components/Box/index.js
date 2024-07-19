import { Container, Containertwo } from "./styles";
import Button from "../Button";
import { useState } from "react";

export default function Box(props) {

    // const [buttonColor, setButtonColor] = useState(
    //     () => {
    //         if (props.boxname === 'Dados do Rio') {
    //             if (props.represa === false) {
    //                 return 'primary';
    //             } else {
    //                 return 'inative';
    //             }
    //         } else if (props.boxname === 'Dados da Represa') {
    //             if (props.represa === true) {
    //                 return 'primary';
    //             } else {
    //                 return 'inative';
    //             }
    //         } else {
    //             return 'primary'
    //         }
    //     }
    // );
    // props.boxname === 'Dados do Rio' ? props.represa === false ? 'primary' : 'inative' : props.boxname === 'Dados da Represa' ? props.represa === true ? 'primary' : 'inative' : 'primary'

    // const handleClick = () => {

    //     if (props.boxname === 'Dados do Rio') {
    //         props.setData({ ...props.data, represa: false }); // Altera represa para false se clicar em "Dados do Rio"
    //         console.log('entrou 1 ');
    //         props.setRepresa(false)
    //     } else if (props.boxname === 'Dados da Represa') {
    //         props.setData({ ...props.data, represa: true });
    //         console.log('entrou 2');
    //         props.setRepresa(true)

    //         // Altera represa para true se clicar em "Dados da Represa"
    //     }
    //     props.setStep(props.numberStep);
    // };

    // Define a cor do botão com base no valor de represa

    // if (props.boxname === 'Dados do Rio' && props.represa === false) {
    //     setButtonColor('primary');
    //     if (props.boxname === 'Dados da Represa' && props.represa === true) {
    //         setButtonColor('primary');
    //     }
    // } else if (props.boxname === 'Dados do Rio' && props.represa === true) {
    //     setButtonColor('inactive');
    //     if (props.boxname === 'Dados da Represa' && props.represa === false) {
    //         setButtonColor('inactive');
    //     }
    // } else { setButtonColor('primary') }

    // if (props.boxname === 'Dados do Rio') {
    //     if (props.represa === false) {
    //         setButtonColor('primary');
    //     } else {
    //         setButtonColor('inative');
    //     }

    // } else if (props.boxname === 'Dados da Represa') {
    //     if (props.represa === true) {
    //         setButtonColor('primary');
    //     } else {
    //         setButtonColor('inative');
    //     }
    // }




    return (
        <Container>

            <Containertwo>
                {props.boxname}
            </Containertwo>
            <Button color={props.buttonColor} text={props.text} handle={() => props.handleClick(props.boxname, props.numberStep)} />
        </Container>
    );
}

// Define valores padrão para as props
Box.defaultProps = {
    represa: false,
    text: "Inserir dados",
    data: {},
    handleClick: () => { },
    buttonColor: 'primary'



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

