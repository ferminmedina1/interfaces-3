"use strict";

    let puntos = 0;
    var keyDown = false;
    let temporizador = 61000; //en ms.
    let background = document.querySelector(".layer");
    let player = document.querySelector(".player");
    let tiempo = 60;
    const music = new Audio('./sounds/soundCoin.mp3');
    let layers = document.getElementsByClassName("layer"); 
    let originalPosition = player.getBoundingClientRect()
    //background.style.webkitAnimationPlayState = "running";
    //background.style.webkitAnimationPlayState = "paused"
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
            //    console.log("se dejo de apretar el boton hacia arriba.");
                player.className = "player running";
                
            }

        }

        if((elapsed < temporizador) && !perdio){
            previousTimeStamp = timeStamp
            window.requestAnimationFrame(step);
        }
        else{
            if (perdio){
                document.querySelector(".points").innerHTML = "Has perdido... Puntaje: " + puntos;
                document.querySelector(".coin").style.display ="none"
                document.querySelector(".enemigo").style.display ="none"
                window.clearInterval(intervalTime)
                document.querySelector(".time").style.display ="none"  
            }
            else{
                document.querySelector(".points").innerHTML = "Se termino el tiempo... Puntaje: " + puntos;
                window.clearInterval(intervalTime)
                document.querySelector(".time").style.display ="none"
            }
            player.className = "idle";

            for(let i=0; i < layers.length; i++) {  //este for recorre todos los divs q tienen layers y los pausa
                layers[i].classList.add("stopLayers");
            } 
            console.log("fin!");
        }

    
    }


    
    
    window.requestAnimationFrame(step);
    
    let intervalTime = setInterval(function(){

        if(background.style.webkitAnimationPlayState != "paused"){
            
            document.querySelector(".time").innerHTML = "Tiempo restante: "+ tiempo;
            tiempo--;
        }else{
        document.querySelector(".time").style.display ="none"
        }
    },1000);

