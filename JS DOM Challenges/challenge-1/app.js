const h1Element = document.getElementsByTagName('h1'),
    pTags = document.getElementsByTagName('p'),
    bulbBase = document.getElementsByClassName('bulb-base'),
    status = document.getElementById('status'),
    bulbElement = document.getElementById('bulb'),
    toggleButton = document.getElementById('toggleButton');
    

    toggleButton.addEventListener('click', (e) => {
        document.body.classList.toggle('dark-mode');
        bulbElement.classList.toggle('off');
        if( document.body.classList.contains('dark-mode') ){
            e.target.innerText = "Turn Off"
            status.innerText = "Status: on"
        }else{
            e.target.innerText = "Turn on"
            status.innerText = "Status: Off"
        }
    });
