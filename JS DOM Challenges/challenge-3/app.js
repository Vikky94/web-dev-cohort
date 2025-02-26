const typeFelds = document.getElementsByClassName('ontype');


for (let i = 0; i < typeFelds.length; i++) {
    const textFeild = typeFelds[i];

    textFeild.addEventListener('keyup', (e) => {
        const value = e.target.value,
            targetFieldId = e.target.getAttribute('data-displayType');
        document.getElementById(targetFieldId).innerText = value;
    })
}