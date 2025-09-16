import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useContext } from 'react';
import { TooltipContentStyled } from '../../../components/TextFieldWithTooltip/style';
import { ApplicationContext } from '../../../core/providers';
// The styled-components library is not available, so we are creating our own components with inline styles
// and a functional approach to replicate the styling.



// A wrapper for the three main columns, using Flexbox for layout
const ColumnWrapper = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: '32px',
        gap: '20px',
        maxWidth: '1200px',
        width: '100%',
    }}>
        {children}
    </div>
);

// The component for each column (Dados do rio, Dados do esgoto, etc.)
const Column = ({ children, title }) => (
    <div style={{
        flex: '1',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        '@media (max-width: 1024px)': {
            width: '100%',
            maxWidth: '600px',
        },
    }}>
        <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#343a40',
            margin: '0',
            paddingBottom: '10px',
            borderBottom: '1px solid #e9ecef',
        }}>
            {title}
        </h3>
        {children}
    </div>
);

// A component for each input row
const InputGroup = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    }}>
        {children}
    </div>
);

const Label = ({ children }) => (
    <label style={{
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#495057',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    }}>
        {children}
    </label>
);

const Input = ({ placeholder, value }) => (
    <input
        type="text"
        placeholder={placeholder}
        readOnly={true}
        value={value}
        style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '8px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            ':focus': {
                borderColor: '#007bff',
                boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                outline: 'none',
            },
        }}
    />
);

const Grid = ({ children }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    }}>
        {children}
    </div>
);

export const TooltipInfo = ({ info }) => (
    <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <span style={{ display: "inline-flex", cursor: "pointer" }}>
                    <Info size={16} />
                </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <TooltipContentStyled side="top" sideOffset={4}>
                    {info}
                    <Tooltip.Arrow />
                </TooltipContentStyled>
            </Tooltip.Portal>
        </Tooltip.Root>
    </Tooltip.Provider>
);

export default function AutodepuraValuesPreview() {
    const { state } = useContext(ApplicationContext);
    console.log('state in AutodepuraValuesPreview', state);

    return (
        <ColumnWrapper>
            {/* 'Dados do rio' column */}
            <Column title="Dados do rio">
                <Grid>

                    <InputGroup>
                        <Label>Qr (m³/s)<TooltipInfo info={'Vazão do rio.'}> </TooltipInfo></Label>
                        <Input placeholder="m³/s" value={state.data.autodepura.qr} />
                    </InputGroup>
                    <InputGroup>
                        <Label>ODr (mg/L)<TooltipInfo info={'Oxigênio dissolvido no rio.'}> </TooltipInfo></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.odr} />
                    </InputGroup>
                    <InputGroup>
                        <Label>DBOr (mg/L)<TooltipInfo info={'Demanda bioquimíca de oxigênio do rio.'}> </TooltipInfo></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.dbor} />
                    </InputGroup>
                    <InputGroup>
                        <Label>ODmín (mg/L)<TooltipInfo info={'Oxigênio dissolvido mínimo do rio'}> </TooltipInfo></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.odmin} />
                    </InputGroup>
                </Grid>
            </Column>

            {/* 'Dados do esgoto' column */}
            <Column title="Dados do esgoto">
                <InputGroup>
                    <Label>Qe (m³/s)<TooltipInfo info={'Vazão do esgoto'}> </TooltipInfo></Label>
                    <Input placeholder="m³/s" value={state.data.autodepura.qe} />
                </InputGroup>
                <InputGroup>
                    <Label>ODe (mg/L)<TooltipInfo info={'Oxigênio dissolvido no esgoto.'}> </TooltipInfo></Label>
                    <Input placeholder="mg/L" value={state.data.autodepura.ode} />
                </InputGroup>
                <InputGroup>
                    <Label>E (%)<TooltipInfo info={'Eficiência do tratamento na remoção de DBO'}> </TooltipInfo></Label>
                    <Input placeholder="%" value={state.data.autodepura.e} />
                </InputGroup>
                <InputGroup>
                    <Label>DBOe (mg/L)<TooltipInfo info={'Demanda bioquimíca de oxigênio no esgoto.'}> </TooltipInfo></Label>
                    <Input placeholder="mg/L" value={state.data.autodepura.dboe} />
                </InputGroup>
                <InputGroup>
                    <Label>DBOefl (mg/L)<TooltipInfo info={'DBO do efluente tratado'}> </TooltipInfo></Label>
                    <Input placeholder="mg/L" value={state.data.autodepura.dboefl} />
                </InputGroup>
            </Column>

            {/* 'Dados morfométricos e ambientais' column */}
            <Column title="Dados morfométricos e ambientais">
                <Grid>
                    <InputGroup>
                        <Label>k1(20°C) (1/dia)<TooltipInfo info={'Coeficiente de desoxigenação(20ºC).'}> </TooltipInfo></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k120c} />
                    </InputGroup>
                    <InputGroup>
                        <Label>θ para K1 (ad.)<TooltipInfo info={'Coeficiente de temperatura'}> </TooltipInfo></Label>
                        <Input placeholder="ad." value={state.data.autodepura.tetak1} />
                    </InputGroup>
                    <InputGroup>
                        <Label>T (°C)<TooltipInfo info={'Temperatura do Rio.'}> </TooltipInfo></Label>
                        <Input placeholder="°C" value={state.data.autodepura.temperatura} />
                    </InputGroup>
                    <InputGroup>
                        <Label>K1T (1/dia)<TooltipInfo info={'Coeficiente de desoxigenação a uma temperatura(T)'}> </TooltipInfo></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k1t} />
                    </InputGroup>

                    <InputGroup>
                        <Label>V (m/s)<TooltipInfo info={'Velocidade do rio'}> </TooltipInfo></Label>
                        <Input placeholder="m/s" value={state.data.autodepura.velocidade} />
                    </InputGroup>
                    <InputGroup>
                        <Label>θ para K2 (ad.)<TooltipInfo info={'Coeficiente de temperatura'}> </TooltipInfo></Label>
                        <Input placeholder="ad." value={state.data.autodepura.tetak2} />
                    </InputGroup>
                    <InputGroup>
                        <Label>H (m)<TooltipInfo info={'Profundidade do Rio'}> </TooltipInfo></Label>
                        <Input placeholder="m" value={state.data.autodepura.h} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Altitude (m)<TooltipInfo info={'Altitude'}> </TooltipInfo></Label>
                        <Input placeholder="m" value={state.data.autodepura.altitude} />
                    </InputGroup>
                    <InputGroup>
                        <Label>K2 (20ºC) (1/dia)<TooltipInfo info={'Coeficiente de reaeração(20ºC)'}> </TooltipInfo></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k220c} />
                    </InputGroup>
                    <InputGroup>
                        <Label>K2T (1/dia) <TooltipInfo info={'Coeficiente de reaeração a temperatura(T)'}> </TooltipInfo></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k2t} />
                    </InputGroup>

                    <InputGroup>
                        <Label>d (m)<TooltipInfo info={'Distância do rio'}> </TooltipInfo></Label>
                        <Input placeholder="m" value={state.data.autodepura.distancia} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Nº (Quantidade)<TooltipInfo info={'Número de partições do rio'}> </TooltipInfo></Label>
                        <Input placeholder="Quantidade" value={state.data.autodepura.particoes} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Cs' (mg/L) <TooltipInfo info={'Concentração de saturação de oxigênio dissolvido no rio'}> </TooltipInfo></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.cslinha} />
                    </InputGroup>
                </Grid>
            </Column>
        </ColumnWrapper>
    );
};

