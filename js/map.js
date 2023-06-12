import { reAuthorize } from '/../api/strava_api.js'

reAuthorize(1).then(res => {
    //Set track amount above the map
    const swimAmount = res.filter(element => element.type == "Swim").length;
    document.querySelector('#track-amount').textContent = res.length - swimAmount;

    var map = L.map('map').setView([51.7592, 19.4560], 13);

    //initialize map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var colors = ['#ff0000', '#00ff00', '#0000ff','#ccff66', '#5200cc', '#00ffff', '#b5176d', '#2583ba', '#f7785e', '#f791c5', '#23e06f', '#963634'];
    
    //add markers and polylines in cerain colors
    res.forEach((element, index) => {
        if(element.start_latlng.length != 0){

            var marker = L.marker(element.start_latlng).addTo(map);
            var color = colors[index % colors.length];
            let dayName = element.name;
            if(element.name == "Dzień 2") {
                dayName = "Dzień 1 i 2";
            }

            marker.bindPopup(
                `<span style='color:${color}; font-weight:bold;'>` + dayName + "</span><br>" 
                + "Dyscyplina: " + element.type + "<br>" 
                + "Dystans: " + (element.distance/1000).toFixed(1) + "KM<br>" 
                + "Czas: " + secondsToTime(element.moving_time)
                );
            //choose color for this one

            var polyline = L.Polyline.fromEncoded(element.map.summary_polyline, {color: color});
            polyline.addTo(map);
        }
        
    });
});

function secondsToTime(secs) {
    if(secs < 0) secs *= -1;
    function pad(n) { return n<10 ? '0'+n : n }
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs % 3600) / 60);
    var seconds = secs % 60;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }


