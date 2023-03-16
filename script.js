async function covid_API() {
    let resonse = await fetch('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all')
    let rawData = await resonse.text()
    let CovidData = JSON.parse(rawData)
    console.log(CovidData)

    for (let i = 0; i < CovidData.length; i++) {

let new_case = document.getElementById('new_case')
let new_death = document.getElementById('new_death')
let total_death = document.getElementById('total_death')
let total_recove = document.getElementById('total_recove')
let total_case = document.getElementById('total_case')

total_case.innerHTML = CovidData[i].total_case +" "+"ราย"
new_death.innerHTML = CovidData[i].new_death +" "+"ราย"
total_death.innerHTML = CovidData[i].total_death +" "+"ราย"
total_recove.innerHTML = CovidData[i].total_recovered +" "+"ราย"
new_case.innerHTML = CovidData[i].new_case_excludeabroad +" "+"ราย"
    }
}
covid_API()

async function covid_table_API() {
    let resonse = await fetch('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces')
    let rawData = await resonse.text()
    let Covid_table = JSON.parse(rawData)
    console.log(Covid_table)


for (let i = 0; i < Covid_table.length; i++) {
    let table = document.getElementById('province_stat')
    
    let row = table.insertRow(i+1);
    let provinces_name = row.insertCell(0);
    let new_cases = row.insertCell(1);
    let total_cases = row.insertCell(2);
    let total_death = row.insertCell(3);
    let new_death = row.insertCell(4);

    provinces_name.innerHTML = Covid_table[i].province;
    new_cases.innerHTML =  Covid_table[i].new_case;
    total_cases.innerHTML =  Covid_table[i].total_case;
    total_death.innerHTML =  Covid_table[i].total_death;
    new_death.innerHTML =   Covid_table[i].new_death;
    }
}
covid_table_API()

/*Icon responesive*/
const items = document.querySelectorAll('.accordion a');

function toggleAccordion(){
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
}
items.forEach(item => item.addEventListener('click',toggleAccordion))

