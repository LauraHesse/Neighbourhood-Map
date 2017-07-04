
//Knockout JS
var ViewModel = function(){
  var self = this;
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
  };

  // instagram helper function
  function instagram(data, callback) {

      // Specify instagram url components

    var CLIENT ID = "4a8e03dd01274aa9bcfa6438d911ed16";
    var SUPPORT EMAIL = "laura.hesse@t-systems.com";
    var CLIENT STATUS =	"Sandbox Mode";

    }
};
ko.applyBindings(new ViewModel());
