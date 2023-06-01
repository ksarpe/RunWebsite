fetch('./api/getStats.php')
  .then(response => response.json())
  .then(data => {
    document.getElementById('progress').textContent = data.runs + "/100";
    document.getElementById('best-time').textContent = data.bestTime;
    document.getElementById('average').textContent = data.averageTime.slice(0,8);
  })
  .catch(error => console.error('Error:', error));
