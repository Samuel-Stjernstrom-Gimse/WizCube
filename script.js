var factor = document.getElementById('input-1');
var maxFactor = 40;
var button = document.getElementById('button');
var sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
var cube = document.querySelector('.cube');
var calContainer = document.querySelector('.cal-container');
var buttonRax = document.getElementById('rax');
var buttonRay = document.getElementById('ray');
button.addEventListener('click', function () {
    if (factor.valueAsNumber > maxFactor) {
        factor.valueAsNumber = 0;
    }
    var square = factor.valueAsNumber * factor.valueAsNumber;
    renderCube(square, Math.sqrt(square), factor.valueAsNumber);
});
var renderCube = function (xYZ, columnsRows, factorX) {
    calContainer.innerHTML = ' ';
    cube.innerHTML = ' ';
    factor.value = '';
    var img = document.createElement('img');
    var calculation = document.createElement('h4');
    factorX
        ? calculation.innerText = " ".concat(factorX, " x ").concat(factorX, " x ").concat(factorX, " = ").concat(xYZ * factorX)
        : error(calculation); //input control
    img.src = "img/cube-svgrepo-com%20(3).svg";
    img.id = 'logo';
    calContainer.appendChild(calculation);
    calContainer.appendChild(img);
    for (var sideNumber = 0; sideNumber < sides.length; sideNumber++) {
        var cubeSides = document.createElement('div');
        cubeSides.className = "side ".concat(sides[sideNumber]);
        cubeSides.style.gridTemplateColumns = "repeat(".concat(columnsRows, ", 1fr)");
        cubeSides.style.gridTemplateRows = "repeat(".concat(columnsRows, ", 1fr)");
        cubeSides.id = "sides".concat(sideNumber);
        cube.appendChild(cubeSides);
        for (var x = 0; x < xYZ; x++) {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = "tile".concat(x, "-").concat(sideNumber); // ; is required ?
            tile.style.cssText = "--index: ".concat(x);
            cubeSides.appendChild(tile);
        }
    }
};
// cube rotation
var xAxTrue = false;
var yAxTrue = false;
var xText = '-20deg';
var yText = '1turn';
buttonRax.addEventListener('click', function () {
    xAxTrue = !xAxTrue;
    xText = xAxTrue ? '1turn' : '-20deg';
    updateKeyframes();
});
buttonRay.addEventListener('click', function () {
    yAxTrue = !yAxTrue;
    yText = yAxTrue ? '0' : '1turn';
    updateKeyframes();
});
function updateKeyframes() {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule("\n        @keyframes cube-rotation {\n            from { transform: rotateX(-20deg) rotateY(0); }\n            to { transform: rotateX(".concat(xText, ") rotateY(").concat(yText, "); }\n        }\n    "), 0);
}
updateKeyframes();
renderCube(1, 1, 1);
//error handler
var error = function (errorText) {
    errorText.innerText = "ERROR only numbers 1-".concat(maxFactor);
    errorText.style.color = 'rgb(255,5,5)';
};
