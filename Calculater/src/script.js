const allButtons = document.getElementsByClassName("btn");
const displayInput = document.getElementById("display-input")
const equalBtn = document.getElementById("equal")
const pEqual = document.getElementById("p-equal")
const clearBtn = document.getElementById("clear")

if (allButtons.length > 0) {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", function (event) {
            const val = event.currentTarget.value;
            if (val !== "=" && val !== "clear") {
                displayInput.value += val;
                pEqual.innerHTML = `= ${eval(displayInput.value)}`;
            }else if (  val === "clear" ){
                displayInput.value = "";
                pEqual.innerHTML = "0";
            }
        });
    }
}

equalBtn.addEventListener("click", function () {
    displayInput.value = eval(displayInput.value);
})