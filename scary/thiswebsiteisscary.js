
 var map;
var svgTemplate = '<svg  width="84" height="25"><foreignObject width="100%" height="100%"><div>{htmlContent}</div></foreignObject></svg>';

function GetMap() {
map = new Microsoft.Maps.Map('#myMap', {credentials: 'AjEOsUGs0zHaH6XkwgwXs8OTAKihB-IPZSjyb-AgE-HfgdYFAC1I3BH3BxydqmTc'});
    // Check if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert('I\'m sorry, but Geolocation is not supported in your current browser!');
    }

var customHtml = '<div style="font-size:12px;border:solid 2px;background-color:lightgreen;padding:2px;">You found me!</div>';

//Create custom Pushpin using an SVG string.
var pin = new Microsoft.Maps.Pushpin(map.getCenter(), {
icon: svgTemplate.replace('{htmlContent}', customHtml),
anchor: new Microsoft.Maps.Point(25, 5)
});

//Add the pushpin to the map.
map.entities.push(pin);
}	
// Successful geolocation
function locateSuccess(loc) {
 // Set the user's location
 var userLocation = new Microsoft.Maps.Location(loc.coords.latitude,loc.coords.longitude);
 // Zoom in on user's location on map
 map.setView({ center: userLocation, zoom: 17 });
}
// Unsuccessful geolocation
function locateFail(geoPositionError) {
switch (geoPositionError.code) {
     case 0: // UNKNOWN_ERROR
         alert('An unknown error occurred, sorry');
         break;
     case 1: // PERMISSION_DENIED
         alert('Permission to use Geolocation was denied');
         break;
     case 2: // POSITION_UNAVAILABLE
         alert('Couldn\'t find you...');
         break;
     case 3: // TIMEOUT
         alert('The Geolocation request took too long and timed out');
         break;
     default:
    }
} 

//time stuff
var localTime = jstz.determine().name();
document.querySelector('.local').innerText = new Date().toLocaleString("en-US", {timeZone: localTime});
document.querySelector('.timezone').innerText = localTime;
console.log(localTime);
console.log(new Date().toLocaleString("en-US", {timeZone: localTime}));
increasingDate = new Date().toLocaleString("en-US", {timeZone: localTime})
setInterval(function(){
increasingDate = new Date(increasingDate);
increasingDate.setSeconds(increasingDate.getSeconds() + 1);
document.querySelector('.localinc').innerText = increasingDate.toLocaleString("en-US", {timeZone: localTime});
}, 1000);

//location
var x = document.getElementById("loc");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    //x.innerHTML = "Geolocation is not supported by this browser.";
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

//using this location show it on the bing map
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    var userLocation = new Microsoft.Maps.Location(position.coords.latitude,position.coords.longitude);
    map.setView({ center: userLocation, zoom: 17 });
    }
showPosition();


