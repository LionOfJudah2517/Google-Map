//This is JS file
//Create a map variable
var map;
//function to initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //Fenway Park Boston MA 42.3466764,-71.0994065,
    center: {lat: 42.3466764, lng: -71.0994065},
    //set zoom strength 1-21
    zoom: 15
  });
  var emmanuel = {lat:42.341625, lng:-71.102528};
  var marker = new google.maps.Marker({
    position: emmanuel,
    map: map,
    title: 'Emmanuel College!'
  });

}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
