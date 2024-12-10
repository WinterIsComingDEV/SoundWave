const pausar = document.getElementById("pausar")
const progressbar = document.getElementById('progressbar')

const atual = document.getElementById('atual')
const maximo = document.getElementById('duracao')

let musica = new Audio();
let duracao, mudando, musicaPosicao, albumAtual;
//objeto que guarda arrays
const albuns = {
  "persona3" : [
    './src/assets/musicas/persona3/FullMoon.mp3',
    './src/assets/musicas/persona3/coloryournight.mp3',
    './src/assets/musicas/persona3/itsgoingdown.mp3'
  ]
}


function tocar() {
  if (musica.paused) {
        musica.play();
        pausar.src = "./src/assets/imagens/icone/pause.svg"
  }
  else{
    musica.pause();
    pausar.src = "./src/assets/imagens/icone/play.svg"

  }
}

function trocar(album, posicao){
  musica.src = albuns[album][posicao]; //Troca a musica
  albumAtual = album; //troca a variavel do album
  musicaPosicao = posicao; //troca a variavel da posicao da musica
  musica.play();

  pausar.src = "./src/assets/imagens/icone/pause.svg"

}


function avancar(){
  musica.currentTime += 15
}
function retroceder(){
  musica.currentTime -=15
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
  }
}
function anterior(){
  if(musicaPosicao > 0){
    musica.src = albuns[albumAtual][musicaPosicao - 1] //altera a musica
    musica.play(); //faz a musica tocar
    musicaPosicao -= 1.; //muda a poscição da array
  }
}