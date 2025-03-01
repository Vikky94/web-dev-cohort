const accordion = document.getElementsByClassName('accordion'),
accordionFirstItem = accordion[0].children[0];
accordionFirstItem.getElementsByClassName('arrow')[0].innerText = "↑"
accordionFirstItem.getElementsByClassName('accordion-content')[0].style.maxHeight = 'None';




const accordionButtons = document.getElementsByClassName('accordion-button');
for(let i = 0; i < accordionButtons.length; i++){
    const accordionButton = accordionButtons[i];
    accordionButton.addEventListener('click',function(e){
        setAccordion(e.target)
    });
}

function setAccordion(currentButtonElement){
    const accordionContents = document.getElementsByClassName('accordion-content'),
            arrows = document.getElementsByClassName('arrow');
    for(let i = 0; i < arrows.length; i++){
        arrows[i].innerText="↓";
    }
    for(let i = 0; i < accordionContents.length; i++){
        accordionContents[i].style.maxHeight = 0;
    }
    
    const parentDiv = currentButtonElement.parentElement,
          accordionItem = parentDiv.children[1];
          accordionItem.style.maxHeight = 'None',
          span = document.createElement('span');

    currentButtonElement.removeChild(currentButtonElement.children[0])
    span.classList.add('arrow');
    span.innerText = "↑";
    currentButtonElement.appendChild(span);      
}