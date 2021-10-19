"use strict";

document.addEventListener('DOMContentLoaded', loadGame);

function loadGame () {
    let puntos = 0;
    var keyDown = false;
    let temporizador = 30000; //en ms.
    let background = document.querySelector(".game");
    let player = document.querySelector(".player");

    background.style.webkitAnimationPlayState = "running";
    player.classList.add("running");  

    window.addEventListener("keydown", function (e){
        if(e.code == "KeyW" || e.code == "ArrowUp" || e.key == " "){
            keyDown = true;
        }  
    })

    window.addEventListener("keyup", function resetAnimation(e){
        if(e.code == "KeyW" || e.code == "ArrowUp" || e.key == " "){
            keyDown = false;
        } 
    });
    
    let start, previousTimeStamp;
    function step(timeStamp){
        if(start === undefined){
            start = timeStamp
        }
        const elapsed = timeStamp - start;

        if(previousTimeStamp !== timeStamp){
            if(keyDown){
                console.log("Se apreto el boton hacia arriba.");
                player.classList.add("jump");
            }
            else{
                console.log("se dejo de apretar el boton hacia arriba.");
                player.className = "player running";
            }
        }

        if(elapsed < temporizador){
            previousTimeStamp = timeStamp
            window.requestAnimationFrame(step);
        }else{
            document.querySelector(".points").innerHTML = "Se termino el tiempo... Puntaje: " + puntos;
            player.className = "player";
            background.style.webkitAnimationPlayState = "paused";
            console.log("fin!");
        }
    }

    window.requestAnimationFrame(step);

    setInterval(function(){
        if(background.style.webkitAnimationPlayState != "paused"){
            document.querySelector(".points").innerHTML = puntos;
            puntos++;
        }
        },500);
}
