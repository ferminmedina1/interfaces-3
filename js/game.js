"use strict";

    let puntos = 0; 
    var keyDown = false;        
    let temporizador = 61000; //en ms.
    let background = document.querySelector(".layer");
    let player = document.querySelector(".player");
    let tiempo = 60;
    let saltando = false;
    const music = new Audio('./sounds/soundCoin.mp3');  //se crea un objeto con el sonido
    let layers = document.getElementsByClassName("layer"); 
    let originalPosition = player.getBoundingClientRect()
    let endGame = false;

//con esto pausamos el background

stop()

//cuando se clickea en jugar

document.getElementById("play").addEventListener("click", function(){   
    
    document.getElementById("play").style.display = "none"
    play()  //
    crearObstaculo() //creo 1 solo para probar
    crearRecompensa() //lo mismo
    hayColision();

    let intervalEnemigos = setInterval(function(){

        let enemigo = document.querySelector(".enemigo")
        
        if(posicionEnemigoActual < 0){
            
            enemigo.remove();
            crearObstaculo()
            if(totalDeEnemigos %2 == 0) {
                velociadEnemigo += 0.3;
            }
            posicionEnemigoActual = background.clientWidth;
        }

        moverObstaculos(enemigo)

    },5)  

    //Este intervalo mueve la moneda

    let intervalRecompensa = setInterval(function(){

        let recompensa = document.querySelector(".coin")

        if(posicionRecompensaActual < 0){
            
            recompensa.remove();
            crearRecompensa()
            //velociadRecompensa += 0.2;
            posicionRecompensaActual = background.clientWidth;
        }
        if (positionDivRecompensa == positionDivAvatar){
            
            recompensa.classList.add("agarroMoneda")
            
            setTimeout(function(){
                
                recompensa.style.display = "none"
            },300)
        }
        else{
            moverRecompensa(recompensa)
        }
        

    },7.5)


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
            if(keyDown && player.className == "player running"){
                player.classList.add("jump");
                saltando = true;
                setTimeout(function(){ saltando = false}, 1000);
            }
            else if(saltando == false){
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
                endGame = true;
                document.querySelector(".divCoins").style.display ="none"
                document.querySelector(".points").innerHTML = "Has perdido... Puntaje: " + puntos;
                document.querySelector(".points").style.display ="block"
                document.querySelector(".coin").style.display ="none"
                document.querySelector(".enemigo").style.display ="none"
                window.clearInterval(intervalTime)
                document.querySelector(".time").style.display ="none"
                clearInterval(intervalEnemigos)
                clearInterval(intervalRecompensa)
            }
            else{
                endGame = true;
                document.querySelector(".divCoins").style.display ="none"
                document.querySelector(".points").innerHTML = "Se termino el tiempo... Puntaje: " + puntos;
                document.querySelector(".points").style.display ="block"
                window.clearInterval(intervalTime)
                clearInterval(intervalEnemigos)
                clearInterval(intervalRecompensa)
                document.querySelector(".coin").style.display ="none"
                document.querySelector(".enemigo").style.display ="none"
                document.querySelector(".time").style.display ="none"
            }
            stop();
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

})


function stop(){

    for(let i=0; i < layers.length; i++) {  //este for recorre todos los divs q tienen layers y los pausa
        
        if(endGame){
            layers[i].classList.remove("playGame");
        }
        layers[i].classList.add("stopLayers");
    }
    player.className = "idle"; 
}


function play(){

    for(let i=0; i < layers.length; i++) {  //este for recorre todos los divs q tienen layers y los pausa
        layers[i].classList.remove("stopLayers");
        layers[i].classList.add("playGame");
    }
}

