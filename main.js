const weatherTemplate = Handlebars.compile(document.getElementById('weather-template').innerHTML);
const errorTemplate = Handlebars.compile(document.getElementById('error-template').innerHTML);

const { getWeather } = require('./weatherGetter');

submit = async event => {
    event.preventDefault();

    let lastResult = document.getElementById('result-container');
    if (lastResult) {
        lastResult.remove();
    }

    result = await getWeather(event.target[0].value);
    renderResult(result);
}

renderResult = result => {
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

exports.renderResult = renderResult;
exports.submit = submit;