import { Chart } from "chart.js"


const graph = () => {
    const ctx = document.querySelector('#line-graph').getContext('2d')
    const labels = ['2001', '2003', '2005']
    const data = {
        labels,
        datasets: [
            {
                data: [4, 5, 6],
                label: `dummy`
            },
        ],
    };


    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true
        },
    };

    const graph = new Chart(ctx, config)
}


module.exports = graph