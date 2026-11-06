import ApexCharts from 'apexcharts';

export const LARGURA_GRAFICO = 900;
export const ALTURA_GRAFICO = 450;

// desenha o gráfico fora da tela, em tamanho fixo: no celular o da página sairia estreito e comprido
export async function imagemDoGrafico({ series, options }) {
    const caixa = document.createElement('div');
    caixa.style.cssText = `position: fixed; left: -${2 * LARGURA_GRAFICO}px; top: 0; width: ${LARGURA_GRAFICO}px; background: #FFF;`;
    document.body.appendChild(caixa);

    const grafico = new ApexCharts(caixa, {
        ...options,
        series,
        chart: {
            ...options.chart,
            type: 'line',
            width: LARGURA_GRAFICO,
            height: ALTURA_GRAFICO,
            background: '#FFF',
            animations: { enabled: false },
            toolbar: { show: false },
        },
    });

    try {
        await grafico.render();
        const { imgURI } = await grafico.dataURI({ scale: 2 });
        return imgURI;
    } finally {
        grafico.destroy();
        caixa.remove();
    }
}

// um PNG só, com os gráficos um embaixo do outro, como na figura do livro
export async function imagemDosGraficos(graficos) {
    const uris = await Promise.all(graficos.map(imagemDoGrafico));
    if (uris.length === 1) return uris[0];

    const imagens = await Promise.all(uris.map(async (uri) => {
        const imagem = new Image();
        imagem.src = uri;
        await imagem.decode();
        return imagem;
    }));
    const tela = document.createElement('canvas');
    tela.width = Math.max(...imagens.map((imagem) => imagem.width));
    tela.height = imagens.reduce((soma, imagem) => soma + imagem.height, 0);
    const contexto = tela.getContext('2d');
    contexto.fillStyle = '#FFF';
    contexto.fillRect(0, 0, tela.width, tela.height);
    imagens.reduce((y, imagem) => {
        contexto.drawImage(imagem, 0, y);
        return y + imagem.height;
    }, 0);
    return tela.toDataURL('image/png');
}
