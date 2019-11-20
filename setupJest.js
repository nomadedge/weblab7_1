global.fetch = require('jest-fetch-mock');

global.Handlebars = require('handlebars');

Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
});
document.body.innerHTML =
    '<script id="weather-template" type="text/x-handlebars-template"><div id="icon-temp"><img src="{{iconUrl}}" alt="Weather icon"/><div id="temp">{{temperature}}°C</div></div><div><div id="description">{{description}}</div><div>Barometer {{pressure}} hPa</div><div>Humidity {{humidity}} %</div><div>Wind {{windSpeed}} m/s</div></div></script>' +
    '<script id="error-template" type="text/x-handlebars-template"><div>{{status}}<br>{{message}}</div></script>' +
    '<div id="weather-container">' +
    '<form id="city-form"></form>' +
    '</div>';
