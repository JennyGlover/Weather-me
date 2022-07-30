function displayTenperature(response){
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);    
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(response.data.main.humidity); 
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);  

}

let apiKey = "653f21a1a63480b1daa3161cac712581";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTenperature);