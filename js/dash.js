const ctxUmidade = document.getElementById('gaugeUmida');
const ctx = document.getElementById('gaugeTemp');
const maxUmidade = 100;
const max = 40;

async function lerDados () {
  const res = await fetch('http://10.110.12.50:1880/sensor');
  const dados = await res.json();

  console.log(dados);

  let valor = dados[0].temperatura; 
  let valorUmidade = dados[0].umidade;
  
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
};

lerDados ();