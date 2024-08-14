var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function drawLine() {
  var lat = parseFloat(document.getElementById("latitude").value);
  var lng = parseFloat(document.getElementById("longitude").value);
  var bearing = parseFloat(document.getElementById("bearing").value);

  if (isNaN(lat) || isNaN(lng) || isNaN(bearing)) {
    alert("Please enter valid coordinates and bearing.");
    return;
  }

  var startPoint = L.latLng(lat, lng);
  var endPoint = calculateDestinationPoint(startPoint, 10000, bearing); // 10 km for example

  L.polyline([startPoint, endPoint], { color: "red" }).addTo(map);
}

// Function to calculate the destination point
function calculateDestinationPoint(startPoint, distance, bearing) {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = startPoint.lat * Math.PI / 180; // φ, λ in radians
  const λ1 = startPoint.lng * Math.PI / 180;
  const θ = bearing * Math.PI / 180;

  const δ = distance / R; // angular distance in radians

  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) +
              Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
  const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
                  Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));

  return L.latLng(φ2 * 180 / Math.PI, λ2 * 180 / Math.PI); // convert back to degrees
}
