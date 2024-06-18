'use strict';

import { fetchData, url } from './api.js';
import { weekNames, monthNames, getDate, getTime, capital, aqiText, kmph } from './module.js';

let input = document.querySelector("input");
let smSearch = document.getElementById("smSearch");
let btn = document.getElementById("btn");
let curr_location = document.getElementById("curr_location");
let degree = document.querySelector(".card-text-1 h1");
let ico = document.querySelector(".card-text-1 img");
let desc = document.querySelectorAll(".card-text-1 p")[1];
let date = document.getElementById("date");
let place = document.getElementById("place");
let rise = document.getElementById("sunrise");
let set = document.getElementById("sunset");
let humid = document.getElementById("humidity");
let press = document.getElementById("pressure");
let visible = document.getElementById("visibility");
let feels = document.getElementById("feels_like");
let pm = document.querySelectorAll(".aqi-content h3")[0];
let so = document.querySelectorAll(".aqi-content h3")[1];
let no = document.querySelectorAll(".aqi-content h3")[2];
let ozone = document.querySelectorAll(".aqi-content h3")[3];
let remark = document.querySelector(".remark");

async function getWeather(query) {
    // Geographical latitude and longitude
    const geoCoding = await fetchData(url.geoCoding(query));
    const [{ lat, lon }] = geoCoding;
    console.log(lat);
    console.log(lon);

    const [currentWeather, forecast, airPollution] = await Promise.all([
        fetchData(url.currentWeather(lat, lon)),
        fetchData(url.forecast(lat, lon)),
        fetchData(url.airPollution(lat, lon))
    ]);

    // Current weather
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
    date.innerHTML = getDate(dt, timezone);
    place.innerHTML = `${capital(query)}, ${country}`;
    rise.innerHTML = `${getTime(sunrise, timezone)}`;
    set.innerHTML = `${getTime(sunset, timezone)}`;
    humid.innerHTML = `${humidity} <span class="fs-5">%</span>`;
    press.innerHTML = `${pressure} <span class="fs-5">hPa</span>`;
    visible.innerHTML = `${Math.round(visibility / 1000)} <span class="fs-5">km</span>`;
    feels.innerHTML = `${Math.round(feels_like)}<sup class="fs-6"> °C</sup>`;

    // 5 day weather forecast
    const {
        list: for_list,
        city: { timezone: for_timezone }
    } = forecast;

    for (let i = 0; i < 8; i++) {
        const {
            dt: for_dt,
            main: { temp: for_temp },
            weather: for_Weather,
            wind, dt_txt
        } = for_list[i];

        const [{ icon: for_icon }] = for_Weather;
        const { speed, deg } = wind;

        let card1 = document.querySelectorAll(".line1 .card")[i];

        card1.querySelectorAll("p")[0].innerHTML = `${getTime(for_dt, for_timezone)}`;
        card1.querySelector("img").src = `/src/images/weather_icons/${for_icon}.png`;
        card1.querySelectorAll("p")[1].innerHTML = `${Math.round(for_temp)}°C`;

        let card2 = document.querySelectorAll(".line2 .card")[i];
        card2.querySelectorAll("p")[0].innerHTML = `${getTime(for_dt, for_timezone)}`;
        card2.querySelector("img").style.transform = `rotate(${deg}deg)`;
        card2.querySelectorAll("p")[1].innerHTML = `${Math.round(kmph(speed))} km/h`;

    }

    for (let i = 0, j = 7; i < 5; i++, j += 8) {
        const {
            weather: for_Weather,
            dt,
            dt_txt
        } = for_list[j];
        const [{ icon: for_icon }] = for_Weather;

        let fiveDay = document.querySelectorAll("#left-card2 li")[i];

        let date = new Date(dt_txt);

        fiveDay.querySelector("img").src = `/src/images/weather_icons/${for_icon}.png`;
        fiveDay.querySelectorAll("p")[0].innerHTML = `${date.getDate()} ${monthNames[date.getUTCMonth()]}`;
        fiveDay.querySelectorAll("p")[1].innerHTML = `${weekNames[date.getUTCDay()]}`;
    }

    // Air pollution

    const { list: list2 } = airPollution;
    const [{
        main: { aqi },
        components: { pm2_5, so2, no2, o3 }
    }] = list2;

    const { level, message, color } = aqiText[aqi];

    pm.innerHTML = `${pm2_5}`;
    so.innerHTML = `${so2}`;
    no.innerHTML = `${no2}`;
    ozone.innerHTML = `${o3.toFixed(1)}`;
    remark.innerHTML = `${level}`;
    remark.title = `${message}`;
    remark.style.background = `${color}`;
}



input.addEventListener("keypress", function (e) {
    if (e.key == 'Enter') {
        getWeather(input.value);
    }
});


btn.addEventListener("click", function (e) {
    input.classList.remove("d-none");
    getWeather(input.value);
});

window.navigator.geolocation.getCurrentPosition(res => {
    let { latitude, longitude } = res.coords;

    let mylocation = async () => {
        const geoReverse = await fetchData(url.geoReverse(latitude, longitude));
        const [{ name }] = geoReverse;
        getWeather(name);
    }

    ["click", "touchstart"].forEach((event) => {
        curr_location.addEventListener(event, mylocation);
     });
});
