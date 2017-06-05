//Knockout JS
//Creating my locations

var locationList = [
  {
    name: 'Frauenkirche / Church',
    link: '#'
  },
  {
      name: 'Zwinger / Garden',
      link: ''
  },
  {
      name: 'Semperoper / Oper',
      link: ''
  },
  {
      name: 'Gemäldegalerie Alte Meister / Art gallery',
      link: ''
  },
  {
      name: 'Brühlsche Terrasse / Garten',
      link: ''
  },
  {
      name: 'Residenzschloss / Art gallery',
      link: ''
  }
];

//My guidance for live search - http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
//We need to tell knockout about these locations so we can bind them to the view.
var viewModel = {
  locationList: ko.observableArray(locationList),
  //The data-bind attribute tells Knockout that we want to bind the value of this input field to a variable
  //called query, and we want to update that value on keyup.
  //We need to set up query as an observable attribute.
  query: ko.observable(''),

  //Whenever the query attribute is changed, we want to perform our search and update
  //our list of locations, so we subscribe to updates on query and call a search function.
  search: function(value) {
      //remove all the current locations
      viewModel.locationList.removeAll();

      for(var x in locationList){
          if(locationList[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
              console.log("working");
              viewModel.locationList.push(locationList[x]);
          }
      }
  }
};

viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);

//END Knockout JS
// Create a map variable
 var map;

  // TODO: Complete the following function to initialize the map
  function initMap() {

      //style examples taken from Project_Code_5_BeingStylish.html
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
     //Dresden Frauen Kirche
    var myLatLng = {lat: 51.051873, lng: 13.741522};

    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14,
      styles: styles
    });

    var contentString = '<div id="content">'+
           '<div id="siteNotice">'+
           '</div>'+
           '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
           '<div id="bodyContent">'+
           '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
           'sandstone rock formation in the southern part of the '+
           'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
           'south west of the nearest large town, Alice Springs; 450&#160;km '+
           '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
           'features of the Uluru - Kata Tjuta National Park. Uluru is '+
           'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
           'Aboriginal people of the area. It has many springs, waterholes, '+
           'rock caves and ancient paintings. Uluru is listed as a World '+
           'Heritage Site.</p>'+
           '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
           'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
           '(last visited June 22, 2009).</p>'+
           '</div>'+
           '</div>';

       var infowindow = new google.maps.InfoWindow({
         content: contentString
       });

    var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Hello World!'
       });
       marker.addListener('click', function() {
         infowindow.open(map, marker);
       });
       // To add the marker to the map, call setMap();
       marker.setMap(map);
  }
