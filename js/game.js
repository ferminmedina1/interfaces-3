"use strict";

document.addEventListener('DOMContentLoaded', loadGame);

function loadGame () {
    let background = document.querySelector(".game");
    let player = document.querySelector(".player");

    background.style.webkitAnimationPlayState = "running";
    player.classList.add("running");  

    document.addEventListener("keydown", function (e){
        if(e.code == "KeyW" || e.code == "ArrowUp" || e.key == " "){
            console.log("Se apreto el boton hacia arriba.");
            player.classList.add("jump");

        }

        document.addEventListener("keyup", function resetAnimation(e){
            console.log("se dejo de apretar el boton hacia arriba.");
            player.className = "player running";
        });

    })
    
}
