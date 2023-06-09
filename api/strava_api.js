import { displayActivities } from '/../js/getTiles.js'
import { displayStats } from '/../js/getStats.js'
import { updateChart } from '../js/getChart.js';

const auth_link = "https://www.strava.com/oauth/token"
//if any problem, try to fetch new refresh token with authorization code. with activity:read_all scope

function reAuthorize() {
    // I KNOW THAT THIS IS HERE AND I DON'T GIVE A FUCK
    const details = {
        'client_id': '108719',
        'client_secret': 'dce81b0235222406449602eb3d24bb5649ff4617',
        'refresh_token': '0317f1f5db888156dcd2072853f2226cb796c0c6',
        'grant_type': 'refresh_token'
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(auth_link, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    .then(res => res.json())
    .then(res => getActivities(res))
}


function getActivities(data){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${data.access_token}`;
    fetch(activities_link)
        .then((res) => res.json())
        .then((json) => {
            displayActivities(json)
            return json;
        })
        .then((json) => {
            displayStats(json)
            return json;
        })
        .then((json) => updateChart(json))
        .catch((err) => console.log('Error: ', err));
}

reAuthorize();
