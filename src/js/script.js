let menu = document.getElementsByClassName("menu")[0];
console.log(menu)
function ativar(){
    menu.classList.add('ativo');
    console.log("a")
}
function desativar(){
    menu.classList.remove('ativo');
    console.log("b")
}
