import { Card } from "./style";

export function Tab({ id, label, children }) {
    // This component is only used for structure and metadata.
    return (
        <Card>
            {children}
        </Card>
    );
}
