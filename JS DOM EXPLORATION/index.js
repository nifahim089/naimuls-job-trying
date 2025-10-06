// let's experiment on dom selection method 
const buttonClick = document.getElementById("container");
buttonClick.addEventListener("click",function() {
    alert("button clicked")
});
const clickingResult =document.getElementById("button");
clickingResult.addEventListener("mousedown",function(){
    console.log("i'm clicked ,alright");
}) 
