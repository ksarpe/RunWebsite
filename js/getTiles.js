// Fetch data from your PHP script
fetch('./api/getRuns.php')
  .then(response => response.json())
  .then(data => {
    // Sort data by id (day)
    data.sort((a, b) => a.id - b.id);
    
    let previousRunTimeInSeconds = 0;
    
    // Create a tile for each run
    data.forEach(run => {
      // Calculate run time difference from previous run
      const runTimeInSeconds = timeToSeconds(run.time);
      const timeDifferenceInSeconds = runTimeInSeconds - previousRunTimeInSeconds;
      const timeDifference = secondsToTime(timeDifferenceInSeconds);
      
      // Remember current run time for next iteration
      previousRunTimeInSeconds = runTimeInSeconds;

      // Create a new card element
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted" id="run-id-${run.id}">ID</h6>
            <div class="text-center">
              <div class="time">
                <h4 class="card-title d-inline" id="run-time-${run.id}">CZAS</h4>
                <h6 class="text-success d-inline" id="run-difference-${run.id}"></h6>
              </div>         
              <h6 class="card-text d-inline" id="run-hour-${run.id}">GODZINA</h6>
              <h6 class="card-text d-inline" id="run-location-${run.id}">MIEJSCE</h6>
            </div>                  
          </div>
        </div>
      `;
      
      // Update the card with the data from the run
      card.querySelector(`#run-id-${run.id}`).textContent = "Dzień " + run.id;
      card.querySelector(`#run-time-${run.id}`).textContent = run.time;
      if (run.id !== "1") {
        let differenceElement = card.querySelector(`#run-difference-${run.id}`);
        differenceElement.textContent = "(" + timeDifference + ")";
        if (timeDifferenceInSeconds > 0) {
          // If run time increased, make text red
          differenceElement.style.setProperty('color', 'red', 'important');
        } else if (timeDifferenceInSeconds < 0) {
          // If run time decreased, make text green
          differenceElement.style.setProperty('color', 'green', 'important');

          
        }
      }
      card.querySelector(`#run-location-${run.id}`).textContent = run.location;
      card.querySelector(`#run-hour-${run.id}`).textContent = run.hour;
      
      // Add the card to the DOM
      document.getElementById('runs').appendChild(card);
    });
  })
  .catch(error => console.error('Error:', error));

// Function to convert time string to total seconds
function timeToSeconds(time) {
  let parts = time.split(':');
  return parts[0] * 3600 + // hours
         parts[1] * 60 +   // minutes
         +parts[2];        // seconds
}

// Function to convert total seconds to time string
function secondsToTime(secs) {
  if(secs < 0) secs *= -1;
  function pad(n) { return n<10 ? '0'+n : n }
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor((secs % 3600) / 60);
  var seconds = secs % 60;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}
``
