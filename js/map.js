import { reAuthorize } from '/../api/strava_api.js'

reAuthorize(1).then(res => {
    //Set track amount above the map
    document.querySelector('#track-amount').textContent = res.length - 1;

    var map = L.map('map').setView([51.7592, 19.4560], 13);

    //initialize map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    //add markers and polylines in cerain colors
    res.forEach((element, index) => {
        //choose color for this one
        var color = colors[index % colors.length];

        var polyline = L.Polyline.fromEncoded(element.map.summary_polyline, {color: color});
        polyline.addTo(map);
    });
});


