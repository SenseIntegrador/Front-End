const valor = 20; 
const max = 40;

const ctx = document.getElementById('gaugeTemp');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [valor, max - valor],
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
                        content: [`${valor}°C`],
                        font: [{ size: 20 }],
                        color: ['#fb923c']
                    }
                }
            }
        }
    }
    })
    const valorUmidade = 20;
const maxUmidade = 100;

const ctxUmidade = document.getElementById('gaugeUmida');

new Chart(ctxUmidade, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [valorUmidade, maxUmidade - valorUmidade],
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
            content: [`${valorUmidade}%`],
            font: [{ size: 20 }],
            color: ['#60a5fa']
          }
        }
      }
    }
  }
});
