export const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (unixTime, timezone) => {
    let date = new Date((unixTime + timezone) * 1000);
    let day = weekNames[date.getUTCDay()];
    let month = monthNames[date.getUTCMonth()];

    return `${day} ${date.getUTCDate()}, ${month}`;
}

export const getTime = (unixTime, timezone) => {
    let date = new Date((unixTime + timezone) * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}

