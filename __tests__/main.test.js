const { renderResult, submit } = require('../main');

beforeEach(() => {
    document.body.innerHTML =
        '<script id="weather-template" type="text/x-handlebars-template"><div id="icon-temp"><img src="{{iconUrl}}" alt="Weather icon"/><div id="temp">{{temperature}}°C</div></div><div><div id="description">{{description}}</div><div>Barometer {{pressure}} hPa</div><div>Humidity {{humidity}} %</div><div>Wind {{windSpeed}} m/s</div></div></script>' +
        '<script id="error-template" type="text/x-handlebars-template"><div>{{status}}<br>{{message}}</div></script>' +
        '<div id="weather-container">' +
        '<form id="city-form"></form>' +
        '</div>';
});

describe('renderResult function', () => {
    test('should render error when isOk property is false', () => {
        const result = {
            isOk: false,
            error: {
                status: '404',
                message: 'city not found'
            }
        };

        renderResult(result);

        const expectedResult =
            '<div>' +
            '404' +
            '<br>' +
            'city not found' +
            '</div>';

        expect(document.getElementById('result-container').innerHTML)
            .toEqual(expectedResult);
    });

    test('should render weather when isOk property is true', () => {
        const result = {
            isOk: true,
            weather: {
                iconUrl: "http://openweathermap.org/img/w/50n.png",
                description: "mist",
                temperature: "14",
                pressure: 1022,
                humidity: 100,
                windSpeed: 3.6
            }
        };

        renderResult(result);

        const expectedResult =
            '<div id="icon-temp">' +
            '<img src="http://openweathermap.org/img/w/50n.png" alt="Weather icon">' +
            '<div id="temp">14°C</div>' +
            '</div>' +
            '<div>' +
            '<div id="description">mist</div>' +
            '<div>Barometer 1022 hPa</div>' +
            '<div>Humidity 100 %</div>' +
            '<div>Wind 3.6 m/s</div>' +
            '</div>';

        expect(document.getElementById('result-container').innerHTML)
            .toEqual(expectedResult);
    });
});