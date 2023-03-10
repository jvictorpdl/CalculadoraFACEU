import { Input } from "../Input";
import { Container } from "./styles"

export default function ItemForm (props){
    return(
        <Container>
            <label>{props.title}</label>
            <Input />
        </Container>
    )
}