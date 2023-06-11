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
  let minTimeRun = 8542, minTimeBike = Infinity, minTimeSwim = Infinity;
  let sumTimeRun = 8542, sumTimeBike = 0, sumTimeSwim = 0;
  let countRun = 1, countBike = 0, countSwim = 0;

  json.forEach((element) => {
    switch (element.type) {
      case 'Run':
        if (element.moving_time < minTimeRun) {
          minTimeRun = element.moving_time;
        }
        sumTimeRun += element.moving_time;
        countRun++;
        break;
      case 'Ride':
        if (element.moving_time < minTimeBike) {
          minTimeBike = element.moving_time;
        }
        sumTimeBike += element.moving_time;
        countBike++;
        break;
      case 'Swim':
        if (element.moving_time < minTimeSwim) {
          minTimeSwim = element.moving_time;
        }
        sumTimeSwim += element.moving_time;
        countSwim++;
        break;
    }
  });

  // Ensure that if no data was found for an activity type, the minTime is set to 0
  minTimeRun = minTimeRun === Infinity ? 0 : minTimeRun;
  minTimeBike = minTimeBike === Infinity ? 0 : minTimeBike;
  minTimeSwim = minTimeSwim === Infinity ? 0 : minTimeSwim;

  // Calculate averages
  let avgTimeRun = countRun > 0 ? sumTimeRun / countRun : 0;
  let avgTimeBike = countBike > 0 ? sumTimeBike / countBike : 0;
  let avgTimeSwim = countSwim > 0 ? sumTimeSwim / countSwim : 0;

  // Display the results
  document.getElementById('best-time-run').textContent = "(" + secondsToTime(minTimeRun) + ")";
  document.getElementById('average-run').textContent = "(" + secondsToTime(avgTimeRun) + ")";

  document.getElementById('best-time-bike').textContent = "(" + secondsToTime(minTimeBike) + ")";
  document.getElementById('average-bike').textContent = "(" + secondsToTime(avgTimeBike) + ")";;

  document.getElementById('best-time-swim').textContent = "(" + secondsToTime(minTimeSwim) + ")";;
  document.getElementById('average-swim').textContent = "(" + secondsToTime(avgTimeSwim) + ")";;

}

function secondsToTime(secs) {
  if(secs < 0) secs *= -1;
  function pad(n) { return n<10 ? '0'+n : n }
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor((secs % 3600) / 60);
  var seconds = secs % 60;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}
