var factor1 = document.getElementById('input-1');
var button = document.getElementById('button');
var sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
var cube = document.querySelector('.cube');
var calContainer = document.querySelector('.cal-container');
button.addEventListener('click', function () {
    var square = factor1.valueAsNumber * factor1.valueAsNumber;
    renderCube(square, Math.sqrt(square), factor1.valueAsNumber);
});
function renderCube(xYZ, columnsRows, calcNumber) {
    calContainer.innerHTML = ' ';
    cube.innerHTML = ' ';
    var img = document.createElement('img');
    var calculation = document.createElement('h4');
    calculation.innerText = " ".concat(calcNumber, " x ").concat(calcNumber, " x ").concat(calcNumber, " = ").concat(xYZ * calcNumber, "  ");
    img.src = "img/cube-svgrepo-com%20(3).svg";
    img.id = 'logo';
    calContainer.appendChild(img);
    calContainer.appendChild(calculation);
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
            tile.id = "tile".concat(x, "-").concat(sideNumber);
            tile.style.cssText = "--index: ".concat(x);
            cubeSides.appendChild(tile);
        }
    }
}
