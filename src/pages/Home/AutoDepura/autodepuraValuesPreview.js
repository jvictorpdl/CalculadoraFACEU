import { useContext } from 'react';
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

export default function AutodepuraValuesPreview() {
    const { state } = useContext(ApplicationContext);


    return (
        <ColumnWrapper>
            {/* 'Dados do rio' column */}
            <Column title="Dados do rio">
                <Grid>

                    <InputGroup>
                        <Label>Qr <InfoIcon /></Label>
                        <Input placeholder="m³/s" value={state.data.autodepura.qr} />
                    </InputGroup>
                    <InputGroup>
                        <Label>ODr <InfoIcon /></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.odr} />
                    </InputGroup>
                    <InputGroup>
                        <Label>DBOr <InfoIcon /></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.dbor} />
                    </InputGroup>
                    <InputGroup>
                        <Label>ODmín <InfoIcon /></Label>
                        <Input placeholder="mg/L" value={state.data.autodepura.odmin} />
                    </InputGroup>
                </Grid>
            </Column>

            {/* 'Dados do esgoto' column */}
            <Column title="Dados do esgoto">
                <InputGroup>
                    <Label>Qe <InfoIcon /></Label>
                    <Input placeholder="m³/s" value={state.data.autodepura.qe} />
                </InputGroup>
                <InputGroup>
                    <Label>ODe <InfoIcon /></Label>
                    <Input placeholder="mg/L" value={state.data.autodepura.ode} />
                </InputGroup>
            </Column>

            {/* 'Dados morfométricos e ambientais' column */}
            <Column title="Dados morfométricos e ambientais">
                <Grid>
                    <InputGroup>
                        <Label>k1(20°C) <InfoIcon /></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k120c} />
                    </InputGroup>
                    <InputGroup>
                        <Label>θ para K1 <InfoIcon /></Label>
                        <Input placeholder="ad." value={state.data.autodepura.tetak1} />
                    </InputGroup>
                    <InputGroup>
                        <Label>T <InfoIcon /></Label>
                        <Input placeholder="°C" value={state.data.autodepura.temperatura} />
                    </InputGroup>
                    <InputGroup>
                        <Label>K1T <InfoIcon /></Label>
                        <Input placeholder="1/dia" value={state.data.autodepura.k1t} />
                    </InputGroup>
                </Grid>
            </Column>
        </ColumnWrapper>
    );
};

