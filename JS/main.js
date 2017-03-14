//This is JS file
//Create a map variable
var map;

// Create a new blank array for all the listing markers.
var markers = [];
//Create an array of Objects to be used, minimum of 5.
var bostonLocations = [
  {title: 'Emmanuel College', location: {lat:42.341625, lng:-71.102528}},
  {title: 'House of Blues', location: {lat:42.347328, lng:-71.095471}},
  {title: 'Fenway Park', location: {lat:42.346497, lng:-71.097184}},
  {title: 'Boston University', location: {lat:42.350164, lng:-71.104722}},
  {title: 'Northeastern University', location: {lat:42.340068, lng:-71.088966}}
];
//function to initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //Fenway Park Boston MA 42.3466764,-71.0994065,
    center: {lat: 42.3466764, lng: -71.0994065},
    //set zoom strength 1-21
    zoom: 15
  });

//keep the markers within view upon opening.
var largeInfoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();
//loop through to give all information for markers
for (var i = 0; i < bostonLocations.length; i++){
  var position = bostonLocations[i].location;
  var title = bostonLocations[i].title;
  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i,

  });
  //display all current locations into the sidebar nav.
  $("#mySidenav").append('<li><a>' + bostonLocations[i].title + "</a></li>");
  $("#mySidenav li a").on('click', populateInfoWindow);



  markers.push(marker);
  bounds.extend(marker.position);
  marker.addListener('click', function(){
    populateInfoWindow(this, largeInfoWindow);


  });

};
  map.fitBounds(bounds);
//infowindow open and set title to infowindow
function populateInfoWindow(marker, infowindow){
  if(infowindow.marker != marker){
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map,marker);

    infowindow.addListener('closeclick', function(){
      infowindow.setMarker(null);
    });
  }
}

};

//Sidebar navigation JS
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
