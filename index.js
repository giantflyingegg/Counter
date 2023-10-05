//counter logic

let counter = 0;

document.getElementById("counter").innerHTML = counter;

document.getElementById("decrease").addEventListener("click", () => {
  counter--;
  document.getElementById("counter").innerHTML = counter;
});

document.getElementById("increase").addEventListener("click", () => {
  counter++;
  document.getElementById("counter").innerHTML = counter;
});

//didnt work ?why
//document.querySelector(".reset").addEventListener("click", () => {
  //counter = 0;
  //document.querySelector(".counter").innerHTML = counter;
//});


document.getElementById("reset").addEventListener("click", () => {
  counter = 0;
  document.getElementById("counter").innerHTML = counter;
});
