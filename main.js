const appId="d5bb735f9e1ce1a846ab736fc9d95dc6";
const weatherTemplate = Handlebars.compile(document.getElementById('weather-template').innerHTML);
const errorTemplate = Handlebars.compile(document.getElementById('error-template').innerHTML);
const request = new XMLHttpRequest();

function getWeather(cityName) {
    cityName.preventDefault();

    let lastResult = document.getElementById('result-container');
    if (lastResult) {
        lastResult.remove();
    }

    request.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=" + cityName.target[0].value + "&appid=" + appId + "&mode=xml");
    request.send();

    request.onreadystatechange = () => {
        
        if (request.responseXML.getElementsByTagName('cod')[0]) {
            let error = {
                status: request.responseXML.getElementsByTagName('cod')[0].textContent,
                message: request.responseXML.getElementsByTagName('message')[0].textContent
            };
            renderError(error);
            return;
        }

        let weather = {
            iconUrl: "http://openweathermap.org/img/w/" +
                request.responseXML.getElementsByTagName('weather')[0].getAttribute('icon') + ".png",
            description: request.responseXML.getElementsByTagName('weather')[0].getAttribute('value'),
            temperature: (request.responseXML.getElementsByTagName('temperature')[0]
                .getAttribute('value') - 273.15).toFixed(0),
            pressure: request.responseXML.getElementsByTagName('pressure')[0].getAttribute('value'),
            humidity: request.responseXML.getElementsByTagName('humidity')[0].getAttribute('value'),
            windSpeed: request.responseXML.getElementsByTagName('wind')[0]
                .getElementsByTagName('speed')[0].getAttribute('value')
        };
        renderWeather(weather);
    }
}

    // $.ajax({
    //     url: 'https://api.openweathermap.org/data/2.5/weather',
    //     dataType: 'json',
    //     data: {
    //         q: cityName,
    //         appId: appId
    //     }
    // })
    //     .done(
    //         function (data) {
    //             let weather = {
    //                 iconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
    //                 description: data.weather[0].description,
    //                 temperature: (data.main.temp - 273.15).toFixed(0),
    //                 pressure: data.main.pressure,
    //                 humidity: data.main.humidity,
    //                 windSpeed: data.wind.speed
    //             };
    //             renderWeather(weather);
    //         }
    //     )
    //     .fail(
    //         function (err) {
    //             renderError(err);
    //         }
    //     )

renderWeather = (weather) => {
    let weatherContainer = document.getElementById('weather-container');
    let html = weatherTemplate(weather);
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'result-container';
    weatherContainer.appendChild(div);
}

renderError = (err) => {
    let weatherContainer = document.getElementById('weather-container');
    let html = errorTemplate(err);
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'result-container';
    weatherContainer.appendChild(div);
}

document.getElementById('city-form').addEventListener('submit', getWeather);