var map = L.map('map').setView([51.505, -0.09], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>   
 contributors'
}).addTo(map);

function   
 drawLine() {
  var lat = parseFloat(document.getElementById('latitude').value);
  var lng = parseFloat(document.getElementById('longitude').value);
  var   
 bearing = parseFloat(document.getElementById('bearing').value);

  if (isNaN(lat) || isNaN(lng) || isNaN(bearing)) {
    alert("Please enter valid coordinates and bearing.");
    return;
  }

  var startPoint = L.latLng(lat, lng);
  var endPoint = startPoint.destinationPoint(10000, bearing);

  L.polyline([startPoint, endPoint], { color: 'red' }).addTo(map);
}
