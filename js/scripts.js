// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.967529,14.711135],
  zoom: 6.5,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());



// Variables to eventually make a legend
// var PopColors = [
//   ['0', '#f1eef6'],
//   ['250000, '#bdc9e1'],
//   ['500000', '#74a9cf'],
//   [ '1000000','#2b8cbe'],
//   ['2000000', '#06518E'],
// ];
//
// var PopLegend = `<h3>Legend</h3>`;
// jQuery.each(PopColors, function(i, val) {
//   PopLegend += `
//     <div>
//       <div class="legend-color-box" style="background-color:${val[1]};"></div>
//       ${val[0]}
//     </div>
//   `;
// })
//
//
// var UnempColors = [
//   ['0-50000', '#cccccc'],
//   ['50000-100000', '#969696'],
//   ['100000-200000','#525252'],
//   ['200000+', '#252525'],
// ];
//
// var UmempLegend = `<h3>Legend</h3>`;
// jQuery.each(UnempColors, function(i, val) {
//   UmempLegend += `
//     <div>
//       <div class="legend-color-box" style="background-color:${val[1]};"></div>
//       ${val[0]}
//     </div>
//   `;
// })
//
//
// var ImmColors =[
//   ['0-500','#f2f0f7'],
//   ['500-1200', '#cbc9e2'],
//   ['1200-2500','#9e9ac8'],
//   ['2500-4000', '#756bb1'],
//   ['4000+', '#54278f'],
// ];
//
// var ImmLegend = `<h3>Legend</h3>`;
// jQuery.each(ImmColors, function(i, val) {
//   ImmLegend += `
//     <div>
//       <div class="legend-color-box" style="background-color:${val[1]};"></div>
//       ${val[0]}
//     </div>
//   `;
// })


//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('departmentsHN', {
     type: 'geojson',
     data: './Data/departmentsHN.geojson',
   });

 // add a custom-styled layer for each lot
  map.addLayer({
    id: 'lot-fill',
    type: 'fill',
    source: 'departmentsHN',
    paint: {
        'fill-color': '#F7F7F7',
        'fill-opacity': 0.8
        }
    }, 'waterway-label')



        // add an empty data source, which we will use to highlight the lot the user is hovering over
        map.addSource('highlight-feature-depto', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });

        // when the mouse moves, do stuff!
        map.on('mousemove', function (e) {
          // query for the features under the mouse, but only in the lots layer
          var features = map.queryRenderedFeatures(e.point, {
              layers: ['lot-fill'],
          });

          // get the first feature from the array of returned features.
          var lot = features[0]

          if (lot) {  // if there's a lot under the mouse, do stuff
            map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

            // lookup the corresponding description for the each section
            $('#namedepto').text(lot.properties.DEPTO);
            $('#2015pop').text(lot.properties.pop);
            $('#2015migrantestotal').text(lot.properties.migrantes);
            $('#2014unemplyment').text(lot.properties.unemp);

            // set this lot's polygon feature as the data for the highlight source
            map.getSource('highlight-feature-depto').setData(lot.geometry);
          } else {
           map.getCanvas().style.cursor = 'default'; // make the cursor default

            // reset the highlight source to an empty featurecollection
            map.getSource('highlight-feature-depto').setData({
              type: 'FeatureCollection',
              features: []
            });
           }
          })
        });


    var zoomThreshold = 4;





// load the colors on the map
map.on ('load', function() {

    $.getJSON('Data/departmentsHN.geojson', function(data) {
      data.features.map(function(feature) {
        feature.properties.pop = parseInt(feature.properties.pop),
        feature.properties.unemp = parseInt(feature.properties.unemp),
        feature.properties.migrantes = parseInt(feature.properties.migrantes);
      });

      data.features.forEach(function(feature) {
        console.log(feature.properties.pop)
        console.log(feature.properties.unemp)
        console.log(feature.properties.migrantes)
      })



      map.addSource('HNdeptos', {
        'type': 'geojson',
        'data': './Data/departmentsHN.geojson',
      });

      map.addLayer({
        id: 'po',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
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
      map.setLayoutProperty('po', 'visibility', 'none');

      map.addLayer({
        id: 'ue',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'unemp'],
              0, '#f7f6f7',
              50000, '#cccccc',
              100000, '#969696',
              200000, '#525252',
              400000, '#252525'
          ],
        }
      });
      map.setLayoutProperty('ue', 'visibility', 'none');

      map.addLayer({
        id: 'im',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
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
      map.setLayoutProperty('im', 'visibility', 'none');

      $('.Population2015').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'visible');
        map.setLayoutProperty('ue', 'visibility', 'none');
        map.setLayoutProperty('im', 'visibility', 'none');
      });

      $('.Umemployment2014').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'none');
        map.setLayoutProperty('ue', 'visibility', 'visible');
        map.setLayoutProperty('im', 'visibility', 'none');
      });

      $('.Immigrants2015').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'none');
        map.setLayoutProperty('ue', 'visibility', 'none');
        map.setLayoutProperty('im', 'visibility', 'visible');
      });
    });
  });
