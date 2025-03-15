const inputColor = document.getElementById('input-color'),
  outputColorInput = document.getElementById('complementy-color'),
  copyColorBtn = document.getElementById('copy-color'),
  savedColors = document.getElementById('saved-colors'),
  saveColorBtn = document.getElementById('save-color-btn');

  let allColorData = localStorage.getItem('colors');

  if( allColorData ){
    refreshColors()
  }
function refreshColors(){
  savedColors.innerHTML = "";
  allColorData = localStorage.getItem('colors');
  allColorData = JSON.parse(allColorData);
  allColorData.forEach((v) => {
    const input = `<input type="color" class="saved-color" value="#${v.inputColorCode}">`;
    savedColors.insertAdjacentHTML('beforeend', input);
  });
}
inputColor.addEventListener("change", watchColorPicker);
let inputColorCode, outputColorCode;
copyColorBtn.addEventListener('click', function () {
  inputColorCode = inputColor.value.split('#')[1];
  navigator.clipboard.writeText(inputColorCode);
  alert("Color Code Copied" + inputColorCode);
});

saveColorBtn.addEventListener('click', function (e) {
  let colorData = localStorage.getItem('colors');
  if (colorData === null) {
    const arr = [];
    arr.push({inputColorCode , outputColorCode});
    localStorage.setItem('colors', JSON.stringify(arr));
  } else {
    colorData = JSON.parse(colorData);
    colorData.push({inputColorCode , outputColorCode});
    localStorage.setItem('colors', JSON.stringify(colorData));
  }
  refreshColors();
});

function watchColorPicker(event) {
  inputColorCode = event.target.value.split('#')[1];
  const inputColor = parseInt(inputColorCode, 16);
  outputColorCode = (parseInt('FFFFFF', 16) ^ inputColor).toString(16);
  outputColorInput.value = `#${outputColorCode}`
  copyColorBtn.style.background = `#${inputColorCode}`;
  copyColorBtn.style.border = `1px solid #${inputColor}`;
  copyColorBtn.style.color = `#${outputColorCode}`;
}