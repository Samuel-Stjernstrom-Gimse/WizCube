"use strict";
let speed = 40;
const maxFactor = 40;
const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
const factor = document.getElementById('input-1');
const button = document.getElementById('button');
const calContainer = document.querySelector('.cal-container');
const cube = document.querySelector('.cube');
const buttonRax = document.getElementById('rax');
const buttonRay = document.getElementById('ray');
const speedUp = document.getElementById('speedUp');
const speedDown = document.getElementById('speedDown');
button.addEventListener('click', () => {
    if (factor.valueAsNumber > maxFactor) {
        factor.valueAsNumber = 0;
    }
    const square = factor.valueAsNumber * factor.valueAsNumber;
    renderCube(square, Math.sqrt(square), factor.valueAsNumber);
});
const renderCube = (xYZ, columnsRows, factorX) => {
    calContainer.innerHTML = ' ';
    cube.innerHTML = ' ';
    factor.value = '';
    const img = document.createElement('img');
    const calculation = document.createElement('h4');
    factorX ? (calculation.innerText = ` ${factorX} x ${factorX} x ${factorX} = ${xYZ * factorX}`) : error(calculation);
    img.src = 'img/cube-svgrepo-com%20(3).svg';
    img.id = 'logo';
    calContainer.appendChild(calculation);
    calContainer.appendChild(img);
    for (let sideNumber = 0; sideNumber < sides.length; sideNumber++) {
        const cubeSides = document.createElement('div');
        cubeSides.className = `side ${sides[sideNumber]}`;
        cubeSides.style.gridTemplateColumns = `repeat(${columnsRows}, 1fr)`;
        cubeSides.style.gridTemplateRows = `repeat(${columnsRows}, 1fr)`;
        cubeSides.id = `sides${sideNumber}`;
        cube.appendChild(cubeSides);
        for (let x = 0; x < xYZ; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile${x}-${sideNumber}`;
            tile.style.cssText = `--index: ${x}`;
            cubeSides.appendChild(tile);
        }
    }
};
const colorPicker = document.querySelector('.color-picker');
const defaultColors = ['#ff00fc', '#00fde1', '#002aff', '#ffffff', '#11ffc8'];
for (let i = 1; i <= 5; i++) {
    let cssColor = `--color-${i}`;
    let color = document.createElement('input');
    color.type = 'color';
    color.id = `color${i}`;
    color.className = 'color-pickers';
    color.value = defaultColors[i - 1];
    colorPicker.appendChild(color);
    color.addEventListener('input', () => {
        document.documentElement.style.setProperty(cssColor, color.value);
    });
}
speedUp.addEventListener('click', () => {
    speed += 40;
    xText = xAxisTrue ? `${speed}turn` : '0';
    yText = yAxisTrue ? '0' : `${speed}turn`;
    updateKeyframes();
});
speedDown.addEventListener('click', () => {
    speed -= 40;
    xText = xAxisTrue ? `${speed}turn` : '0';
    yText = yAxisTrue ? '0' : `${speed}turn`;
    updateKeyframes();
});
buttonRax.addEventListener('click', () => {
    xAxisTrue = !xAxisTrue;
    xText = xAxisTrue ? `${speed}turn` : '0';
    updateKeyframes();
});
buttonRay.addEventListener('click', () => {
    yAxisTrue = !yAxisTrue;
    yText = yAxisTrue ? '0' : `${speed}turn`;
    updateKeyframes();
});
let xAxisTrue = false;
let yAxisTrue = false;
let xText = '-20deg';
let yText = `${speed}turn`;
const updateKeyframes = () => {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(`
        @keyframes cube-rotation {
            from { transform: rotateX(-20deg) rotateY(-45deg); }
            to { transform: rotateX(${xText}) rotateY(${yText}); }
        }
    `, 0);
};
const error = (errorText) => {
    errorText.innerText = `ERROR only numbers 1-${maxFactor}`;
    errorText.style.color = 'rgb(255,5,5)';
};
updateKeyframes();
renderCube(1, 1, 1);
//# sourceMappingURL=script.js.map