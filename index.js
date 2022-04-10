const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

})


app.post("/",(req,res)=>{

    
const query = req.body.cityName
const appId = process.env.APP_ID
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appId +"&units=metric" 
https.get(url,(responce)=>{

    responce.on("data", (data)=>{

        const weatherData = JSON.parse(data)
        const tempreture = weatherData.main.temp
        const weatherDes = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imgUrl = " http://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<p>The weather condition is currently "+weatherDes+"</p>")
        res.write("<h1>The tempreture in "+query+" is "+ tempreture +" degree celsius</h1>")
        res.write("<img src="+imgUrl+">")


    })

    
})



})


app.listen(3000,()=>{
    console.log("server is runing at 3000");
})



