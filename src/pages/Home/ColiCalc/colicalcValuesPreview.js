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

const InfoIcon = () => (
    <span style={{
        fontSize: '1rem',
        color: '#6c757d',
        cursor: 'pointer',
    }}>
        ⓘ
    </span>
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

export default function ColicalcValuesPreview({ isRio }) {
    const { state } = useContext(ApplicationContext);


    return (
        <ColumnWrapper>
            {/* 'Dados do rio' column */}

  {/* Apenas quando RIO estiver selecionado */}
  {isRio && (
    <Column title="Dados do rio">
      <Grid>
        <InputGroup>
          <Label>
            Qr <TooltipInfo info="Vazão do rio." />
          </Label>
          <Input placeholder="m³/s" value={state.data.colicalc.qr} />
        </InputGroup>

        <InputGroup>
          <Label>
            Nr <TooltipInfo info="Concentração de coliformes no rio, a montante do lançamento" />
          </Label>
          <Input placeholder="NPM/100ml" value={state.data.colicalc.nr} />
        </InputGroup>
      </Grid>
    </Column>
  )}

  {/* ...demais colunas permanecem como estão */}
            {/* <Column title="Dados do rio">
                <Grid>
                    <InputGroup>
                        <Label>Qr <TooltipInfo info={'Vazão do rio.'} /></Label>
                        <Input placeholder="m³/s" value={state.data.colicalc.qr} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Nr <TooltipInfo info={'Concentração de coliformes no rio, a montante do lançamento'} /></Label>
                        <Input placeholder="NPM/100ml" value={state.data.colicalc.nr} />
                    </InputGroup>
                </Grid>
            </Column> */}
 {!isRio && (
            <Column title="Dados da represa">
                <InputGroup>
                    <Label>Qr <TooltipInfo info={'Vazão do rio.'} /></Label>
                    <Input placeholder="m³/s" value={state.data.colicalc.qr} />
                </InputGroup>
                <InputGroup>
                    <Label>Nr <TooltipInfo info={'Concentração de coliformes no rio, a montante do lançamento'} /></Label>
                    <Input placeholder="org/100ml" value={state.data.colicalc.nr} />
                </InputGroup>
                {/* Adicionar INPUT GROUP REFERENTE A VOLUME DA REPRESA */}
                {/* Adicionar INPUT GROUP REFERENTE A VOLUME DA REPRESA */}
                {/* Adicionar INPUT GROUP REFERENTE A VOLUME DA REPRESA */}
            </Column>
  )}
            {/* 'Dados do esgoto' column */}
            <Column title="Dados do esgoto">
                <InputGroup>
                    <Label>Qe <TooltipInfo info={'Vazão do esgoto.'} /></Label>
                    <Input placeholder="m³/s" value={state.data.colicalc.qe} />
                </InputGroup>
                <InputGroup>
                    <Label>Ne <TooltipInfo info={'Concentração de coliformes no esgoto.'} /></Label>
                    <Input placeholder="org/100ml" value={state.data.colicalc.ne} />
                </InputGroup>
            </Column>

            <Column title="Dados da Mistura">
                <InputGroup>
                    <Label>Nop <TooltipInfo info={'Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental'} /></Label>
                    <Input placeholder="org/100ml" value={state.data.colicalc.nop} />
                </InputGroup>
            </Column>

            {/* 'Dados morfométricos e ambientais' column */}
            <Column title="Dados adicionais">
                <Grid>
                    <InputGroup>
                        <Label>T <TooltipInfo info={'Temperatura do Rio'} /></Label>
                        <Input placeholder="°C" value={state.data.colicalc.t} />
                    </InputGroup>
                    {state.data.colicalc.v === null && <InputGroup>
                        <Label>d <TooltipInfo info={'Distância do percurso'} /></Label>
                        <Input placeholder="m" value={state.data.colicalc.d} />
                    </InputGroup>}
                    {state.data.colicalc.v === null && <InputGroup>
                        <Label>N° trechos <TooltipInfo info={'Número de partições do rio'} /></Label>
                        <Input placeholder="Quantidade" value={state.data.colicalc.particoes} />
                    </InputGroup>}
                    {state.data.colicalc.v === null && <InputGroup>
                        <Label>v <TooltipInfo info={"Velocidade do Rio"} /></Label>
                        <Input placeholder="m/s" value={state.data.colicalc.v} />
                    </InputGroup>}
                    <InputGroup>
                        <Label>Kb <TooltipInfo info={'Coeficiente de decaimento bacteriano'} /></Label>
                        <Input placeholder="1/dia" value={state.data.colicalc.kb} />
                    </InputGroup>
                    <InputGroup>
                        <Label>θ para Kb <TooltipInfo info={'Coeficiente de temperatura'} /></Label>
                        <Input placeholder="1/dia" value={state.data.colicalc.teta} />
                    </InputGroup>

                </Grid>
            </Column>
        </ColumnWrapper>
    );
};

