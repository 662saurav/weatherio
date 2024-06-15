'use strict';

import { fetchData, url } from './api.js';
import * as module from './module.js';

let searchBox = document.getElementsByTagName("input");
let degree = document.querySelector(".card-text-1 h1");
let ico = document.querySelector(".card-text-1 img");
let desc = document.querySelectorAll(".card-text-1 p")[1];
let date = document.getElementById("date");
let place = document.getElementById("place");

async function getWeather(query) {
    // Geographical latitude and longitude
    const geoCoding = await fetchData(url.geoCoding(query));
    const [{ lat, lon }] = geoCoding;

    // Current weather
    const currentWeather = await fetchData(url.currentWeather(lat, lon));
    const {
        weather,
        dt,
        sys: { sunrise, sunset, country },
        main: { temp, feels_like, pressure, humidity },
        visibility,
        timezone
    } = currentWeather;
    const [{ description, icon }] = weather;

    degree.innerHTML = `${Math.round(temp)}°C`;
    ico.src = `/src/images/weather_icons/${icon}.png`;
    desc.innerHTML = description;
    date.innerHTML = module.getDate(dt, timezone);
    place.innerHTML = `${module.capital(query)}, ${country}`;

    // 5 day weather forecast

    const forecast = await fetchData(url.forecast(lat, lon));
    const {list: list1} = forecast;
    const [{
        dt: for_dt,
        main : {temp: for_temp},
        weather: for_Weather
    }] = list1;

    const [{icon: for_icon}] = for_Weather;

    // Air pollution

    const airPollution = await fetchData(url.airPollution(lat, lon));

    const {list: list2} = airPollution;
    const [{
        main: { aqi },
        components: {pm2_5, so2, no2, o3 }
    }] = list2;  

    const {level, message} = module.aqiText[aqi];

    console.log(level);
    console.log(message);
}

getWeather("caLIfoRNia");

