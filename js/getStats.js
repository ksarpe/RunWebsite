fetch('./api/getStats.php')
  .then(response => response.json())
  .then(data => {
    document.getElementById('progress').textContent = data.runs + "/100";
    document.getElementById('best-time').textContent = data.bestTime;
    document.getElementById('average').textContent = data.averageTime.slice(0,8);
    document.getElementById('weight').textContent = data.weight + "(90)";
    document.getElementById('calories').textContent = data.calories;
  })
  .catch(error => console.error('Error:', error));
