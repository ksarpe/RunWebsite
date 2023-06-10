export function displayStats(json){
  if(json.length == 0) return;
  const len = json.length + 1; // +1 because of first day off strava
  
  // show progress
  document.getElementById('progress').textContent = 100 - len;
  
  // show total KM
  let totalKM = json.reduce((sum, element) => {
    return sum + element["distance"]/1000;
  }, 0);
  document.getElementById('total').textContent = (totalKM + 21.1).toFixed(1);
  
  // show best time
  let minTime = json.reduce((min, element) => {
    if(element.time < min) {
        return element.time;
    } else {
        return min;
    }
  }, json[0]["moving_time"]);

  minTime = minTime < 8542 ? minTime : 8542; //8542 from first day off strava

  document.getElementById('best-time-run').textContent = secondsToTime(minTime);

  // show average time
  let sumTime = json.reduce((sum, element) => {
    return sum + element["moving_time"];
  }, 0);

  let avgTime = (sumTime + 8542) / len;  //8542 from first day off strava
  document.getElementById('average-run').textContent = secondsToTime(avgTime);

  //eventually add calories
}

function secondsToTime(secs) {
  if(secs < 0) secs *= -1;
  function pad(n) { return n<10 ? '0'+n : n }
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor((secs % 3600) / 60);
  var seconds = secs % 60;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}
