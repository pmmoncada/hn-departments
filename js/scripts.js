// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-86.401978,14.716448],
  zoom: 6.3,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());




// var zoomThreshold = 4;
//
map.on('load', function() {

    $.getJSON('Data/departmentsHN.geojson', function(data) {
      data.features.map(function(feature) {
        feature.properties.pop = parseInt(feature.properties.pop);
      });

      data.features.forEach(function(feature) {
        console.log(feature.properties.pop)
      })


      map.addSource('HNdeptos', {
          'type': 'geojson',
          'data': './Data/departmentsHN.geojson',
      });

      map.addLayer({
        id: 'HNdeptos',
        type: 'fill',
        source: 'Hndeptos',
        paint: {
          'fill-opacity': 0.7,
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'pop'],
              0, '#f1eef6',
              70000, '#bdc9e1',
              100000, '#74a9cf',
              250000, '#2b8cbe',
              2000000, '#2b8cbe'
          ],
        }
      });
    });
    });


    //   // Create a popup, but don't add it to the map yet.
    //   var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false
    //   });
    //
    //   map.on('mouseenter', 'HNdeptos', function(e) {
    //     // Change the cursor style as a UI indicator.
    //     map.getCanvas().style.cursor = 'pointer';
    //
    //     var feature = e.features[0]
    //
    //     // Populate the popup and set its coordinates
    //     // based on the feature found.
    //     popup.setLngLat(e.lngLat)
    //       .setHTML(`
    //         <h4>${feature.properties.DEPTO}</h4><br/>
    //         <p>Population: ${numeral(feature.properties.2015pop).format('0.0a')}</p>
    //       `)
    //       .addTo(map);
    //   });
    //
    //   map.on('mouseleave', 'HNdeptos', function() {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    //   });
    // });
// // use jquery to programmatically create a Legend
// // for numbers 1 - 11, get the land use color and description
// for (var i=1; i<18; i++) {
//   // lookup the location info for the current iteration
//   const locationInfo = DeptLookup(i);
