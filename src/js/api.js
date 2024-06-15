'use strict';

const apiKey = 'd60459d0b13be2ef2fc091f4eb3c36a4';

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    },

    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
    },

    airPollution(lat, lon) {
        return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric`;
    },
    
    /**
    * @param {query} url Search query e.g., "London", "New York", "San Franciso"
    */

    geoCoding(query) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&units=metric`;
    }
}

export const fetchData = async (URL) => {
    let response = await fetch(`${URL}&appid=${apiKey}`);
    let data = await response.json();
    return data;
}




