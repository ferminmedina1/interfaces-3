
let perdio = false;     //para saber si perdio
let posicionEnemigoActual = background.clientWidth
let posicionRecompensaActual = background.clientWidth;      //lo mismo que arriba
let velociadEnemigo = 1.5;   //velociad inicial
let velociadRecompensa = 1.5;
let totalDeEnemigos=0;

crearObstaculo() //creo 1 solo para probar
crearRecompensa() //lo mismo
hayColision();

function hayColision(){
        
    setInterval(function(){
        
       let positionDivAvatar = player.getBoundingClientRect()

        //se obtienen las cuatro posiciones del div y se calcula el punto medio de este
         positionDivAvatar = (positionDivAvatar.top + positionDivAvatar.left + positionDivAvatar.right + positionDivAvatar.bottom ) /4
        positionDivAvatar = Math.round(positionDivAvatar)
        
        let enemigo = document.querySelector(".enemigo")
        let posicionDivEnemigo = enemigo.getBoundingClientRect()
        posicionDivEnemigo = (posicionDivEnemigo.top + posicionDivEnemigo.left + posicionDivEnemigo.right + posicionDivEnemigo.bottom ) /4
        posicionDivEnemigo = Math.round(posicionDivEnemigo)

        let recompensa = document.querySelector(".coin")
        let positionDivRecompensa = recompensa.getBoundingClientRect()
        positionDivRecompensa = positionDivRecompensa.left+250//(positionDivRecompensa.top + positionDivRecompensa.left + positionDivRecompensa.right + positionDivRecompensa.bottom ) /4
        positionDivRecompensa = Math.round(positionDivRecompensa)



        if (posicionDivEnemigo == positionDivAvatar){
            console.log("Choco enemigo")
            perdio = true;
            clearInterval(intervalEnemigos)
            clearInterval(intervalRecompensa)
        }

        if (positionDivRecompensa == positionDivAvatar){
            console.log(positionDivAvatar, positionDivRecompensa)
            console.log("Agarro Moneda")
            music.play();
            puntos++;
            document.querySelector(".coins").innerHTML = puntos;
            document.querySelector(".coin").style.display ="none"
    
        }

   //     objectFuera();
    },0.1)        
    
}


//Este intervalo mueve al enemigo
let intervalEnemigos = setInterval(function(){

    let enemigo = document.querySelector(".enemigo")
    if(posicionEnemigoActual < 0){
        enemigo.remove();
        console.log("hola")
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
        console.log("hola")
        crearRecompensa()
        //velociadRecompensa += 0.2;
        posicionRecompensaActual = background.clientWidth;
    }

    moverRecompensa(recompensa)
    
},7.5)



//se crean las monedas

function crearRecompensa(){

    let valueLeft =(Math.random() * (background.clientWidth - 1700) + 1700);
    let recompensa = document.createElement("div");
    background.appendChild(recompensa);
    recompensa.classList.add("coin");
    recompensa.style.left = valueLeft+"px"; //las pone fuera de la pantalla
   

}


//se mueven las monedas

function moverRecompensa(recompensa) {

    if(posicionRecompensaActual >-100){
        posicionRecompensaActual -= 1.5;
        recompensa.style.left = posicionRecompensaActual+"px";    //lo va corriendo
    }
}


//se crean los obstaculos

function crearObstaculo(){

    let valueLeft = (Math.random() * (background.clientWidth - 1700) + 1700);
    let obstaculo = document.createElement("div");
    background.appendChild(obstaculo);
    obstaculo.classList.add("enemigo");
    obstaculo.style.left = valueLeft+"px";  //los pone fuera de la pantalla
    totalDeEnemigos++;
}


//se mueven los obstaculos

function moverObstaculos(enemigo) {
    
    if(posicionEnemigoActual >-100){
        posicionEnemigoActual -= velociadEnemigo;
        enemigo.style.left = posicionEnemigoActual+"px";    //lo va corriendo
    }
    
}

//por ahora no se usa

function objectFuera(){ //esta funcion se fija si el objeto ya se fue del mapa
    let objects = document.querySelectorAll(".enemigo");
    if(objects != undefined){
        objects.forEach(object => {
            if(object.style.left == "-100px"){
                object.remove();
                console.log("deleteee");
            }
        });
    }
}

