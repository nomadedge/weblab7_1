const openWeatherKey = "d5bb735f9e1ce1a846ab736fc9d95dc6";
const weatherTemplate = Handlebars.compile(document.getElementById('weather-template').innerHTML);
const errorTemplate = Handlebars.compile(document.getElementById('error-template').innerHTML);
let globalResult;

async function submit(event) {
    event.preventDefault();

    let lastResult = document.getElementById('result-container');
    if (lastResult) {
        lastResult.remove();
    }

    result = await getWeather(event.target[0].value);
    renderResult(result);
}

function getWeather(cityName) {
    return new Promise(async result => {
        const openWeatherUrl =
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            cityName +
            '&appid=' +
            openWeatherKey;

        const weatherData = await fetch(openWeatherUrl);
        const weatherJson = await weatherData.json();

        if (weatherData.ok) {
            const weather = {
                iconUrl:
                    'http://openweathermap.org/img/w/' +
                    weatherJson.weather[0].icon +
                    '.png',
                description: weatherJson.weather[0].description,
                temperature: (weatherJson.main.temp - 273.15).toFixed(0),
                pressure: weatherJson.main.pressure,
                humidity: weatherJson.main.humidity,
                windSpeed: weatherJson.wind.speed
            };
            const out = {
                isOk: true,
                weather: weather
            };
            result(out);
            return;
        } else {
            const out = {
                isOk: false,
                error: {
                    status: weatherJson.cod,
                    message: weatherJson.message
                }
            };
            result(out);
            return;
        };
    });
}

function renderResult(result) {
    let weatherContainer = document.getElementById('weather-container');
    let html;
    if (result.isOk) {
        html = weatherTemplate(result.weather);
    }
    else {
        html = errorTemplate(result.error);
    }
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'result-container';
    weatherContainer.appendChild(div);
}

document.getElementById('city-form').addEventListener('submit', submit);