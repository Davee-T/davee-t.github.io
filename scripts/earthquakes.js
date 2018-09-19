$("ready", function() {
    // initialize the map
  var map = L.map('map').setView([42.35, -71.08], 4);

  // load a tile layer
  // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
  // 	maxZoom: 18,
  // 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  // 		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  // 		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  // 	id: 'mapbox.streets'
  // }).addTo(map);

  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  	type: 'map',
  	ext: 'jpg',
  	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: '1234'
  }).addTo(map);

  // load GeoJSON from web/external file
  function addDataToMap(data, map){
  	var dataLayer = L.geoJson(data, {
  		onEachFeature: function(feature, layer){
  			var popupText = "Magnitude: " + feature.properties.mag
  			+ "<br>Location: " + feature.properties.place
  			+ "<br><a href='" + feature.properties.url + "'>More info</a>";
  		layer.bindPopup(popupText);}
  	});
  dataLayer.addTo(map);
  }

  $.getJSON("data/USGS_earthquakes_10102015.geojson", function(data) {addDataToMap(data, map);
  });

  var mapmargin = 50;
  $('#map').css("height", ($(window).height() - mapmargin));
  $(window).on("resize", resize);
  resize();
  function resize(){

      if($(window).width()>=980){
          $('#map').css("height", ($(window).height() - mapmargin));
          $('#map').css("margin-top",50);
      }else{
          $('#map').css("height", ($(window).height() - (mapmargin+12)));
          $('#map').css("margin-top",-21);
      }

  }
});
