window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }

function insertBlank(n){
    if (n<10)
        return "&nbsp;"
    else
        return ""
}

var ding = new Audio('ding.mp3');
var tick = [ new Audio('tick2.wav'), new Audio('tick1.wav')];
tick[0].volume=0.05;
tick[1].volume=0.05;
var tickB = new Audio('tick_B.mp3');
tickB.volume=0.7;
var showAlarm=false;


document.addEventListener("keydown", (event) => {
    console.log("you pressed " + event.key);
    let volumeChanged=false;
    if(event.key==="ArrowUp"){
    tick[0].volume+=0.05;
    tick[1].volume+=0.05;
    volumeChanged=true;
    }
    if(event.key==="ArrowDown"){
    tick[0].volume-=0.05;
    tick[1].volume-=0.05;
    volumeChanged=true;
    }
    if(event.key==="PageUp"){
    tick[0].volume=1;
    tick[1].volume=1;
    volumeChanged=true;
    }
    if(event.key==="PageDown"){
    tick[0].volume=0.05;
    tick[1].volume=0.05;
    volumeChanged=true;
    }
    if(volumeChanged)
        console.log("Volume set to "+ tick[0].volume)
    return;
});


setInterval(function() {
var now = new Date().getTime();
var t = deadline - now;
var text='noch: <br>';
var n='';

if (showAlarm) {
    document.getElementById("cntdwn").innerHTML = "⏰";
    return;
}
if (t < 0){
    text='seit: <br>'
    t=-t;
    n='n'
}
	
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
	
if(max_time_unit!='s' && max_time_unit!='m' && max_time_unit!='h' && max_time_unit!='d'){
	max_time_unit='m';
	if (t>2*60*60*1000)
		max_time_unit='h';
	if (t>2*24*60*60*1000)
		max_time_unit='d';
}
	
if (max_time_unit=='s'){
    seconds = Math.floor(t/ 1000);
}
else if (max_time_unit=='m'){
    minutes = Math.floor(t / (1000 * 60));
    seconds = Math.floor((t % (1000 * 60)) / 1000);
}
else if (max_time_unit=='h'){
    hours = Math.floor(t/(1000 * 60 * 60));
    minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((t % (1000 * 60)) / 1000);
}
else{
    days = Math.floor(t / (1000 * 60 * 60 * 24));
    hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((t % (1000 * 60)) / 1000);
}
if (days==1)
	text = text + days + " Tag"+" <br>";	
if (days>1)
	text = text + days + " Tage"+n+" <br>";
n='&nbsp;';if(hours>1)n='n';
if (hours>0)
	text = text + insertBlank(hours) + hours + " Stunde"+n+" <br>";
n='&nbsp;';if(minutes>1)n='n';
if (minutes>0)
	text = text + insertBlank(minutes) + minutes + " Minute"+n+" <br>";
n='&nbsp;';if(seconds!=1)n='n';
text = text +"&nbsp;"+ insertBlank(seconds) + seconds + " Sekunde"+n+" <br>";
	
document.getElementById("cntdwn").innerHTML=text;
	
if(Math.floor(t/1000)==0){
    setTimeout(function(){ding.play();},500);  
    showAlarm=true;
}
else if(seconds==0){
    if(deadline - now != t)
        tickB.play();
    else
	    setTimeout(function(){tickB.play();},1000); 
}

tick[seconds%2].play();
	
}, 1000);