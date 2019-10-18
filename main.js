const appId="d5bb735f9e1ce1a846ab736fc9d95dc6";
const weatherTemplate = Handlebars.compile(document.getElementById('weather-template').innerHTML);
const errorTemplate = Handlebars.compile(document.getElementById('error-template').innerHTML);
const request = new XMLHttpRequest();
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
    return new Promise(result => {
        request.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=" + event.target[0].value + "&appid=" + appId + "&mode=xml", true);
        request.send();
    
        request.onreadystatechange = () => {
            if (request.readyState !== 4) return;
            
            if (request.status !== 200) {
                let error = {
                    isOk: false,
                    status: request.status,
                    message: request.statusText
                };
                result(error);
                return;
            }
    
            let weather = {
                isOk: true,
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
            result(weather);
            return;
        }
    });
    
}

function renderResult(result) {
    let weatherContainer = document.getElementById('weather-container');
    let html;
    if (result.isOk) {
        html = weatherTemplate(result);
    }
    else {
        html = errorTemplate(result);
    }
    let div = document.createElement('div');
    div.innerHTML = html;
    div.id = 'result-container';
    weatherContainer.appendChild(div);
}

document.getElementById('city-form').addEventListener('submit', submit);