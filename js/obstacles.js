
let perdio = false;     //para saber si perdio
let posicionEnemigoActual = background.clientWidth  //se obtiene el ancho de la pantalla
let posicionRecompensaActual = background.clientWidth;
let velociadEnemigo = 1.5;   //velociad inicial del enemigo
let velociadRecompensa = 1.5;   //velociad inicial de la recompensa
let totalDeEnemigos=0;          //contador de enemigos
let positionDivRecompensa;
let posicionDivEnemigo;
let positionDivAvatar;
let interval = 0;

function hayColision(){
    
    setInterval(function(){
        
        let enemigo = document.querySelector(".enemigo")
        let recompensa = document.querySelector(".coin")
        
        //obtiene posicion del avatar
        positionDivAvatar = player.getBoundingClientRect()
        positionDivAvatar = (positionDivAvatar.top + positionDivAvatar.left + (positionDivAvatar.right + 100)+ positionDivAvatar.bottom ) /4
        positionDivAvatar = Math.round(positionDivAvatar)
        
        //obtiene posicion del enemigo
        posicionDivEnemigo = enemigo.getBoundingClientRect()
        posicionDivEnemigo = (posicionDivEnemigo.top + posicionDivEnemigo.left + posicionDivEnemigo.right + posicionDivEnemigo.bottom ) /4
        posicionDivEnemigo = Math.round(posicionDivEnemigo)

        //obtiene posicion de la recompensa
        positionDivRecompensa = recompensa.getBoundingClientRect()
        positionDivRecompensa = (positionDivRecompensa.top + positionDivRecompensa.left + positionDivRecompensa.right + positionDivRecompensa.bottom ) /4
        positionDivRecompensa = Math.round(positionDivRecompensa)


        if (posicionDivEnemigo == positionDivAvatar){   //si se choca el div enemigo con el div del avatar      
            perdio = true;
        }
        
        //si se choca el div recompensa con el div del avatar 
        if (positionDivRecompensa == positionDivAvatar && interval == 0){
           
            puntos++; //se suman los puntos
            interval = 1;
            music.play();        //emite un sonido
            document.querySelector(".coins").innerHTML = puntos;    //se actualizan los puntos en el DOM
            setTimeout(function(){
                interval = 0;
            },1000)
        }

    },1)        
    
}


//se crean las recompensas

function crearRecompensa(){

    let valueLeft = (Math.random() * (background.clientWidth - 1500) + 1500);
    let recompensa = document.createElement("div");
    background.appendChild(recompensa);
    recompensa.classList.add("coin");
    recompensa.style.left = valueLeft+"px"; //les asigna un left

}


//se mueven las recompensas

function moverRecompensa(recompensa) {

    if(posicionRecompensaActual >-100){ //cuando salen de pantalla

        posicionRecompensaActual -= 1.5;    //reducimos el left en 1.5px
        recompensa.style.left = posicionRecompensaActual+"px";    //lo va corriendo
    }
}


//se crean los obstaculos

function crearObstaculo(){

    let valueLeft = (Math.random() * (background.clientWidth - 1500) + 1500);
    let obstaculo = document.createElement("div");
    background.appendChild(obstaculo);
    obstaculo.classList.add("enemigo");
    obstaculo.style.left = valueLeft+"px";  //les asigna un left
    totalDeEnemigos++;
}


//se mueven los obstaculos

function moverObstaculos(enemigo) {
    
    if(posicionEnemigoActual >-100){
        posicionEnemigoActual -= velociadEnemigo; //reducimos el left dinamicamente
        enemigo.style.left = posicionEnemigoActual+"px";   
    }
    
}
