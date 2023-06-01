// Function to fetch runs from the server, and then update the chart and checkboxes
function fetchAndUpdateRuns() {
  fetch('/api/getChartData.php')
    .then(response => response.json())
    .then(runs => {
      updateChart(runs);
      updateCheckboxes(runs);
    })
    .catch(error => console.error(error));
}

// Function to convert time string to total seconds
function timeToSeconds(time) {
  let parts = time.split(':');
  return parts[0] * 3600 + // hours
         parts[1] * 60 +   // minutes
         +parts[2];        // seconds
}

function updateChart(runs) {
  // Initialize an array with 100 elements, all set to 0
  let chartData = new Array(100).fill(0);

  // Update the chartData array with your actual run times
  runs.forEach(run => {
    chartData[run.day - 1] = timeToSeconds(run.time)/60;
  });

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...Array(100).keys()].map(i => i + 1), // Array from 1 to 100
      datasets: [{
        data: chartData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      maintainAspectRatio: false, // Add this line
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateCheckboxes(runs) {
  let checkboxesDiv = document.getElementById("checkboxes");

  // Clear old checkboxes
  checkboxesDiv.innerHTML = '';

  for (let i = 1; i <= 100; i++) {
      let runForDay = runs.find(run => run.day === i.toString());

      let checkboxWrapper = document.createElement('div');
      checkboxWrapper.className = 'checkbox-wrapper';

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "day" + i;
      checkbox.hidden = true;

      if (runForDay) {
          checkbox.checked = true;
      }

      let label = document.createElement('label')
      label.htmlFor = "day" + i;
      label.className = checkbox.checked ? "custom-label-checked" : "custom-label";
      label.appendChild(document.createTextNode(i));

      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      checkboxesDiv.appendChild(checkboxWrapper);
  }
}

// Fetch runs from the server and update the chart and checkboxes when the page loads
fetchAndUpdateRuns();
