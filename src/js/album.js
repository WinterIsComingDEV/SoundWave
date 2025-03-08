const pausar = document.getElementById("pausar")
const progressbar = document.getElementById('progressbar')

const atual = document.getElementById('atual')
const maximo = document.getElementById('duracao')

let musica = new Audio();
let duracao, mudando, musicaPosicao, albumAtual, divAntiga;

//objeto que guarda arrays
const albuns = {
  "persona3" : [
    './src/assets/musicas/persona3/FullMoon.mp3',
    './src/assets/musicas/persona3/coloryournight.mp3',
    './src/assets/musicas/persona3/itsgoingdown.mp3'
  ],
  "ds3": [
    './src/assets/musicas/ds3/PontiffSu.mp3',
    './src/assets/musicas/ds3/TwinP.mp3',
    './src/assets/musicas/ds3/SoC.mp3'
  ],
  "undertale":[
    './src/assets/musicas/undertale/megalovania.mp3',
    './src/assets/musicas/undertale/fallendown.mp3',
    './src/assets/musicas/undertale/ruins.mp3',
  ],
  "hollow": [
   './src/assets/musicas/hollow/dirtmouth.mp3',
   './src/assets/musicas/hollow/greenpath.mp3',
   './src/assets/musicas/hollow/crystalpeak.mp3',

  ],
  "sky": [
    './src/assets/musicas/sky/dovahkiin.mp3',
    './src/assets/musicas/sky/dragonborn.mp3',
    './src/assets/musicas/sky/thestreetofvhiterun.mp3',
  ],
  "tlou": [
    './src/assets/musicas/tlou/allgone(noescape).mp3',
    './src/assets/musicas/tlou/thechoice.mp3',
    './src/assets/musicas/tlou/thelastofus.mp3',
  ],

  "mine": [
    './src/assets/musicas/mine/ariamath.mp3',
    './src/assets/musicas/mine/sweden.mp3',
    './src/assets/musicas/mine/wethands.mp3',
  ],
  "god": [
    './src/assets/musicas/god/godofwar.mp3.mp3',
    './src/assets/musicas/god/peaks pass.mp3',
    './src/assets/musicas/god/Mimir.mp3',
  ],
}


function tocar() {
  if (musica.paused) {
        musica.play();
        pausar.src = "./src/assets/imagens/icone/pause.svg";
  }
  else{
    musica.pause();
    pausar.src = "./src/assets/imagens/icone/play.svg";

  }
}

function trocar(album, posicao, objeto){
  musica.src = albuns[album][posicao]; //Troca a musica
  albumAtual = album; //troca a variavel do album
  musicaPosicao = posicao; //troca a variavel da posicao da musica
  musica.play();

  pausar.src = "./src/assets/imagens/icone/pause.svg"
  let div = objeto.parentElement; // pega o parente do elemento no caso a div
  
  div.style.backgroundColor = "var(--whitegray)"; // troca a cor da div
  if(divAntiga) // ve se a divantiga tem um valor pra poder mudar
  {
    divAntiga.style.backgroundColor = "var(--cinzaplayer)";

  }
  divAntiga = div;
}


function avancar(){
  musica.currentTime += 15 //avanca a musica 15 segundos
}
function retroceder(){
  musica.currentTime -=15 //retrocede a musica 15 segundos
}

//Carrega os metadados da musica para poder calcular a barra de progresso
musica.onloadedmetadata = function() { 
  duracao = musica.duration;

  let minutos = Math.floor(duracao / 60)
  let segundos = Math.floor(duracao % 60).toString().padStart(2, '0');
  
  maximo.textContent = minutos + ":" + segundos;
};


musica.addEventListener("timeupdate", function(){
  if(mudando) return; //aborta se o usuario estiver interagindo com a barra de progresso se nao os dois se conflitam
  let minutos = Math.floor(musica.currentTime / 60);
  let segundos = Math.floor(musica.currentTime % 60).toString().padStart(2, '0'); //padstart preenche a string até ficar o primeiro valor, e preenche com o 2 parametro

    atual.textContent = minutos + ":" + segundos;
  progressbar.value = Math.floor((musica.currentTime * 100) / duracao);
})

//input é toda vez que interage
progressbar.addEventListener("input", function(evento){
  musica.currentTime = (duracao * progressbar.value)/ 100 //altera tempo da musica
  mudando = true;
})
//change é toda vez que solta
progressbar.addEventListener('change', function(evento){
  mudando = false;
})

function proximo(){
  if(musicaPosicao < albuns[albumAtual].length - 1){ //verifica se a posicao da musica n passa do limite (o -1 é pq a array comeca em 0)
    musica.src = albuns[albumAtual][musicaPosicao + 1] //altera a musica
    musica.play(); //faz a musica tocar
    musicaPosicao += 1; //muda a poscição da array

    let div = document.getElementById('musica' + musicaPosicao)
    div.style.backgroundColor = "var(--whitegray)"; // troca a cor da div
    divAntiga.style.backgroundColor = "var(--cinzaplayer)";
    divAntiga = div;


  }
}
function anterior(){
  if(musicaPosicao > 0){
    musica.src = albuns[albumAtual][musicaPosicao - 1] //altera a musica
    musica.play(); //faz a musica tocar
    musicaPosicao -= 1.; //muda a poscição da array

    let div = document.getElementById('musica' + musicaPosicao)
    div.style.backgroundColor = "var(--whitegray)"; // troca a cor da div
    divAntiga.style.backgroundColor = "var(--cinzaplayer)";
    divAntiga = div;
  }
}
musica.addEventListener('ended', function(){ // quando a musica acabar dar play no proximo
  if(musicaPosicao < albuns[albumAtual].length -1){ //verifica se a posicao da musica n passa do limite (o -1 é pq a array comeca em 0)
    musica.src = albuns[albumAtual][musicaPosicao + 1] //altera a musica
    musica.play(); //faz a musica tocar
    musicaPosicao ++; //muda a poscição da array

    let div = document.getElementById('musica' + musicaPosicao) //pega a div da musica
    div.style.backgroundColor = "var(--whitegray)"; // troca a cor da div
    divAntiga.style.backgroundColor = "var(--cinzaplayer)";
    divAntiga = div;
    console.log(musicaPosicao)
  }
})