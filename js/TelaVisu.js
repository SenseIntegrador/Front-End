const url = 'http:///10.110.12.36:1880/'

async function tempRecentes () {
      fetch(url + "sensor_recente")
      .then(res => res.json())
      .then(dados => {
          const lista = document.getElementById("lsTemp");
          lista.innerHTML = "";
          dados.forEach(sensor => {
              const li = document.createElement("li");
              li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
              lista.appendChild(li);
            });
        })
        .catch(err => console.error(err));
    };
    
async function umiRecentes () {
    fetch(url + "sensor_recente")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsUmi");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
            li.textContent = `${sensor.temperatura + ' %' + ' | '} (${sensor.data})`;
            lista.appendChild(li);
        });
    })
    .catch(err => console.error(err));
};

async function tempAntigas () {
    fetch(url + "sensor_antigo")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsTemp");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
      li.textContent = `${sensor.temperatura + '°C' + ' | '} (${sensor.data})`;
      lista.appendChild(li);
    });
  })
  .catch(err => console.error(err));


async function umiAntigas () {
fetch("http://10.110.12.16:1880/sensor_antigo")
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById("lsTemp");
  
      dados.forEach(sensor => {
        const li = document.createElement("li");
        li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error(err));
};

};

async function umiAntigas () {
    fetch(url + "sensor_antigo")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsUmi");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
      li.textContent = `${sensor.umidade + ' %' + ' | '} (${sensor.data})`;
      lista.appendChild(li);
    });
  })
  .catch(err => console.error(err));


async function umiAntigas () {
fetch("http://10.110.12.16:1880/sensor_antigo")
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById("lsTemp");
  
      dados.forEach(sensor => {
        const li = document.createElement("li");
        li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error(err));
};

};

async function tempMin () {
    fetch(url + "sensor_temp_min")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsTemp");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
            li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
            lista.appendChild(li);
          });
      })
      .catch(err => console.error(err));
  };
  
async function umiMin () {
    fetch(url + "sensor_umi_min")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsUmi");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
            li.textContent = `${sensor.temperatura + ' %' + ' | '} (${sensor.data})`;
            lista.appendChild(li);
        });
    })
    .catch(err => console.error(err));
};
  
async function tempMax () {
    fetch(url + "sensor_temp_max")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsTemp");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
      li.textContent = `${sensor.temperatura + '°C' + ' | '} (${sensor.data})`;
      lista.appendChild(li);
    });
  })
  .catch(err => console.error(err));


async function umiAntigas () {
fetch("http://10.110.12.16:1880/sensor_antigo")
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById("lsTemp");
  
      dados.forEach(sensor => {
        const li = document.createElement("li");
        li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error(err));
};

};
  
async function umiMax () {
    fetch(url + "sensor_umi_max")
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lsUmi");
        lista.innerHTML = "";
        dados.forEach(sensor => {
            const li = document.createElement("li");
      li.textContent = `${sensor.umidade + ' %' + ' | '} (${sensor.data})`;
      lista.appendChild(li);
    });
  })
  .catch(err => console.error(err));


async function umiAntigas () {
fetch(url + "sensor_antigo")
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById("lsTemp");
  
      dados.forEach(sensor => {
        const li = document.createElement("li");
        li.textContent = `${sensor.temperatura + ' °C' + ' | '} (${sensor.data})`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error(err));
};

};


function filtroTemperatura(valor) {
if (valor === "recentes") {
tempRecentes();
} else if (valor === "antigas") {
tempAntigas();
} else if (valor === "maxima") {
tempMax();
} else if (valor === "minima") {
tempMin();
}
}

function filtroUmidade(valor) {
  if (valor === "recentes") {
    umiRecentes();
  } else if (valor === "antigas") {
    umiAntigas();
  } else if (valor === "maxima") {
    umiMax();
  } else if (valor === "minima") {
    umiMin();
  }
}

tempRecentes();
umiRecentes();