/*
    https://api.open-meteo.com/v1/forecast?
    latitude=40.069099&longitude=45.038189&current=temperature_2m,
    is_day,precipitation,windspeed_10m&hourly=temperature_2m,
    relativehumidity_2m,precipitation_probability,windspeed_10m,
    uv_index&daily=weathercode,uv_index_max&timezone=auto
*/
const express = require('express');
const axios = require('axios');
const app = express();


axios.get('http://localhost:3000/weather', { timeout: 10000 })
app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${req.body.latitude}&longitude=${req.body.longitude}&current=temperature_2m,relativehumidity_2m,is_day,precipitation,weathercode,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max,uv_index_max&timezone=auto`;
  axios({
    url: url,
    responseType: 'json'
  }).then(({ data }) => {
    const response = {
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      hourly: parseHourlyWeather(data)
    };
    
    res.json(response); // Send the JSON response to the webpage.
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  });
});

function parseCurrentWeather({current}){
  const {is_day: isday, temperature_2m: curr_temp, windspeed_10m: wind_speed, weathercode: icon_code, relativehumidity_2m: rel_hum, precipitation: prob} = current
  return {
    isday,
    curr_temp,
    prob,
    icon_code,
    wind_speed,
    rel_hum
  }
}

function parseDailyWeather({daily}){
  return daily.time.map((time, index) => {
    return {
      timestamp: time,
      icon_code: daily.weathercode[index],
      temp_2m_max: daily.temperature_2m_max[index],
      uv_idx: daily.uv_index_max[index]
    }
  })
}

//current needed because the time has to be calculated from now
function parseHourlyWeather({hourly, current}){
  return hourly.time.map((time, index) => {
    return {
      timestamp: time,
      icon_code: hourly.weathercode[index],
      temp_max: hourly.temperature_2m[index],
      wind_speed: hourly.windspeed_10m[index],
      rel_hum: hourly.relativehumidity_2m[index],
      prob: hourly.precipitation_probability[index],
      uv_idx: hourly.uv_index[index]
    }
  }).filter(({timestamp}) => timestamp >= current.time)
}

// Define a route for the root path ('/')
app.get('/weather', (request, response) =>{
    response.sendFile("E:/Progs/Webdesign/Weather_App_Project/public/mainPage.html")
})

app.listen(3000, () => {
  console.log("Server Started");
});