/*
    https://api.open-meteo.com/v1/forecast?
    latitude=40.069099&longitude=45.038189&current=temperature_2m,
    is_day,precipitation,windspeed_10m&hourly=temperature_2m,
    relativehumidity_2m,precipitation_probability,windspeed_10m,
    uv_index&daily=weathercode,uv_index_max&timezone=auto

    https://api.open-meteo.com/v1/forecast?
    latitude=52.52&longitude=13.41&current=temperature_2m,
    relativehumidity_2m,is_day,precipitation,weathercode,
    windspeed_10m&hourly=temperature_2m,relativehumidity_2m,
    precipitation_probability,weathercode,windspeed_10m,
    uv_index&daily=weathercode,temperature_2m_max,uv_index_max&timezone=auto
*/

const asd = 0;
const searchElement = document.querySelector('[data-search]')
const searchBox = new google.maps.places.SearchBox(searchElement);
const searchBtn = document.querySelector('[data-search-btn]');
document.querySelector('[data-search-btn]').onclick = function() {
    const place = searchBox.getPlaces()[0];
    if (place == null) return;
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    //reacting with server.js app.post(...)
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body:
            JSON.stringify({
            latitude: latitude,
            longitude: longitude,
        })
    }).then(res => res.json()).then(data => {
        //this code will only be executed when there was any data sent to the browser
        //e.q. when the user searches for a city
        console.log("Data received:", data);
        //setWeatherData(data, place.formatted_address)
        renderWeather(data);
    })
};

function renderWeather({current, daily, hourly}){
    renderCurrWeather(current)
    // renderDailyWeather(daily)
    // renderHourlyWeather(hourly)
}

function setValue(selector, val, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = val;
}

 function setIcon(selector, iconCode, isday, {parent = document} = {}){
    if(isday == 1){
        dayparam = "Day";
    }else{
        dayparam = "Night";
    }
     parent.querySelector(`[data-${selector}]`).setAttribute('src', `/ASSETS/${iconCode}_${dayparam}.png`);
 }

function renderCurrWeather(current){
    setValue("curr-temp", current.curr_temp);
    setValue("is-day", current.isday == 1 ? "Day" : "Night");
    setValue("curr-windspeed", current.wind_speed);
    setValue("curr-humidity", current.rel_hum);
    setValue("curr-rainchance", current.prob);
    setIcon("curr-img", current.icon_code, current.isday)
    //document.querySelector("[data-curr-temp]").textContent = current.curr_temp
}

function renderDailyWeather({daily}){

}

function renderHourlyWeather({hourly}){

}