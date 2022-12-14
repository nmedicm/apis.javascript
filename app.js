const formulario = document.querySelector("#formulario")
const monto = document.querySelector("#monto")
const moneda = document.querySelector("#moneda")
const resultado = document.querySelector("#resultado")
const ctx = document.querySelector("#myChart")

formulario.addEventListener("submit", async(e) => {
    e.preventDefault();

    try{
    const res = await fetch("mindicador.json");
    if(!res.ok) throw "Falló la solicitud";
    const data = await res.json();
    resultado.innerHTML = `<p>El resultado es: ${monto.value / data[moneda.value].valor}</p>`;
    renderChart(moneda.value);
    } catch (error) {
        resultado.innerHTML = error;
    }
})

const renderChart = async(moneda) => {
    console.log(moneda);

    const respuesta = await fetch(`https://mindicador.cl/api/${moneda}`)
    const data = await respuesta.json();
    const arrayResultados = data.serie.slice(0, 10).reverse();

    const labels = arrayResultados.map(item => item.fecha.split("T"[0].split("-").reverse().join("-")));
    const dataMoneda = arrayResultados.map(item => item.valor);
    console.log(dataMoneda)

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Historial de los últimos diez días",
                    data: dataMoneda,
                    borderwidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },

    });
};