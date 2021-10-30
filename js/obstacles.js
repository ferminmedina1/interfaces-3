
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

//verifica si hubo colision entre el div del avatar y el enemigo o el avatar y la recompensa

function hayColision(){
    
    setInterval(function(){
        
        let enemigo = document.querySelector(".enemigo")
        let recompensa = document.querySelector(".coin")
        
        //obtiene posicion del avatar
        positionDivAvatar = player.getBoundingClientRect()
        positionDivAvatar = (positionDivAvatar.top + positionDivAvatar.left + positionDivAvatar.right+ positionDivAvatar.bottom ) /4
        positionDivAvatar = Math.round(positionDivAvatar)
        
        //obtiene posicion del enemigo
        posicionDivEnemigo = enemigo.getBoundingClientRect()
        posicionDivEnemigo = (posicionDivEnemigo.top + posicionDivEnemigo.left + posicionDivEnemigo.right + posicionDivEnemigo.bottom ) /4
        posicionDivEnemigo = Math.round(posicionDivEnemigo)

        //obtiene posicion de la recompensa
        positionDivRecompensa = recompensa.getBoundingClientRect()
        positionDivRecompensa = (positionDivRecompensa.top + (positionDivRecompensa.left -100)+ positionDivRecompensa.right + positionDivRecompensa.bottom ) /4
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


//Contiene un intervalo para mover las recompensas

function intervalreward() {

    intervalRecompensa = setInterval(function(){

        let recompensa = document.querySelector(".coin")

        if(posicionRecompensaActual < 0){
                
            recompensa.remove();
            crearRecompensa()
            velociadRecompensa += 0.1;
            posicionRecompensaActual = background.clientWidth;
        }
        if (positionDivRecompensa == positionDivAvatar){
                
            recompensa.classList.add("agarroMoneda")    //aplica la animacion
            
            setTimeout(function(){
                    
                recompensa.style.display = "none"   //cuando termina la animacion se oculta el div
            },300)
        }
        else{
            moverRecompensa(recompensa) //mueve la recompensa
        }
        
    },7.5)
}


//Contiene un intervalo para mover los enemigos

function intervalEnemies(){
    
    intervalEnemigos = setInterval(function(){  

        let enemigo = document.querySelector(".enemigo")
            
        if(posicionEnemigoActual < 0){  //si la posicion actual llego al inicio de la pantalla
            
            enemigo.remove();   //se elimina el div de enemigo
            crearObstaculo()    //se crea otro enemigo
            
            if(totalDeEnemigos %2 == 0) {   //cada dos enemigos aumenta la velocidad 
                velociadEnemigo += 0.2;
            } 
            posicionEnemigoActual = background.clientWidth; //se resetea la posicion actual
        }

        moverObstaculos(enemigo)    //lama a mover obstaculo

    },5)  
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

        posicionRecompensaActual -= velociadRecompensa;    //reducimos el left en 1.5px
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
