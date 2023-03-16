const countries = document.querySelector('datalist');
const search = document.querySelector('#srch');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const chart = document.querySelector('.chart');

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary";

async function covid(country) {
    countries.innerHTML = `<option value="World">World</option>`;
    resetValue(confirmed);
    resetValue(deaths);
    resetValue(recovered);

    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(country)

    if (res.status === 4 || res.status === 200) {
        date.textContent = new Date(data.Date).toDateString();

        if (country === '' || country === 'World') {
            const { TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered } = data.Global;

            confirmed.children[1].textContent = TotalConfirmed;
            confirmed.children[2].textContent = "เพิ่ม "+NewConfirmed;

            deaths.children[1].textContent = TotalDeaths;
            deaths.children[2].textContent = "เพิ่ม "+NewDeaths;

            recovered.children[1].textContent = TotalRecovered;
            recovered.children[2].textContent = "เพิ่ม "+NewRecovered;

            nameCountry.textContent = 'ผู้ติดเชื้อทั่วโลก';
            dataChart = [TotalConfirmed, TotalDeaths, TotalRecovered];
        };

        data.Countries.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Country;
            option.textContent = item.Country;
            countries.appendChild(option);

            if (country === item.Country) {
                confirmed.children[1].textContent = item.TotalConfirmed;
                confirmed.children[2].textContent = "เพิ่ม "+item.NewConfirmed;

                deaths.children[1].textContent = item.TotalDeaths;
                deaths.children[2].textContent = "เพิ่ม "+item.NewDeaths;

                recovered.children[1].textContent = item.TotalRecovered;
                recovered.children[2].textContent = "เพิ่ม "+item.NewRecovered;


                nameCountry.textContent = item.Country;
                dataChart = [item.TotalConfirmed, item.TotalDeaths, item.TotalRecovered];
            }
        });

        drawChart(dataChart);

    } else {
        chart.innerHTML = `<h2>Loading...</h2>`;
    }
}

function resetValue(element) {
    element.children[1].textContent = 0;
    element.children[2].textContent = 0;
};
function drawChart(data) {
    chart.innerHTML = '';
    const ctx = document.createElement('canvas');
    chart.appendChild(ctx);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ติดเชื้อทั้งหมด', 'เสียชีวิตทั้งหมด', 'รักษาหายทั้งหมด'],
            datasets: [{
                label: nameCountry.textContent,
                data: data,
                backgroundColor: ['crimson', 'black', 'green']
            }]
        },
        options: {}
    });
};

covid(search.value);

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    covid(search.value);
    search.value = '';
})

