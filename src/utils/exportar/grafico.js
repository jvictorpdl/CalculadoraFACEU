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
