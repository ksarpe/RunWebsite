// Function to fetch runs from the server, and then update the chart and checkboxes
export function updateChart(json) {
      drawChart(json);
      updateCheckboxes(json);
}

function drawChart(json) {
  // Initialize three arrays with 33 elements each, all set to 0
  let chartDataRun = new Array(33).fill(0);
  let chartDataBike = new Array(33).fill(0);
  let chartDataSwim = new Array(33).fill(0);

  // Initialize separate counters for each activity type
  chartDataRun[0] = 8542 / 3600; 
  let countRun = 1;
  let countBike = 0;
  let countSwim = 0;

  json.slice().reverse().forEach((activity) => {
    console.log(activity.name);
    switch (activity.type) {
      case 'Run':
        if (countRun < 33) {
          chartDataRun[countRun] = activity["moving_time"] / 3600;
          countRun++;
        }
        break;
      case 'Ride':
        if (countBike < 33) {
          chartDataBike[countBike] = activity["moving_time"] / 3600;
          countBike++;
        }
        break;
      case 'Swim':
        if (countSwim < 33) {
          chartDataSwim[countSwim] = activity["moving_time"] / 3600;
          countSwim++;
        }
        break;
    }
  });

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...Array(33).keys()].map(i => i + 1), // Array from 1 to 33
      datasets: [
        {
          label: 'Run',
          data: chartDataRun,
          fill: false,
          borderColor: 'rgb(107, 224, 107)',
          tension: 0.1
        },
        {
          label: 'Bike',
          data: chartDataBike,
          fill: false,
          borderColor: 'rgb(222, 182, 89)',
          tension: 0.1
        },
        {
          label: 'Swim',
          data: chartDataSwim,
          fill: false,
          borderColor: 'rgb(89, 222, 222)',
          tension: 0.1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true // Changed to true to display the dataset labels
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
            text: 'Discipline count'
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
    label.appendChild(document.createTextNode("R"));

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    checkboxesDiv.appendChild(checkboxWrapper);

    json.reverse(); //reverse for correct order in checkboxes

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
      if(i === 100){
        label.classList.add("last-day");
      }
      if(json.length > 0 && i - 1 <= json.length){
        let discipline = json[i - 2].type.slice(0, 1).toUpperCase();
        if (json[i-2].type == "Ride") {discipline = "B";}
        label.appendChild(document.createTextNode(discipline));
      }
      else{
        label.appendChild(document.createTextNode(i));
      }

      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      checkboxesDiv.appendChild(checkboxWrapper);
  }
}