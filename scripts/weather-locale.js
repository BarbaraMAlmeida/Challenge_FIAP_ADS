const apiKey = 'f057a9b14eee7a94b0bcd7ba97293e33';
let cityName = 'São Paulo';
let latitude;
let longitude;
let temperature;
let windSpeed;
let humidity;

window.addEventListener('load', () => {
    getWeatherLocaleToll();
    setTimeout(() => {
        getWeather();
    }, 500);

    document.getElementById('admin_selection').addEventListener('change', () => {
        getWeatherLocaleToll();
        setTimeout(() => {
            getWeather();
        }, 1000);
    });

})

function getWeatherLocaleToll() {
    let selectToll = document.getElementById('admin_selection').value;
    
    let resultTownState = getTownState(selectToll);
    let resultTown = getTown(selectToll);

    let localeCardWeather = document.getElementById('localeWeather');
    localeCardWeather.innerHTML = resultTownState;

    getLatAndLon(resultTown);

}

function getTownState(endereco) {
    const regex = /,\s*([^,]*\s*-\s*[A-Z]{2})$/;
    const resultado = endereco.match(regex);
    return resultado ? resultado[1] : null;
}

function getTown(endereco) {
    const regex = /,\s*([^,]+)\s*-\s*\w{2}$/;
    const match = endereco.match(regex);
    return match ? match[1].split('-')[0].trim() : null;
}

function getWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao recuperar os dados meteorológicos');
            }
            return response.json();
        })
        .then(data => {
           
            description = data.weather[0].description
            description = description.charAt(0).toUpperCase() + description.slice(1);
            temperature = `${data.main.temp} °C`;
            windSpeed = `Vento - ${data.wind.speed} Km/h`;
            humidity = `Humidade - ${data.main.humidity}%`;

            insertDataInCardWeather();
        })
        .catch(error => {
            console.error('Erro na API:', error);
        });
}

function getLatAndLon(town) {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=1&appid=${apiKey}`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao recuperar os dados de latitude');
            }
            return response.json();
        })
        .then(data => {
            latitude = data[0].lat;
            longitude = data[0].lon;
        })
        .catch(error => {
            console.error('Erro na API:', error);
        });
}


function insertDataInCardWeather() {
    let spanStatus = document.getElementById('spanStatus');
    let spanTemp = document.getElementById('spanTemp');
    let spanWind = document.getElementById('spanWind');
    let spanHumidity = document.getElementById('spanHumidity');

    spanStatus.innerHTML = description;
    spanTemp.innerHTML = temperature;
    spanWind.innerHTML = windSpeed;
    spanHumidity.innerHTML = humidity;
}