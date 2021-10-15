"use strict";

document.addEventListener('DOMContentLoaded', loadGame);

function loadGame () {
    let background = document.querySelector(".game");
    let player = document.querySelector(".player");

    document.addEventListener("keydown", function (e){
        if(e.key == "d" || e.key == "ArrowRight"){
            background.style.webkitAnimationPlayState = "running";
            player.classList.add("running");
        }
        if(e.key == " "){
            background.style.webkitAnimationPlayState = "running";
            player.classList.add("attack");
        }

        document.addEventListener("keyup", function (e){
            background.style.webkitAnimationPlayState = "paused";
            player.className = "player";
        });
        console.log(e);
    })
    
}