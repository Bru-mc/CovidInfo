let data = doGet("https://api.covid19api.com/countries");
const countries = JSON.parse(data);
data = doGet("https://api.covid19api.com/summary");
const summary = JSON.parse(data);
console.log(summary);
/*summary.Countries.forEach((element) => {
  console.log(element);
});*/
let confirmed = summary.Global.TotalConfirmed;
let deaths = summary.Global.TotalDeaths;
let recovered = summary.Global.TotalRecovered;
let active = confirmed - deaths - recovered;

innerDashboard(confirmed, deaths, recovered, active);

function innerDashboard(confirmed, deaths, recovered, active) {
  document.querySelector(".conf").innerHTML = confirmed;
  document.querySelector(".mort").innerHTML = deaths;
  document.querySelector(".rec").innerHTML = recovered;
  document.querySelector(".ati").innerHTML = active;
}

function doGet(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

let input = document.querySelector("#search");
let date = document.querySelector("#date");
let btn = document.querySelector(".subBut");

btn.addEventListener("click", searchFor);

function searchFor() {
  console.log("Entrei");
  console.log(input.value);
  let countryData = input.value;
  let dateData = date.value;
  console.log(dateData);
  let splitDateData = dateData.split("-");
  let dayData = splitDateData[2];
  let nextDay = parseInt(dayData) + 1;
  nextDay = nextDay < 10 ? "0" + nextDay.toString() : nextDay;
  let nextDayDate = splitDateData[0] + "-" + splitDateData[1] + "-" + nextDay;
  console.log(nextDayDate);

  countries.forEach((element) => {
    if (element.Country === countryData) {
      countryData = element.Slug;
    }
  });
  const url = `https://api.covid19api.com/country/${countryData}?from=${dateData}T00:00:00Z&to=${nextDayDate}T00:00:00Z`;
  data = doGet(url);
  console.log(url);
  const byCountryAllStatus = JSON.parse(data);
  console.log(byCountryAllStatus);

  let confirmed = byCountryAllStatus[1].Confirmed;
  let deaths = byCountryAllStatus[1].Deaths;
  let recovered = byCountryAllStatus[1].Recovered;
  let active = confirmed - deaths - recovered;
  document.querySelector(".conf").innerHTML = confirmed;
  document.querySelector(".mort").innerHTML = deaths;
  document.querySelector(".rec").innerHTML = recovered;
  document.querySelector(".ati").innerHTML = active;

  /*summary.Countries.forEach((element) => {
    if (element.Country === input.value) {
      console.log(element);
    }
  });*/
}
