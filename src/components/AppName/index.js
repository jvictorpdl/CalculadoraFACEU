import { Container } from "./style";

export default function AppName({ children }) {
    return (
        <Container>
            <h1>{children}</h1>
        </Container>
    );
} 