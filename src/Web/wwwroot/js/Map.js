var map;

document.addEventListener('DOMContentLoaded', function () {
    getMap();
});

 function getMap() {

     // Initialize a map instance
     map = new atlas.Map('myMap', {
         center: [-7.7239623, 33.5760438],
         zoom: 14,
         view: 'Auto',
         style: 'satellite',
         language: 'fr-FR',

         // Add authentication details for connecting to Azure Maps
         authOptions: {
             authType: 'subscriptionKey',
             subscriptionKey: '1JnWsaaLCjfbPcxFGIBPy41hUbFh239olcg7CvvMta7gBegVLi94JQQJ99AKAC5RqLJe0trMAAAgAZMP3DE2'
         }
     });

     // Wait until the map resources are ready
     map.events.add('ready', function () {
         // Add map controls
         map.controls.add(
             [
                 new atlas.control.StyleControl({ mapStyles: ['road', 'grayscale_dark', 'night', 'satellite', 'satellite_road_labels'] }),
                 new atlas.control.FullscreenControl({ style: 'auto' }),
                 new atlas.control.ZoomControl(),
                 new atlas.control.CompassControl(),
                 new atlas.control.PitchControl()
             ],
             { position: 'top-right' }
         );
     });
}

function SearchPlace() {

    var longitude = parseFloat(document.getElementById('longitude').value);
    var latitude = parseFloat(document.getElementById('latitude').value);

    console.log('Longitude : ', longitude);
    console.log('Latitude : ', latitude);

    map.markers.clear();

    var marker = createMarkerForSpecificPlace(longitude, latitude);

    map.markers.add(marker);

    var Id = latitude.toString().replace('.', '_');

    const markerElement = document.querySelector(`#marker-${Id}`);
    if (markerElement) {
        markerElement.addEventListener('click', () => {
            marker.togglePopup();
        });
    }

    //// Use setCamera to move the map
    map.setCamera({
        center: [longitude, latitude],
        zoom: 14,
    });
}

function createMarkerForSpecificPlace(longitude, latitude) {
    let imgsrc = 'https://booksappstoragev2.blob.core.windows.net/books/pin-concrete.svg';

    var Id = latitude.toString().replace('.', '_');

    let htmlContent = `
                    <div class="mover" id="marker-${Id}">
                        <img src="${imgsrc}" style="width:30px"/>
                    </div>
                `;

    let marker = new atlas.HtmlMarker({
        htmlContent: htmlContent,
        position: [longitude, latitude],
        pixelOffset: [0, -15],
        popup: new atlas.Popup({
            content: `
                    <div style="padding:10px; background-color: rgba(255, 255, 128, .5);">
                        <ul>
                            <li><strong>longitude:</strong> ${longitude}</li>
                            <li><strong>latitude:</strong> ${latitude}</li>
                        </ul>
                    </div>
                        `,
            pixelOffset: [0, -30]
        })
    });

    return marker;
}

