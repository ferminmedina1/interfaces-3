"use strict";

    let puntos = 0; 
    var keyDown = false;        
    let temporizador = 61000; //en ms.
    let background = document.querySelector(".layer");
    let player = document.querySelector(".player");
    let tiempo = 60;
    let start, previousTimeStamp;
    let saltando = false;
    const music = new Audio('./sounds/soundCoin.mp3');  //se crea un objeto con el sonido
    let layers = document.getElementsByClassName("layer"); 
    let originalPosition = player.getBoundingClientRect()
    let endGame = false;
    let intervalRecompensa;
    let intervalEnemigos;

//con esto pausamos el background

stop()

//cuando se clickea en jugar

document.getElementById("play").addEventListener("click", function(){   
    
    document.getElementById("play").style.display = "none"
    play()  //
    crearObstaculo() //se crea el primer obstaculo
    crearRecompensa() //se crea la primer recompensa
    intervalreward()    //mueve las recompensas
    intervalEnemies()   //mueve los enemigos
    hayColision();  //verifica si los divs colisionan

    player.classList.add("running");  //el avatar comienza a correr

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
    

    function step(timeStamp){

        if(start === undefined){
            start = timeStamp
        }
        const elapsed = timeStamp - start;

        if(previousTimeStamp !== timeStamp){

            if(keyDown && player.className == "player running"){    //si se apreta la tecla y es activa esa clase

                player.classList.add("jump");
                saltando = true;
                setTimeout(function(){ saltando = false}, 1000);    //cuando termina la animacion
            }

            else if(saltando == false){ //si no esta saltando
                player.className = "player running";
            }

        }

        if((elapsed < temporizador) && !perdio){    //si se acaba el tiempo o el jugador pierde

            previousTimeStamp = timeStamp
            window.requestAnimationFrame(step);
        }
        else{

            if (perdio){    //si el jugador pierde 

                window.clearInterval(intervalTime)
                clearInterval(intervalEnemigos)
                clearInterval(intervalRecompensa)
                document.querySelector(".divCoins").style.display ="none"
                document.querySelector(".points").innerHTML = "Has perdido... Puntaje: " + puntos;
                document.querySelector(".points").style.display ="block"
                document.querySelector(".coin").style.display ="none"
                document.querySelector(".enemigo").style.display ="none"
                document.querySelector(".time").style.display ="none"
                endGame = true;

            }
            else{   //si se acaba el tiempo

                window.clearInterval(intervalTime)
                clearInterval(intervalEnemigos)
                clearInterval(intervalRecompensa)
                document.querySelector(".divCoins").style.display ="none"
                document.querySelector(".points").innerHTML = "Se termino el tiempo... Puntaje: " + puntos;
                document.querySelector(".points").style.display ="block"
                document.querySelector(".coin").style.display ="none"
                document.querySelector(".enemigo").style.display ="none"
                document.querySelector(".time").style.display ="none"
                endGame = true;

            }
            stop(); //pausa el background
        }
    }


    window.requestAnimationFrame(step);

 //este intervalo va mostrando el tiempo restante en pantalla

    let intervalTime = setInterval(function(){

        if(background.style.webkitAnimationPlayState != "paused"){
            
            document.querySelector(".time").innerHTML = "Tiempo restante: "+ tiempo;
            tiempo--;

        }
        else{
            document.querySelector(".time").style.display ="none"
        }
    },1000);

})


//con esta funcion pausamos el background

function stop(){

    for(let i=0; i < layers.length; i++) {  //este for recorre todos los divs q tienen layers y los pausa
        
        if(endGame){
            layers[i].classList.remove("playGame");
        }
        layers[i].classList.add("stopLayers");
    }
    player.className = "idle"; 
}


//con esta funcion iniciamos el background

function play(){

    for(let i=0; i < layers.length; i++) {  //este for recorre todos los divs q tienen layers y los inicia
        layers[i].classList.remove("stopLayers");
        layers[i].classList.add("playGame");
    }
}

