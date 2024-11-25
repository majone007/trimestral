const url = 'https://raw.githubusercontent.com/0Toco12/API_1/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["BackEnd", "FrontEnd", "Desen.Sistemas", "An.Projetos", "BancoD", "Comp.Grafica", "Redes"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#Disciplina Preferida',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#4682B4',  
                            '#A52A2A', 
                            '#FF4500', 
                            '#B0E0E6', 
                            '#808080', 
                            '#00008B', 
                            '#3498DB'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Disciplinas', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Back_End;
            valores[1] = resp.Front_End;
            valores[2] = resp.Desenvolvimento_de_Sistemas;
            valores[3] = resp.Analise_de_projetos;
            valores[4] = resp.Banco_de_Dados;
            valores[5] = resp.Computacao_Grafica;
            valores[6] = resp.Redes;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
    <p>Essas são as minhas preferências em disciplinas de estudo. <br>
    <p>Matérias como <strong>Back-End</strong>, <strong>Banco de Dados</strong> e <strong>Redes</strong> são as que mais despertam meu interesse com um total de <span>${valores[0]}</span>, <span>${valores[4]}</span> e <span>${valores[6]}</span> pontos de interesse respectivamente, pois oferecem a oportunidade de mergulhar nos aspectos técnicos e funcionais de uma aplicação. Nessas disciplinas, eu posso explorar desde o desenvolvimento e manutenção de servidores, gestão de dados e suas interações, até a configuração de redes para garantir a comunicação eficiente entre sistemas, o que exige conhecimento aprofundado e domínio de tecnologias específicas.</p>
    <p>Além disso, <strong>Desenvolvimento de Sistemas</strong> com <span>${valores[2]}</span> pontos, também é uma das matérias de destaque, permitindo a aplicação de minhas habilidades em várias etapas de criação e implantação de projetos de software. Por outro lado, matérias como <strong>Análise de Projetos</strong> com <span>${valores[3]}</span> pontos, <strong>Front-End</strong> com <span>${valores[1]}</span> pontos e especialmente <strong>Computação Gráfica</strong> com <span>${valores[5]}</span> pontos despertam menos meu interesse, pois minha preferência é por áreas mais técnicas e de fundo de desenvolvimento, com menos foco em interfaces visuais ou aspectos artísticos da programação.</p>
    `;
}
