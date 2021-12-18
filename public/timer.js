var countDownDate = new Date("Jan 1, 2023 0:00:00").getTime();
var pad = function(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
var x = function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = days + "d " + pad(hours, 2) + "h "
  + pad(minutes, 2) + "m " + pad(seconds, 2) + "s";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "D Day";
  }
};
x();
setInterval(x, 1000);
