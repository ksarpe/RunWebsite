// This is an example object that represents a run fetched from the database
let run = {
    title: "Morning Run",
    date: "June 5, 2023",
    description: "A quick run around the park. It was a little chilly, but the sun came out towards the end.",
    duration: "30 minutes"
  };
  
  // Update the card with the data from the run
  document.getElementById('run-title').textContent = run.title;
  document.getElementById('run-date').textContent = run.date;
  document.getElementById('run-description').textContent = run.description;
  document.getElementById('run-duration').textContent = run.duration;
  