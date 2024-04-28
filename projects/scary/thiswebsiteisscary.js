var map;
var svgTemplate = '<svg width="84" height="25"><foreignObject width="100%" height="100%"><div>{htmlContent}</div></foreignObject></svg>';

function initializeMap() {
    Microsoft = window.Microsoft;
    map = new Microsoft.Maps.Map('#myMap', { credentials: 'AjEOsUGs0zHaH6XkwgwXs8OTAKihB-IPZSjyb-AgE-HfgdYFAC1I3BH3BxydqmTc' }); // I know this is public, but it's a free account and I don't care (please don't steal it)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locateSuccess);
    }

    var customHtml = '<div style="font-size:12px;border:solid 2px;background-color:lightgreen;padding:2px;">You found me!</div>';

    var pin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        icon: svgTemplate.replace('{htmlContent}', customHtml),
        anchor: new Microsoft.Maps.Point(25, 5)
    });
    map.entities.push(pin);

    var locationButton = document.getElementById("location-button");
    locationButton.addEventListener("click", fetchLocation);
}

function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function locateSuccess(loc) {
    var userLocation = new Microsoft.Maps.Location(loc.coords.latitude, loc.coords.longitude);
    map.setView({ center: userLocation, zoom: 17 });
}

// Time
var localTime = jstz.determine().name();
document.querySelector('.local').innerText = new Date().toLocaleString("en-US", { timeZone: localTime });
document.querySelector('.timezone').innerText = localTime;

increasingDate = new Date().toLocaleString("en-US", { timeZone: localTime });
setInterval(function () {
    increasingDate = new Date(increasingDate);
    increasingDate.setSeconds(increasingDate.getSeconds() + 1);
    document.querySelector('.localinc').innerText = increasingDate.toLocaleString("en-US", { timeZone: localTime });
}, 1000);

// IP address
function myIP() {
    var script = document.createElement('script');
    script.src = 'https://api.ipify.org?format=jsonp&callback=getIP';
    document.body.appendChild(script);
}
var ipAddr = document.getElementById("ipAddr");

function getIP(json) {
    ipAddr.innerHTML = json.ip;
}
myIP();

// Browser info
var browser = document.getElementById("browser");
browser.innerHTML =
    "<h3>Your Browser</h3>" +
    "Cookies enabled: " + navigator.cookieEnabled +
    "<br>Language: " + navigator.language +
    "<br>Platform: " + navigator.platform +
    "<br>App Version: " + navigator.userAgent +
    "<br>Browser Vendor: " + navigator.vendor +
    "<br>Webdriver: " + navigator.webdriver +
    "<br>Do Not Track: " + navigator.doNotTrack +
    "<br>Java enabled: " + navigator.javaEnabled() +
    "<br>WebGL supported: " + ('WebGLRenderingContext' in window) +
    "<br>WebGL2 supported: " + ('WebGL2RenderingContext' in window) +
    "<br>" + navigator.plugins.length + " plugins installed: " + Array.from(navigator.plugins).map(function (plugin) { return plugin.name; }).join(", ");

// Hardware info
var device = document.getElementById("device");
device.innerHTML =
    "<h3>Your Hardware</h3>" +
    "Device Memory: " + navigator.deviceMemory + " GB" +
    "<br>CPU Cores: " + navigator.hardwareConcurrency +
    "<br>Screen Resolution: " + screen.width + " x " + screen.height +
    "<br>Color Depth: " + screen.colorDepth + " bits" +
    "<br>Pixel Depth: " + screen.pixelDepth + " bits" +
    "<br>Max Touch Points: " + navigator.maxTouchPoints + ((navigator.maxTouchPoints == 0) ? " (no touch screen)" : "(touch screen)");

// Other features
var other = document.getElementById("other");
other.innerHTML =
    "<h3>Other Features</h3>" +
    "Online status: " + navigator.onLine +
    "<br>Vibration API supported: " + ('vibrate' in navigator) +
    "<br>Clipboard API supported: " + ('clipboard' in navigator) +
    "<br>Connection type: " + (navigator.connection ? navigator.connection.effectiveType : 'Not available') +
    "<br>Battery level: " + (navigator.getBattery ? navigator.battery.level * 100 + "%" : 'Not available') +
    "<br>Web Share API supported: " + ('share' in navigator) +
    "<br>Web Share Target API supported: " + ('shareTarget' in navigator) +
    "<br>pdfViewerEnabled: " + navigator.pdfViewerEnabled;

// Geolocation
var x = document.getElementById("loc");

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    var userLocation = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
    map.setView({ center: userLocation, zoom: 17 });
}

var locationButton = document.getElementById("location-button");
locationButton.addEventListener("click", fetchLocation);

initializeMap();