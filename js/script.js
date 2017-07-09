
//Knockout JS
var ViewModel = function(){
  var self = this;
  //self.query are observables - which are functions - you need to call them without any arguments to get their values.
  self.query = ko.observable('');


  self.searchResults = ko.computed(function() {
      var q = self.query();
      return locationInfo.filter(function(i) {
        return i.name.toLowerCase().indexOf(q) >= 0;
      });
  });

  //Here is where I connect the list to the markers.
  //It basically triggers all of the click events on the marker
  self.listClicker = function(locationInfo){
    google.maps.event.trigger(locationInfo.marker, 'click');
    $('.side-nav').animate({width:'toggle'},350);
  };

};

ko.applyBindings(new ViewModel());
