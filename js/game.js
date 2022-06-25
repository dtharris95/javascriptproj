$(document).ready(function(){

    $("h1").html("Bye-Bye Basketball!");
    
    // stores variable once user enters their name
    let firstName = prompt("What is your first name?");
    // variable that includes their entered prompted firstName
    let welcome = "Are you ready to get started, " + firstName + "? ";


    // instructions for the game
    $("#directions").html("The objective of this game is to click as many basketballs as you can in the given timeframe! The catch is that the basketballs will randomly appear on screen in different spots!");
    // welcomes user and is added to beginning of #directions paragraph
    $("#directions").prepend(welcome);

    // click button to start game and run functions below
    $("#start_button").click(function(){
        beginGame();
    });

    $("#start_button").css({
        'width': '80px',
        'color': 'black',
        'font-size': '20px',
        'background-color': 'rgb(255, 51, 0)',
    });

}); // end of doc ready

var url = 'img/basketball.png';

// alerts position of random x-axis coordinate w/in gamespace div
function gameX(){
    return Math.floor((Math.random()*250));
}
// alerts position of random y-axis coordinate w/in gamespace div
function gameY(){
    return Math.floor((Math.random()*540));
}

// new function to generate random number of time before new img appears
// function called in addImage function below
function randHide(){
    return Math.floor(Math.random()*3000);
}

// global counter
let addPoints = 0;

function increment(){
    addPoints++;
    $("#score").html(addPoints + " pts");
}

function beginGame() {
    $(".timer").show();
    countdown();
    addImage();
    $("#start_button").off(); // can also use hide here to hide start button once clicked
    // below line of code allows all images INSIDE gamespace to be clickable (images only)
    $("#gamespace").on("click", "img", function(){
        increment();
        // JQUERY UI IMPLEMENTED, BOUNCE EFFECT ON CLICK TO HIDE CLICKED IMAGE
        $(this).hide("bounce", 500); // img tag is selector, 'this' specificity can be used for specific img clicked to hide
    });
}

// global counter/timer
let seconds = 10;

let y; //for the setTimeout
function countdown() {
    if(seconds >= 0) {

        $("#timertext").html(seconds + " seconds");
        seconds--; //moved from before #timertext jquery ready to here
        y= setTimeout("countdown()", 1000);
    } else {
        alert("Time's up! You earned a score of " + addPoints + " points!");
        seconds = 10;
        addPoints = 0;
        restartGame();

        clearTimeout("countdown(y)"); // clear the variable y for setTimeout
        clearTimeout(x); //clearing the setTimeout in addImage function
    }
}

let x; //for the setTimeout

// global variable for DYNAMIC UNIQUE ID used for making img randomly DISAPPEAR
let count = 0;

// code below continuously adds new instances of image in gamespace

function addImage() {
    var xPos = gameX(); // want to store random position in variable BEFORE the append
    var yPos = gameY(); 

    $("#gamespace").append('<img id="basketball'+count+'" class="ball" src="img/basketball.png" alt="Basketball" style = "top: ' + xPos +'px; left: '+ yPos + 'px;" />');
    
    // iden = identity, stores #basketball0 in identity variable
    var iden = "#basketball" + count;

    // how to find iden var from above ^

    $("body").find(iden).delay(Math.floor(Math.random()*3000)).fadeOut();
    // $("#basketball"+count).delay(Math.floor(Math.random()*3000)).fadeOut();

    // when addImage runs, will produce #basketball1, #basketball2, etc.
    count++;
    
    x = setTimeout("addImage()", randHide());
    /* another way to accomplish above goal: create var, set it equal to randomized number, call variable in setTimeout
    var r = Math.floor(Math.random()*3000);
    t = setTimeout("addImage()", r); */
}

function restartGame(){
    $("#timertext").html(seconds + " seconds");
    $("#score").html(addPoints + " pts");
    $("#start_button").click(function(){
        beginGame();
    });
}