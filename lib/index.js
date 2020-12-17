// TODO: Write your JS code in here
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=c14e0ddc6dc7c0d0705ba826b2e36d58
//stackoverflow.com/questions/8847109/formatting-the-date-time-with-javascript
// start date stuff
// end date stuff textbox
// let userCity = "Paris";
const textbox = document.querySelector("#textbox");
const city = document.querySelector("#city");
const theDate = document.querySelector("#date");
const conditions = document.querySelector("#conditions");
const temp = document.querySelector("#temp");

const kelvinToCels = kelvin => kelvin - 273.15;

const timeCalc = (utcSec) => {
    const dt = new Date();
    const change = utcSec + dt.getTimezoneOffset() * 60;
    const newDate = new Date(dt.setUTCSeconds(change));
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric' };
    return newDate.toLocaleString('en-US', options);
    // console.log(dt.setSeconds(dt.getSeconds() + utcSec));
    // dt.setSeconds(dt.getSeconds() + utcSec);
    // console.log(dt.toLocaleString('en-US', options));
    // return dt.toUTCString();
};
// define the fetch function below
const form = document.querySelector('#search-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userCity = document.querySelector('#search-input');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=c14e0ddc6dc7c0d0705ba826b2e36d58`;

    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            const long = data.coord.lon;
            const lat = data.coord.lat;
            // console.log(Date().toLocaleString());
            // console.log(data.timezone); // time
            const weatherX = data.weather[0].description; // conditions
            const weatherIc = data.weather[0].icon;
            const tempC = Math.round(kelvinToCels(data.main.temp)); //
            // console.log(timeCalc(data.timezone));
            const date = timeCalc(data.timezone);
            // console.log(formatDate(timeCalc(data.timezone)));

            const htmlInject = `<h1 id="city" class="font">Weather in ${userCity.value}</h1><h3 id="date" class="font">${date}</h3><p id="conditions" class="font">${weatherX}</p><p id="temp" class="font"><img src="http://openweathermap.org/img/wn/${weatherIc}@2x.png"> ${tempC}C</p>`;
            textbox.innerHTML = '';
            textbox.insertAdjacentHTML("beforeend", htmlInject);
        });

});









let dt = new Date();
const formatDate = (date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    const d = date;
    const year = d.getFullYear(); // 2019
    const date3 = d.getDate(); // 23
    const hours = d.getHours();
    //month bit
    const monthName = months[d.getMonth()];
    // day bit
    const dayName = days[d.getDay()]; // Thu
    const formatted = `${dayName} ${hours}:00 hrs, ${date3} ${monthName} ${year}`;
    return formatted // Thu, 23 January 2019
};