function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
    
}

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Sat", "Sun", "Mon", "Tue"];
    days.forEach(function(day){
        forecastHTML = forecastHTML +
          `
                <div class="col-2">
                    <div class="weather-forecast-date">
                    ${day}
                   </div>
                  
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" 
                    alt="" 
                    width="36"
                    /> 
                    <div class="weather-forcast-temperature">
                     <span class="weather-forecast-temperature-maximum">
                        18°
                     </span>
                     <span class="weather-forecast-temperature-minimum">
                        12°
                     </span>
                   </div>
                </div>
    `;
    }
    
    )
   
   
   
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;

   
}

function displayTenperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemperature);    
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(response.data.main.humidity); 
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);  
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

}

function search(city){
    let apiKey = "653f21a1a63480b1daa3161cac712581";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTenperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
   

}

function displayFahrenheitTemperature(event){
    event.preventDefault();     
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celciusTemperature);


}

let celciusTemperature = null;
displayForecast();

let form = document.querySelector("#sear-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Paris");
