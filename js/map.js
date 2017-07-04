var map;

//This is the model
//This array of objects holds the location info
var locationInfo = [
  {
      name: 'Frauenkirche / Church',
      latlong: {lat: 51.051873, lng: 13.741522},
      address: 'The Frauenkirche Dresden looks back on a history of over 1000 years. It ist a history full of changes, of great splendour and utter destruction. The first Frauenkirche was built in the 11th century as small Romanic missionary church.',
      icon: 'images/bell.png'
  },
  {
      name: 'Zwinger / Garden',
      latlong: {lat: 51.053002, lng: 13.733757},
      address: 'The Zwinger is a palace in the eastern German city of Dresden, built in Baroque style and designed by court architect Matthäus Daniel Pöppelmann. It served as the orangery, exhibition gallery and festival arena of the Dresden Court.',
      icon: 'images/tree.png'
  },
  {
      name: 'Semperoper / Oper',
      latlong: {lat: 51.054486, lng: 13.735276},
      address: 'The magnificent Semperoper dominates the Theaterplatz on the river Elbe, forming the centrepiece of the historic old city. ',
      icon: 'images/tenor.png'
  },
  {
      name: 'Gemäldegalerie Alte Meister / Art gallery',
      latlong: {lat: 51.053388, lng: 13.734707},
      address: '(Old Masters Picture Gallery) With master works including Raphael’s "Sistine Madonna", Giorgione’s "Sleeping Venus", Correggio’s "Holy Night", Cranach’s "St. Catherine Altar", Vermeer’s "Girl Reading a Letter at an Open Window" and Bellotto’s views of Dresden, the Gemäldegalerie Alte Meister enjoys a reputation that is international in scope. ',
      icon: 'images/palette.png'
  },
  {
      name: 'Brühlsche Terrasse / Garten',
      latlong: {lat: 51.053241, lng: 13.743673},
      address: 'Dresden Fortress, around  1170  Dresden is supposed to have been founded as a royal  residence town, protected by a solid fortress at t he  ford on the left Elbe River bank. ',
      icon: 'images/tree.png'
  },
  {
      name: 'Residenzschloss / Art gallery',
      latlong: {lat: 51.052498, lng: 13.736660},
      address: 'Dresden Castle or Royal Palace is one of the oldest buildings in Dresden, Germany',
      icon: 'images/palette.png'
  }
];

//this function initializes the map
function initMap() {

    var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#8cb30c' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#e19295' },
          { weight: 16 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#ffffff' }
        ]
    },
    {
        featureType: 'transit.station',
        stylers: [
          { weight: 15 },
          { hue: '#e19295' }
        ]
    }
    ];
    // This constructor creates the new map at the chosen location
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      styles: styles,
      mapTypeControl: false
    });
    //The creates the info window
    var infowindow = new google.maps.InfoWindow({
    });
    //This creates the lat long boundries
    var bounds = new google.maps.LatLngBounds();
    //This for loop is used to create new marker properties and push them into each object in the locationInfo array, making them properties of all of the location objects
    for( i = 0; i<locationInfo.length; i++){
      //Creates each marker as a property of an object in the locationInfo array
      locationInfo[i].marker = new google.maps.Marker({
      position: locationInfo[i].latlong,
      map: map,
      title: locationInfo[i].name,
      address: locationInfo[i].address,
      icon: locationInfo[i].icon,
      animation: google.maps.Animation.DROP
    });
    //This adds a click event to the marker properties that causes the infoWindow to open upon clicking. It doesn't contain the content yet though.
    locationInfo[i].marker.addListener('click', function(){
      //Now we are calling the populateInfoWindow function that we set up later
      populateInfoWindow(this, infowindow);
    });
    //This adds the click event that calls the function in control of the animation of the marker
    locationInfo[i].marker.addListener('click', function(){
      toggleBounce(this);
    });
    bounds.extend(locationInfo[i].marker.position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
    //center the map to the geometric center of all markers.
    map.setCenter(bounds.getCenter());
}

//This function makes sure that the infowindow appears and sets the content to the correct information, it also clears the window content if the info window is closed
function populateInfoWindow(marker, infowindow) {
  // This just makes sure the window is not already open
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    //This sets the content ofthe info window
    infowindow.setContent('<h3>' + marker.title + '</h3>' + '<h4>History</h4>' + '<div>' + marker.address + '</div>' + '<div>' + marker.phone + '</div>' + '<img id ="logo" src = "yelpLogo.jpg">');
    infowindow.open(map, marker);
    // Make sure the infoWindow is cleared if the close button is clicked
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      //Makes sure the animation of the marker is stopped if the infoWindow close button is clicked
      marker.setAnimation(null);
    });
  }
}

function toggleBounce(myMarker) {
    myMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        myMarker.setAnimation(null);
    }, 2500);
}


function googleError() {
    alert('Google Maps Error');
}
