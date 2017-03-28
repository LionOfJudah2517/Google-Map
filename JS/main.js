'use strict;'

//********* GLOBAL VARIABLES *************
var map;
var markers;
var twitter;


/*
*********** MODEL TO STORE INFORMATION **********

*/
var bostonLocations = [{
        name: 'Emmanuel College',
        lat: 42.341625,
        lng: -71.102528
    },
    {
        name: 'House of Blues',
        lat: 42.347328,
        lng: -71.095471
    },
    {
        name: 'Fenway Park',
        lat: 42.346497,
        lng: -71.097184
    },
    {
        name: 'Boston University',
        lat: 42.350164,
        lng: -71.104722
    },
    {
        name: 'Northeastern University',
        lat: 42.340068,
        lng: -71.088966
    }
];

/*
************ OBJECT GENERATOR ***********

*/

var LocationGenerator = function(map, locData) {
    var self = this;

    this.map = map;
    this.name = locData.name;
    this.location = location;
    this.lat = locData.lat;
    this.lng = locData.lng;
    this.visible = ko.observable(true);

    //FOURSQUARE API CLIENT INFORMATION
    var clientID = 'MNULAPVKHSXV4G3UB3GZKJ2Z4F55JUOAXW0N5TR4SLJY0TSH';
    var clientSecret = 'PGFSG12KQNWEG3G21J2BFJRVGDR5OMFXZTB2G2VPO5I0WEGD';

    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + locData.lat + ',' + locData.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20161016' + '&query=' + this.name;



    //****** GET JSON REQUEST FOR FOURSQUARE SOCIAL MEDIA
    this.twitter;
    $.getJSON(foursquareURL).done(function(cat) {
        //********CONTENT THAT IS GOING TO FILL INFOWINDOW BOX.
        self.twitter = cat.response.venues[0].contact.twitter;
        self.contentString = `<h2>${self.name}</h3><h4>${self.lat}, ${self.lng}</h4><p>Twitter: ${self.twitter}</p>`;
        self.infowindow = new google.maps.InfoWindow({
            content: self.contentString
        });
    }).fail(function() {
        alert("There was an error loading Foursquare information. Please refresh or try again later.")
    });


    //******** CREATE MARKERS WITH ESSENTIAL DATA FOR DISPLAY
    this.marker = new google.maps.Marker({
        map: self.map,
        position: new google.maps.LatLng(locData.lat, locData.lng),
        name: locData.name,
        animation: google.maps.Animation.DROP
    });


    //******** KNOCKOUT FUNCTIONALITY FOR MARKERS
    this.showMarker = ko.computed(function() {
        if (this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    //******** CLICK ANIMATIONS FOR MARKERS********
    this.marker.addListener('click', function() {
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null)
        }, 1000);

        self.infowindow.open(this.map, this);
    });

    this.clickMarker = function() {
        google.maps.event.trigger(this.marker, 'click')
    };

};


//************  VIEW MODEL   *****************


var MyAppView = function() {
    var self = this;
    this.bosLocationList = this.ko.observableArray([]);

    this.bostonSearch = ko.observable('');

    this.map = new google.maps.Map(document.getElementById('map'), {
        //Fenway Park Boston MA 42.3466764,-71.0994065,
        center: {
            lat: 42.3466764,
            lng: -71.0994065
        },
        //set zoom strength 1-21
        zoom: 13



    });

    bostonLocations.forEach(function(bostonLocation) {
        self.bosLocationList.push(new LocationGenerator(self.map, bostonLocation));
    });

    //******** FILTER SEARCH ***********

    this.bostonFilter = ko.computed(function() {
        var filtered = self.bostonSearch().toString().toLowerCase();
        if (!filtered) {
            self.bosLocationList().forEach(function(bostonLoc) {
                bostonLoc.visible(true);
            });
            return self.bosLocationList();
        } else {
            return ko.utils.arrayFilter(self.bosLocationList(), function(bostonLoc) {
                var string = bostonLoc.name.toLowerCase();
                var result = (string.search(filtered) >= 0);
                bostonLoc.visible(result);
                return result;
            });
        }
    }, self);

};


/*

**********INITIALIZE THE GOOGLE MAP*************

*/
var myMap;
var initMap = function() {
    myMap = MyAppView;
    ko.applyBindings(myMap);
};



/*

***********SIDE-BAR FUNCTIONALITY***************

*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};

//********* ERROR HANDLE ***********
function errorAlert() {
    alert("This page is not loading correctly, please try again.");
}
