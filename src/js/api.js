'use strict';

export const apiKey = `d60459d0b13be2ef2fc091f4eb3c36a4`;

export const fetchData = () => {
    let response = fetch(`${url}&appid=${apiKey}&units=metric`);
    let data = response.json();
     
}

export const url = {
    currentWeather (lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
    },

    forecast (lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`;
    },

    airPollution (lat, lon) {
        return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`;
    },
    
    reverseGeo (lat, lon) {
        return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;
    }, 

    geoCoding (query) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    }
}