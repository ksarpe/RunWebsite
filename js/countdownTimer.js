var now = new Date().getTime();
var countDownDate = new Date("June 8, 2023 14:00:00").getTime();

//Check if the date has passed
if (now > countDownDate) {
    window.location.href = "runs.html";
}

//Set initial date to avoid delay
setDate();

//start countdown
var countdownFunction = setInterval(function() {
    setDate();
}, 1000);

function setDate(){
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
}