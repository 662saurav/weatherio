'use strict';

export const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDate = (unixTime, timezone) => {
    let date = new Date((unixTime + timezone) * 1000);
    let day = weekNames[date.getUTCDay()];
    let month = monthNames[date.getUTCMonth()];

    return `${day} ${date.getDate()}, ${month}`;
}

export const getTime = (unixTime, timezone) => {
    let date = new Date((unixTime + timezone) * 1000);
    let hours = date.getUTCHours();
    let minutes = (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes();
    let meridian = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12}:${minutes} ${meridian}`;
}

export const kmph = (speed) => (speed * 18) / 5;

export const capital = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
export const aqiText = {
    1: {
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little or no risk",
        color: "#89E589"
    },

    2: {
        level: "Fair",
        message: "Air quality is acceptable, however for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        color: "cyan"
    },

    3: {
        level: "Moderate",
        message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        color: "#E5DD89"
    },

    4: {
        level: "Poor",
        message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
        color: "#f76767"
    },

    5: {
        level: "Very Poor",
        message: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        color: "#E589B7"
    }
}


