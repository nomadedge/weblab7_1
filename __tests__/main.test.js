const { renderResult } = require('../main');
const { bodyHtml } = require('../setupJest');

beforeEach(() => {
    document.body.innerHTML = bodyHtml;
});

describe('renderResult function', () => {
    test('should render error when isOk property is false and there is no previous result', () => {
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

    test('should render weather when isOk property is true and there is no previous result', () => {
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

    test('should render error when isOk property is false and there is previous result', () => {
        const weatherContainer = document.getElementById('weather-container');
        let previousResult = document.createElement('div');
        previousResult.innerHTML =
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
        weatherContainer.appendChild(previousResult);

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

    test('should render weather when isOk property is true and there is previous result', () => {
        const weatherContainer = document.getElementById('weather-container');
        let previousResult = document.createElement('div');
        previousResult.innerHTML =
            '<div>' +
            '404' +
            '<br>' +
            'city not found' +
            '</div>';
        weatherContainer.appendChild(previousResult);

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