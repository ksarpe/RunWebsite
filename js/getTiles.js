// Fetch data from your PHP script
export function displayActivities(jsonData) {  
  //console.log(json)
    // Create a tile for each run
    jsonData.forEach((run, index) => {
      // Create a new card element
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.id = 'run-card';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
          <div class="muted">
            <h6 class="card-subtitle mb-2 text-muted d-inline" id="run-id-${index + 1}"></h6>
            <h6 class="card-subtitle mb-2 text-muted d-inline" id="run-date-${index + 1}">08.06.23</h6>
            <h6 class="card-subtitle mb-2 text-muted d-inline" id="run-difficulty-${index + 1}">HARD</h6>
          </div>   
            <div class="text-center">
              <div class="time">
                <h4 class="card-title d-inline run-time" id="run-time-${index + 1}">CZAS</h4>
              </div>         
              <h6 class="card-title" id="run-kcal-${index + 1}">kcal: 1901</h6>        
            </div>                  
          </div>
        </div>
      `;
      
      // Update the card with the data from the run
      //day name
      card.querySelector(`#run-id-${index + 1}`).textContent = run['name'];
      //start date and time
      const { date, startTime } = splitDateTime(run['start_date_local']);
      card.querySelector(`#run-date-${index + 1}`).textContent = date + " | " + startTime;
      const time = secondsToTime(run['moving_time']);
      card.querySelector(`#run-time-${index + 1}`).textContent = time;
      card.querySelector(`#run-kcal-${index + 1}`).textContent = "kcal: "
      
      // Add the card to the DOM
      document.getElementById('runs').appendChild(card);
    });
}
function secondsToTime(secs) {
  if(secs < 0) secs *= -1;
  function pad(n) { return n<10 ? '0'+n : n }
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor((secs % 3600) / 60);
  var seconds = secs % 60;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function splitDateTime(isoString) {
  const dateTime = new Date(isoString);
    
    const month = ("0" + (dateTime.getMonth() + 1)).slice(-2); // Get the month part and pad with a leading zero if necessary
    const day = ("0" + dateTime.getDate()).slice(-2); // Get the day part and pad with a leading zero if necessary
    const date = `${day}.${month}`; // Combine day and month to form the date string

    const hour = ("0" + dateTime.getHours()).slice(-2) - 2; // Get the hour part and pad with a leading zero if necessary
    const minute = ("0" + dateTime.getMinutes()).slice(-2); // Get the minute part and pad with a leading zero if necessary
    const startTime = `${hour}:${minute}`; // Combine hour and minute to form the time string

    return { date, startTime };
}

