console.log('The App is working');
const website = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=5bbf935b95e71718d573c62f8f384760&units=metric";
// const website="https://api.openweathermap.org/data/2.5/weather?q=";
// const key="&appid=7bce8b7a1d5d076a18f60d2b2cb237ef&units=metric";
const find = document.getElementById("find");
var weatherobj;
find.addEventListener('click', getweather);
function getweather() {
  let input = document.getElementById("input").value;
  let str = website + input + key;
  let weather = new XMLHttpRequest();
  weather.open("GET", str);
  weather.send();
  weather.onload = function () {
    weatherobj = JSON.parse(weather.responseText);
    document.getElementById("city").innerHTML = "CITY :" + input;
    document.getElementById("temp").innerHTML = "Temperature : " + weatherobj.main.temp + " °C";
    document.getElementById("description").innerHTML = weatherobj.weather.description;
    document.getElementById("visibility").innerHTML = "Visibilty is : " + weatherobj.visibility;
    document.getElementById("humidity").innerHTML = "Humidity is : " + weatherobj.main.humidity;
    document.getElementById('pressure').innerHTML="Pressure is : "+weatherobj.main.pressure;
    document.getElementById("wind-speed").innerHTML = "Wind Speed : " + weatherobj.wind.speed;
    document.getElementById("hi-low").innerHTML = "Minimum temperature : " + weatherobj.main.temp_min + " °C <br>Maximum Temperature : " + weatherobj.main.temp_max + " °C";
    startTime();
    var sunrise=weatherobj.sys.sunrise;
    var sunset=weatherobj.sys.sunset;
    sunrise=sunrise*1000;
    sunset=sunset*1000;
    getsunrise(sunrise);
    getsunset(sunset);
     setBg(weatherobj);
  }

}
function setBg(weatherObj) {
  var back = document.getElementById("image");
  // get.display='none';
  // let back=document.getElementById('get');
  console.log("We are inside the background function");
  if (weatherObj.main.humidity >= 90 || weatherObj.weather[0].main == "Rain") {
    back.style.backgroundImage = "url('rain.webp')";
    
  }
  else if (weatherObj.main.temp <= 10 || weatherObj.weather[0].main == "Snow") {
    back.style.backgroundImage = "url('snow.webp')";
  }
  else if(weatherObj.main.temp>=10 && weatherObj.main.temp<=20){
    back.style.backgroundImage="url('winter.gif')";
  }
  else if (weatherObj.weather[0].main == "Clouds") {
    back.style.backgroundImage = "url('cloudy.webp')";
  }
  else if (weatherObj.main.temp >= 30) {
    back.style.backgroundImage = "url('sunny.webp')";
  }
}

const current = document.getElementById("current");

const web = "https://api.openweathermap.org/data/2.5/weather?lat=";
const site = "&lon=";
// const next = "&appid=5bbf935b95e71718d573c62f8f384760&units=metric";
var weatherobj;
current.addEventListener('click', getposition);
var x = document.getElementById("demo");
function getposition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  let str = web + position.coords.latitude + site + position.coords.longitude + key;
  input.value="";
  let weath = new XMLHttpRequest();
  weath.open("GET", str);
  weath.send();
  weath.onload = function () {
    weatherobj = JSON.parse(weath.responseText);
    if (weath.responseText)
      console.log("IT's working");
    document.getElementById("description").innerHTML = weatherobj.weather.description;
    document.getElementById("temp").innerHTML = "Temperature : " + weatherobj.main.temp + " °C";
    document.getElementById("visibility").innerHTML = "Visibilty is : " + weatherobj.visibility;
    document.getElementById("humidity").innerHTML = "Humidity is : " + weatherobj.main.humidity;
    document.getElementById("wind-speed").innerHTML = "Wind Speed : " + weatherobj.wind.speed;
    document.getElementById("hi-low").innerHTML = "Minimum temperature : " + weatherobj.main.temp_min + " °C <br>Maximum Temperature : " + weatherobj.main.temp_max + " °C";
    document.getElementById('pressure').innerHTML=`Pressure is : ${weatherobj.main.pressure}`;
    startTime();
    var sunrise=weatherobj.sys.sunrise;
    var sunset=weatherobj.sys.sunset;
    sunrise=sunrise*1000;
    sunset=sunset*1000;
    getsunrise(sunrise);
    getsunset(sunset);
    

    setBg(weatherobj);
  }
}
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML ="Time :"+ h + ":" + m + ":" + s;
  console.log("we are her");
  var t = setTimeout(function(){ startTime() }, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function getsunrise(sunrise){
  console.log("We are inside sunrise");
  var today = new Date(sunrise);
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  document.getElementById("sunrise").innerHTML ="Sunrise :"+ h + ":" + m + ":" + s;
}
function getsunset(sunset){
  var today = new Date(sunset);
  console.log('inside sunset');
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  document.getElementById("sunset").innerHTML ="Sunset :"+ h + ":" + m + ":" + s;
}

