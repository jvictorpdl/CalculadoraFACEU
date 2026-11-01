import { FileImage, FileSpreadsheet, FileText, FileType, Table } from 'lucide-react';
import { useState } from 'react';
import { nomeArquivo, relatorioCsv } from '../../utils/relatorio';
import { Botao, Botoes, Caixa, Erro, Titulo } from './style';

const imagemDe = async (grafico) => {
    if (!grafico) return null;
    const { imagemDoGrafico } = await import('../../utils/exportar/grafico');
    return imagemDoGrafico(grafico);
};

// cada biblioteca só é baixada quando alguém escolhe o formato
const formatos = [
    {
        rotulo: 'PDF',
        Icone: FileText,
        extensao: 'pdf',
        gerar: async ({ relatorio, grafico, gerado }) => {
            const [{ gerarPdf }, imagem] = await Promise.all([import('../../utils/exportar/pdf'), imagemDe(grafico)]);
            return gerarPdf(relatorio, imagem, gerado);
        },
    },
    {
        rotulo: 'Word',
        Icone: FileType,
        extensao: 'docx',
        gerar: async ({ relatorio, grafico, gerado }) => {
            const [{ gerarWord }, imagem] = await Promise.all([import('../../utils/exportar/word'), imagemDe(grafico)]);
            return gerarWord(relatorio, imagem, gerado);
        },
    },
    {
        rotulo: 'Excel',
        Icone: FileSpreadsheet,
        extensao: 'xlsx',
        gerar: async ({ relatorio, gerado }) => {
            const { gerarExcel } = await import('../../utils/exportar/excel');
            return gerarExcel(relatorio, gerado);
        },
    },
    {
        rotulo: 'CSV',
        Icone: Table,
        extensao: 'csv',
        gerar: async ({ relatorio, gerado }) => new Blob([relatorioCsv(relatorio, gerado)], { type: 'text/csv;charset=utf-8' }),
    },
    {
        rotulo: 'Imagem do gráfico',
        Icone: FileImage,
        extensao: 'png',
        parte: '-grafico',
        precisaDeGrafico: true,
        gerar: async ({ grafico }) => (await fetch(await imagemDe(grafico))).blob(),
    },
];

function salvar(blob, nome) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nome;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // o Safari do iPhone ainda lê o endereço depois do clique
    setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export default function BaixarRelatorio({ relatorio, grafico = null }) {
    const [gerando, setGerando] = useState(null);
    const [falhou, setFalhou] = useState(false);

    async function baixar(formato) {
        setGerando(formato.rotulo);
        setFalhou(false);
        try {
            const gerado = new Date();
            const blob = await formato.gerar({ relatorio, grafico, gerado });
            salvar(blob, nomeArquivo(relatorio, gerado, formato.extensao, formato.parte));
        } catch (erro) {
            console.error(erro);
            setFalhou(true);
        } finally {
            setGerando(null);
        }
    }

    return (
        <Caixa aria-label="Baixar relatório">
            <Titulo>Baixar relatório com os valores fornecidos</Titulo>
            <Botoes>
                {formatos
                    .filter(({ precisaDeGrafico }) => !precisaDeGrafico || grafico)
                    .map((formato) => (
                        <Botao key={formato.rotulo} type="button" disabled={gerando !== null} onClick={() => baixar(formato)}>
                            <formato.Icone size={16} aria-hidden="true" />
                            {gerando === formato.rotulo ? 'Gerando…' : formato.rotulo}
                        </Botao>
                    ))}
            </Botoes>
            {falhou && <Erro role="alert">Não foi possível gerar o arquivo. Tente de novo.</Erro>}
        </Caixa>
    );
}
