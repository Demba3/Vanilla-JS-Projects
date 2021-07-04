const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2021, 8, 5, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
// const seconds = futureDate.getSeconds();

let month = futureDate.getMonth();
month = months[month];
let date = futureDate.getDate();
const weekDay = weekdays[futureDate.getDate()];

giveaway.textContent = `giveaway ends on ${weekDay} ${date} ${month} ${year} ${hours}:${minutes}am`


const futureTime = futureDate.getTime();

const getRemainingTime = () => {
const today = new Date().getTime();
const t = futureTime - today;

//values in ms
const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;

const days = Math.floor(t / oneDay);
const hours = Math.floor((t % oneDay) / oneHour);
const minutes = Math.floor((t % oneHour) / oneMinute);
const seconds = Math.floor((t % oneMinute) / 1000);

const values = [days, hours, minutes, seconds];

items.forEach((item, index) => {
  const value = values[index];
  item.innerHTML = (value < 10)? `0${value}` : value;
})

if(t < 0){
  clearInterval(countDown);
  deadline.innerHTML = `<h4 class="expires">Sorry, this giveaway has expired</h4>`
}
}
let countDown = setInterval(getRemainingTime, 1000);

getRemainingTime();