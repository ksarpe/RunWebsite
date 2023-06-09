// Function to fetch runs from the server, and then update the chart and checkboxes
export function updateChart(json) {
      drawChart(json);
      updateCheckboxes(json);
}

function drawChart(json) {
  // Initialize an array with 100 elements, all set to 0
  let chartData = new Array(100).fill(0);

  chartData[0] = 8542/3600; //8542 from first day off strava
  json.forEach((run, index) => {
    chartData[index + 1] = run["moving_time"]/3600;
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
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Run'
          }
        }
      }
    }
  });
}

function updateCheckboxes(json) {
  let checkboxesDiv = document.getElementById("checkboxes");

  // Clear old checkboxes
  checkboxesDiv.innerHTML = '';

  let checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "day1";
    checkbox.hidden = true;
    checkbox.checked = true;

    let label = document.createElement('label')
    label.htmlFor = "day1";
    label.className = "custom-label-checked";
    label.appendChild(document.createTextNode(1));

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    checkboxesDiv.appendChild(checkboxWrapper);

  for (let i = 2; i <= 100; i++) {
      let runForDay = json.find((_, index) => index+2 === i);

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