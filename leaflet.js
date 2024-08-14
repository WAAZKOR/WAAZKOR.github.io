var map = L.map('map').setView([32.253460, -110.911789], 13); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
