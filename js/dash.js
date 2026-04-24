const INTERVALO_ATUALIZACAO_MS = 2000;
setInterval(lerDados, 2000); // atualiza a cada 5 segundos
let graficoLinha = null;

const ctxUmidade = document.getElementById('gaugeUmida');
const ctx = document.getElementById('gaugeTemp');
const maxUmidade = 100;
const max = 40;
const url = 'http://10.110.12.36:1880/';

let graficoTemp = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [0, max],
      backgroundColor: ['#fb923c', '#e5e7eb'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: false,
          maintainAspectRatio: false,
          circumference: 180,
          rotation: -90,
          cutout: '70%',
          plugins: {
              legend: { display: false },
              annotation: {
                  annotations: {
                      label: {
                          type: 'doughnutLabel',
                          font: [{ size: 20 }],
                          color: ['#fb923c']
                      }
                  }
              }
          }
  }
});

let graficoUmidade = new Chart(ctxUmidade, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [0, maxUmidade],
      backgroundColor: ['#60a5fa', '#e5e7eb'],
      borderWidth: 0
    }]
  },
  options: { 
    responsive: false,
      maintainAspectRatio: false,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        annotation: {
          annotations: {
            label: {
              type: 'doughnutLabel',
              font: [{ size: 20 }],
              color: ['#60a5fa']
            }
          }
        }
      }
   }
});

function formatarDataCurta(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);
    return d.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function lerUmidade(ponto) {
    const v = ponto.umidade ?? ponto.humidade ?? ponto.humidity;
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function destruirGraficoSeExistir() {
    if (graficoLinha) {
        graficoLinha.destroy();
        graficoLinha = null;
    }
}

function criarOuAtualizarGrafico(labels, temperatura, umidade, temUmidade) {
    const ctx = document.getElementById('grafLinha');
    if (!ctx) return;

    const datasets = [{
        label: 'Temperatura',
        data: temperatura,
        yAxisID: 'y',
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.12)',
        tension: 0.35,
        fill: false,
        spanGaps: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2
    }];

    if (temUmidade) {
        datasets.push({
            label: 'Umidade',
            data: umidade,
            yAxisID: 'y1',
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.12)',
            tension: 0.35,
            fill: false,
            spanGaps: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            borderWidth: 2
        });
    }

    const scales = {
        x: {
            ticks: {
                maxRotation: 45,
                minRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
                autoSkipPadding: 16,
                color: '#94a3b8',
                callback(value) {
                    const raw = this.getLabelForValue(value);
                    return formatarDataCurta(raw);
                }
            },
            grid: { color: 'rgba(255, 255, 255, 0.06)' }
        },
        y: {
            id: 'y',
            position: 'left',
            ticks: { color: '#fb923c' },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            title: {
                display: true,
                text: '°C',
                color: '#94a3b8'
            }
        }
    };

    if (temUmidade) {
        scales.y1 = {
            id: 'y1',
            position: 'right',
            ticks: { color: '#60a5fa' },
            grid: { drawOnChartArea: false },
            title: {
                display: true,
                text: '%',
                color: '#94a3b8'
            }
        };
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales,
        plugins: {
            legend: {
                labels: { color: '#cbd5e1' }
            }
        }
    };

    const precisaRecriar =
        !graficoLinha ||
        graficoLinha.data.datasets.length !== datasets.length;

    if (precisaRecriar) {
        destruirGraficoSeExistir();
        graficoLinha = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: { labels, datasets },
            options
        });
        return;
    }

    graficoLinha.data.labels = labels;
    graficoLinha.data.datasets[0].data = temperatura;
    if (temUmidade && graficoLinha.data.datasets[1]) {
        graficoLinha.data.datasets[1].data = umidade;
    }
    graficoLinha.update('none');
}

async function carregarGrafico() {
    const resposta = await fetch(url + 'sensor');
    const dados = await resposta.json();

    const labels = dados.map((d) => d.data);
    const temperatura = dados.map((d) => d.temperatura);
    const umidade = dados.map((d) => lerUmidade(d));

    const temUmidade = umidade.some((u) => u !== null);
    const humiazul = document.getElementById('humiazul');
    if (humiazul && temUmidade) {
        const vals = umidade.filter((u) => u !== null);
        const media = vals.reduce((a, b) => a + b, 0) / vals.length;
        humiazul.textContent = `${Math.round(media)} %`;
    }

    criarOuAtualizarGrafico(labels, temperatura, umidade, temUmidade);
}

async function cicloAtualizacao() {
    try {
        await carregarGrafico();
    } catch (e) {
        console.error('Falha ao atualizar gráfico:', e);
    }
}


 /* Separação */


async function lerDados() {
  const res = await fetch(url + 'sensor_id');
  const dados = await res.json();

  let valor = dados[0].temperatura;
  let valorUmidade = dados[0].umidade;

  // Atualiza temperatura
  graficoTemp.data.datasets[0].data = [valor, max - valor];
  graficoTemp.options.plugins.annotation.annotations.label.content = [`${valor}°C`];
  document.getElementById('lblTemp').textContent = [`${valor}°C`];
  graficoTemp.update();

  // Atualiza umidade
  graficoUmidade.data.datasets[0].data = [valorUmidade, maxUmidade - valorUmidade];
  graficoUmidade.options.plugins.annotation.annotations.label.content = [`${valorUmidade}%`];
  document.getElementById('lblUmi').textContent = [`${valorUmidade}%`];
  graficoUmidade.update();
}


 /* Separação */


lerDados ();
cicloAtualizacao();
setInterval(cicloAtualizacao, INTERVALO_ATUALIZACAO_MS);