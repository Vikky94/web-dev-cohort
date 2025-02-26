
const buttons = document.getElementsByClassName("btns"),
mainHeading = document.getElementById("mainHeading");

for(let i=0; i< buttons.length; i++){
    const button = buttons[i];
    button.addEventListener('click',function(e){
        mainHeading.style.color =  `#${e.target.getAttribute('data-color')}`;
    })
}
