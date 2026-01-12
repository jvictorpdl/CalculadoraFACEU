import { TabButtonStyled } from './style';

export function TabButton({ label, active, onClick }) {
    return (
        <TabButtonStyled active={active} onClick={onClick}>
            {label}
        </TabButtonStyled>
    );
}
