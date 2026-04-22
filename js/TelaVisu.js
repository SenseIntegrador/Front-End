async function recentes () {
    fetch("http://10.110.12.16:1880/sensor_100")
      .then(res => res.json())
      .then(dados => {
        const lista = document.getElementById("lsUmi");
    
        dados.forEach(sensor => {
          const li = document.createElement("li");
          li.textContent = `${sensor.umidade + ' %' + ' | '} (${sensor.data})`;
          lista.appendChild(li);
        });
      })
      .catch(err => console.error(err));

      fetch("http://10.110.12.16:1880/sensor_100")
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

recentes();