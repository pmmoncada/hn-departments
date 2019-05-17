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




var zoomThreshold = 4;

// load the colors on the map
map.on ('load', function() {

    $.getJSON('Data/departmentsHN.geojson', function(data) {
      data.features.map(function(feature) {
        feature.properties.pop = parseInt(feature.properties.pop),
        feature.properties.umemp = parseInt(feature.properties.umemp),
        feature.properties.migrantes = parseInt(feature.properties.migrantes);
      });

      data.features.forEach(function(feature) {
        console.log(feature.properties.pop)
        console.log(feature.properties.umemp)
        console.log(feature.properties.migrantes)
      })

      map.addSource('HNdeptos', {
        'type': 'geojson',
        'data': './Data/departmentsHN.geojson',
      });

      $('.Population2015').on('click', function() {
        map.addLayer({
          id: 'po',
          type: 'fill',
          source: 'HNdeptos',
          paint: {
            'fill-opacity': 0.7,
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'pop'],
                0, '#f1eef6',
                250000, '#bdc9e1',
                500000, '#74a9cf',
                1000000, '#2b8cbe',
                2000000, '#2b8cbe'
            ],
          }
        });
      });
      $('.Population2015').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'visible');
      });

      $('.Umemployment2014').on('click', function() {
        map.addLayer({
          id: 'ue',
          type: 'fill',
          source: 'HNdeptos',
          paint: {
            'fill-opacity': 0.7,
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'umemp'],
                0, '#f7f6f7',
                100000, '#cccccc',
                200000, '#969696',
                300000, '#525252',
                400000, '#252525'
            ],
          }
        });
        $('.Umemployment2014').on('click', function() {
          map.setLayoutProperty('im', 'visibility', 'none');
        });
        $('.Immigrants2015').on('click', function() {
          map.addLayer({
            id: 'ue',
            type: 'fill',
            source: 'im',
            paint: {
              'fill-opacity': 0.7,
              'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'migrantes'],
                  0, '#f2f0f7',
                  500, '#cbc9e2',
                  1200, '#9e9ac8',
                  2500, '#756bb1',
                  4000, '#54278f'
              ],
            }
          });
        $('.Umemployment2014').on('click', function() {
          map.setLayoutProperty('ue', 'visibility', 'none');
        });
      });
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
