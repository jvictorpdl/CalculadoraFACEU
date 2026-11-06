import { act, render } from '@testing-library/react';
import { useContext } from 'react';
import { ApplicationContext, ApplicationStateProvider } from './providers';

const CHAVE = 'calimpe-h20:dados';
let contexto;

function Espiao() {
    contexto = useContext(ApplicationContext);
    return null;
}

const abrir = () => render(<ApplicationStateProvider><Espiao /></ApplicationStateProvider>);
const digitar = (dados) => act(() => contexto.dispatch({
    ...contexto.state,
    data: { ...contexto.state.data, autodepura: { ...contexto.state.data.autodepura, ...dados } },
}));

beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());

test('os valores digitados sobrevivem a recarregar a página', () => {
    const { unmount } = abrir();
    digitar({ qr: 0.651, ode: 0 });
    unmount();

    abrir();

    expect(contexto.state.data.autodepura).toMatchObject({ qr: 0.651, ode: 0, odr: null });
});

test('os trechos seguintes também ficam guardados', () => {
    const { unmount } = abrir();
    digitar({ trechos: [{ id: 'a', qe: 0.45, distancia: 25000 }] });
    unmount();

    abrir();

    expect(contexto.state.data.autodepura.trechos).toEqual([{ id: 'a', qe: 0.45, distancia: 25000 }]);
});

test('dados salvos antes da versão com trechos abrem sem nenhum trecho', () => {
    localStorage.setItem(CHAVE, JSON.stringify({ autodepura: { qr: 0.651 } }));

    abrir();

    expect(contexto.state.data.autodepura).toMatchObject({ qr: 0.651, trechos: [], kd20c: null });
});

test('dados salvos corrompidos não derrubam a calculadora', () => {
    localStorage.setItem(CHAVE, '{quebrado');

    abrir();

    expect(contexto.state.data.autodepura.qr).toBeNull();
});

test('sem acesso ao armazenamento a calculadora segue funcionando', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('bloqueado'); });
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });

    abrir();
    digitar({ qr: 1 });

    expect(contexto.state.data.autodepura.qr).toBe(1);
});
