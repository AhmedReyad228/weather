/* Today Variables */
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let city = document.getElementById("city");
let tempCelsiusToday = document.getElementById("tempCelsiusToday");
let todayIcon = document.getElementById("todayIcon");
let todayStatus = document.getElementById("todayStatus");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");

/* next Variables */
let nextName = document.getElementsByClassName("nextName");
let nextIcon = document.getElementsByClassName("nextIcon");
let tempCelsiusNext = document.getElementsByClassName("tempCelsiusNext");
let tempFahrenheit = document.getElementsByClassName("tempFahrenheit");
let nextStatus = document.getElementsByClassName("nextStatus");

let searchInp = document.getElementById("searchInp");

async function getData(searchCity = 'cairo') {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=48c953591f8a4c00b34201925233112&q=${searchCity}&days=3`
  );

  let weatherData = await weatherResponse.json();

  if(!weatherData.error){
    display(weatherData);
  }

}

function display(data) {
  let todayDate = new Date();

  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate() + "&nbsp;";
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });

  city.innerHTML = data.location.name;
  tempCelsiusToday.innerHTML = data.current.temp_c + " &deg;C";
  todayIcon.setAttribute("src", "https:" + data.current.condition.icon);
  todayStatus.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + " %";
  wind.innerHTML = data.current.wind_kph + " km/h";
  windDirection.innerHTML = data.current.wind_dir;

  for (let i = 0; i < 2; i++) {
    let forcastData = data.forecast.forecastday;
    let nextDate = new Date(forcastData[i + 1].date);

    nextName[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    tempCelsiusNext[i].innerHTML = forcastData[i + 1].day.maxtemp_c + " &deg;C";
    tempFahrenheit[i].innerHTML = forcastData[i + 1].day.maxtemp_f + " &deg;";
    nextStatus[i].innerHTML = forcastData[i + 1].day.condition.text;
    nextIcon[i].setAttribute(
      "src",
      "https:" + forcastData[i + 1].day.condition.icon
    );
  }
}

getData();


searchInp.addEventListener('input', function(){
    if(searchInp.value == ''){
        getData();
    }
    else{
        getData(searchInp.value);
    }
})


