# Calimpe-H20

Calculadoras on-line de engenharia sanitária para avaliar o lançamento de efluentes em rios e represas. Funcionam no navegador, no computador e no celular, sem cadastro.

**Acesse:** https://calimpe-h20.netlify.app

## Ferramentas

| Ferramenta | O que calcula |
| --- | --- |
| **AutoDepura** | Autodepuração de rios pelo modelo de Streeter-Phelps: perfil de oxigênio dissolvido ao longo do trecho e ponto crítico (ODc, tc e xc), comparados com o OD mínimo informado. |
| **ColiCalc** | Coliformes em um rio **ou** em uma represa, nunca os dois no mesmo cálculo. Mostra o decaimento ao longo do rio ou usa o tempo de detenção da represa, e indica a eficiência de tratamento necessária para atender ao padrão. |
| **EutroFriza** | Em breve. |

## Como funciona

- O preenchimento é feito em passos, com validação nos campos e ajuda com as tabelas de referência.
- Cada tabela de ajuda indica a própria fonte, como Von Sperling (2005) e a Resolução CONAMA 357/2005.
- O resultado traz uma conclusão, o gráfico e os valores calculados.
- O relatório, com os valores fornecidos e os calculados, pode ser baixado em PDF, Word, Excel ou CSV. O gráfico pode ser baixado em PNG.
- Os valores digitados ficam guardados apenas no navegador de quem usa. O botão **Limpar dados** apaga os valores de cada calculadora.

## Para desenvolver

Requer Node.js 18 ou mais recente.

```bash
git clone https://github.com/jvictorpdl/CalculadoraFACEU.git
cd CalculadoraFACEU
npm ci
npm start
```

O site abre em http://localhost:3000.

Para rodar os testes e o build no mesmo modo da Netlify:

```bash
CI=true npm test
CI=true npm run build
```

No PowerShell, rode `$env:CI = 'true'` antes e use os comandos sem o prefixo.

Feito com React 18, Create React App 5, styled-components, React Router e ApexCharts. O relatório usa jsPDF, docx e write-excel-file, carregados só quando alguém baixa o arquivo.

## Estrutura

```text
public/              index.html, manifest e _redirects
src/
  assets/fontes/     subconjunto da fonte Inter usado no PDF
  components/        componentes de interface, incluindo BaixarRelatorio
  core/              estado da aplicação e dados guardados no navegador
  pages/Home/        tela principal, abas e passos das calculadoras
  pages/*Result/     resultados da AutoDepura e do ColiCalc
  utils/             cálculos, validação, relatório e exportação
```

`src/pages/AutoDepura` e `src/pages/ColiCalc` são as telas de 2024. Elas não estão em uso, exceto `src/pages/AutoDepura/styleSteps.js`.

## Publicação

Cada push na `main` publica os projetos da Netlify ligados a este repositório. Depois do envio, confira se o arquivo `main.*.js` do site mudou.

## Cuidados ao alterar

- **Lint:** a Netlify roda o build com `CI=true`, então qualquer aviso do ESLint quebra o deploy e a versão anterior continua no ar sem avisar.
- **Dependências:** a Netlify instala pelo `yarn.lock`, que precisa acompanhar o `package-lock.json`. Mantenha o `docx` em 9.6.1 enquanto algum projeto usar Node 18, porque as versões seguintes dependem do Node 22.
- **Rótulos:** o destaque de erro encontra o campo pelo rótulo. Ao renomear um rótulo, altere também `src/utils/validacao.js`.
- **PDF:** a fonte embutida tem só os caracteres usados hoje. Se o relatório ganhar um caractere novo, regenere o subconjunto em `src/assets/fontes`.
