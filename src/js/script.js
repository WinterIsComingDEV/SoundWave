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
function logar(event) {
    event.stopPropagation();  // This will stop the event from bubbling up
    console.log(event.target);  // Logs the element that was clicked (album-link)
}