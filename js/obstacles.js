let obstaculos = [];    //arreglo para guardar los "obstaculos"
let recompensas = [];   //arreglo para guardar las monedas o recompensas
let posicionEnemigo = background.clientWidth;   //punto desde donde se va a crear el enemigo
let posicionCoin = background.clientWidth;      //lo mismo que arriba
let positionAvatar ;     //variable para obtener la posicion del div del avatar
let perdio = false;     //para saber si perdio

//obtengo la posicion del avatar constantemente

crearObstaculo() //creo 1 solo para probar
crearRecompensa() //lo mismo
hayColision();

function hayColision(){
        
    setInterval(function(){
        
        let positionAvatar = player.getBoundingClientRect()
        //se obtienen las cuatro posiciones del div y se calcula el punto medio de este
        positionAvatar = (positionAvatar.right + positionAvatar.left + positionAvatar.top + positionAvatar.bottom) /4 
    
        let enemigo = document.querySelector(".enemigo")
        let positionEnemigo = enemigo.getBoundingClientRect()
        positionEnemigo = (positionEnemigo.top + positionEnemigo.bottom + positionEnemigo.right + positionEnemigo.left) /4 
        
        let coin = document.querySelector(".coin")
        let positionCoin = coin.getBoundingClientRect()
        positionCoin = (positionCoin.top + positionCoin.bottom + positionCoin.right + positionCoin.left) /4 
        
        if (parseInt(positionCoin) == parseInt(positionAvatar)){
            console.log(parseInt(positionAvatar))
            console.log(positionEnemigo)
            console.log(positionCoin)

            console.log("Agarro Moneda")
            music.play();
            puntos++;
            document.querySelector(".points").innerHTML = puntos;
            document.querySelector(".coin").style.display ="none"
    
        }

        if (parseInt(positionEnemigo) == parseInt(positionAvatar)){
            console.log(parseInt(positionAvatar))
            console.log(positionEnemigo)
            console.log(positionCoin)
            console.log("Choco enemigoee")
            perdio = true;
    
        }

        objectFuera();
    },0.1)        
    
}
//Intervalo para poder obtener la posicion del avatar constantemente

    let posicionAvatar = setInterval(function (){
        positionAvatar = player.getBoundingClientRect()
        //se obtienen las cuatro posiciones del div y se calcula el punto medio de este
        positionAvatar = (positionAvatar.right + positionAvatar.left + positionAvatar.top + positionAvatar.bottom) /4 
        positionAvatar = Math.round(positionAvatar)
    
    },1)


//Este intervalo verifica si el personaje choca con el div del enemigo, tambien mueve al enemigo

setInterval(function(){

    let enemigo = document.querySelector(".enemigo")
    let positionEnemigo = enemigo.getBoundingClientRect()
    positionEnemigo = (positionEnemigo.top + positionEnemigo.bottom + positionEnemigo.right + positionEnemigo.left) /4 
    positionEnemigo = Math.round(positionEnemigo)
    
    if (positionEnemigo == positionAvatar){
        console.log("Choco enemigo")
        perdio = true;

    }

    moverObstaculos()

},1)  

//Este intervalo verifica si el personaje choca con el div de la moneda, tambien mueve la moneda

setInterval(function(){

    let coin = document.querySelector(".coin")
    let positionCoin = coin.getBoundingClientRect()
    positionCoin = (positionCoin.top + positionCoin.bottom + positionCoin.right + positionCoin.left) /4 
    positionCoin = Math.round(positionCoin)

    if (positionCoin == positionAvatar){
        
        console.log("Agarro Moneda")
        music.play();
        puntos++;
        document.querySelector(".points").innerHTML = puntos;
        document.querySelector(".coin").style.display ="none"

    }
    moverCoins()
    
},6)



//se crean las monedas

function crearRecompensa(){

    let valueLeft =(Math.random() * (background.clientWidth - 1700) + 1700);
    let recompensa = document.createElement("div");
    background.appendChild(recompensa);
    recompensa.classList.add("coin");
    recompensa.style.left = valueLeft+"px"; //las pone fuera de la pantalla
    recompensas.push(recompensa);

}


//se mueven las monedas

function moverCoins() {

    for (let i = 0; i < recompensas.length; i++) {
        if(posicionCoin >-100){
            posicionCoin--;
            recompensas[i].style.left = posicionCoin+"px";  //va corriendo la moneda
        }
    }
}


//se crean los obstaculos

function crearObstaculo(){

    let valueLeft =(Math.random() * (background.clientWidth - 1700) + 1700);    //es random para que no salgan de la misma posicion
    let obstaculo = document.createElement("div");
    background.appendChild(obstaculo);
    obstaculo.classList.add("enemigo");
    obstaculo.style.left = valueLeft+"px";  //los pone fuera de la pantalla
    obstaculos.push(obstaculo);

}


//se mueven los obstaculos

function moverObstaculos() {

    for (let i = 0; i < obstaculos.length; i++) {
        if(posicionEnemigo >-100){
            posicionEnemigo--;
            obstaculos[i].style.left = posicionEnemigo+"px";    //lo va corriendo
        }
    }
}

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