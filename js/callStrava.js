import {reAuthorize} from '/../api/strava_api.js'

document.getElementById("loadingSpinner").style.display = "block";
document.getElementById("content").style.display = "none";

reAuthorize(0)
    .finally(() => {
        // Hide the spinner and show content
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("content").style.display = "block";
    });
