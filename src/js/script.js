let imagens=[
    './src/assets/imagens/banner/persona3.png',
    './src/assets/imagens/banner/undertale.png',
    './src/assets/imagens/banner/ds3.webp',
]

let index =0;
let time =3000;

function slideShow(){
    document.getElementById("banner").src=imagens[index];
    index++;
    if(index == imagens.length){ index =0}
    setTimeout("slideShow()",time)
}

slideShow();
