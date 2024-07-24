import { Container, Containertwo } from "./styles";
import Button from "../Button";
import { useState } from "react";

export default function Box(props) {
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

