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
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () =>{
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
        console.log(data)
        //setWeatherData(data, place.formatted_address)
    })
})

function renderWeather(){
    
}

function setWeatherData(data, place){

}
