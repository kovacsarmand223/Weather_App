const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
  // Your POST request handling logic goes here
});

// Define a route for the root path ('/')
app.get('/', (request, response) =>{
    response.sendFile("E:/Progs/Webdesign/Weather_App_Project/public/mainPage.html")
})

app.listen(3000, () => {
  console.log("Server Started");
});