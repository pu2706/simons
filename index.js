var started = false;
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0
$("body").click(function(){
    if(!started){
        $("#level-title").text("level"+level);
        newsequence()
        started = true;
    }
    
})
$(".btn").click(function(){
    var userClickedbutton = $(this).attr("id");
    userClickedPattern.push(userClickedbutton);
    setTimeout(function(userClickedbutton){$(userClickedbutton).addClass("pressed")},3000);
    animatePress(userClickedbutton);
    playsound(userClickedbutton);
    checkAnswer(userClickedPattern.length-1);
   
})
function newsequence(){
   userClickedPattern=[];
    level ++
    $("#level-title").text("level "+level);
    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    
    
   
}
function playsound(name){
    var audio = new Audio (name+".mp3")
    audio.play();
}
function animatePress(currentcolour){
    setTimeout(function(){
        $("#"+currentcolour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentcolour).removeClass("pressed")
        },100)
    },100)
   
}
function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        if(gamePattern.length===userClickedPattern.length){setTimeout(function(){
        newsequence()},1000);
    }}
    else{
  $("body").addClass("game-over")
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },100)
  var audio = new Audio("wrong.mp3");
  audio.play();
  startOver();
    }
}
function startOver(){
level = 0;
gamePattern=[];
started = false;
}