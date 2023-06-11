// Fetch data from your PHP script
export function displayActivities(jsonData) {  
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
          </div>   
            <div class="text-center">
              <div class="time">
                <h4 class="card-title run-time" id="run-time-${index + 1}">CZAS</h4>
              </div>         
              <h4 class="card-title discipline" id="discipline-${index + 1}">RUN</h4>
              <h4 class="card-title distance" id="distance-${index + 1}">DISTANCE</h4>
            </div>                  
          </div>
        </div>
      `;
      
      // Update the card with the data from the run
      // Name (day 1 etc..) start date and time, text muted at the top
      card.querySelector(`#run-id-${index + 1}`).textContent = run['name'];
      const date = splitDateTime(run['start_date_local']);
      card.querySelector(`#run-date-${index + 1}`).textContent = date;
      const time = secondsToTime(run['moving_time']);
      card.querySelector(`#run-time-${index + 1}`).textContent = time;

      //discipline
      if(run['type'] == "Ride"){
        card.querySelector(`#discipline-${index + 1}`).textContent = "BIKE";
      }
      else{
        card.querySelector(`#discipline-${index + 1}`).textContent = run['type'].toUpperCase();
      }

      if(run.type == "Run") card.querySelector(`#discipline-${index + 1}`).classList.add("run-tile");
      else if(run.type == "Ride") card.querySelector(`#discipline-${index + 1}`).classList.add("bike-tile");
      else if(run.type == "Swim") card.querySelector(`#discipline-${index + 1}`).classList.add("swim-tile");

      //distance
      card.querySelector(`#distance-${index + 1}`).textContent = (run['distance']/1000).toFixed(1) + "KM";
      
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

    return date;
}

