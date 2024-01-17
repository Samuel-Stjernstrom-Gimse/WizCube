
const factor1 = document.getElementById('input-1')as HTMLInputElement
const button = document.getElementById('button')

const sides: string[] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
const cube = document.querySelector('.cube');
const calContainer = document.querySelector('.cal-container')

button.addEventListener('click', () => {
    let square = factor1.valueAsNumber * factor1.valueAsNumber
    renderCube(square, Math.sqrt(square), factor1.valueAsNumber )
})

function renderCube (xYZ: number, columnsRows: number, calcNumber){
    calContainer.innerHTML = ' '
    cube.innerHTML = ' '

    const img = document.createElement('img')
    const calculation = document.createElement('h4')

    calculation.innerText = ` ${calcNumber} x ${calcNumber} x ${calcNumber} = ${xYZ * calcNumber}  `
    img.src ="img/cube-svgrepo-com%20(3).svg"
    img.id = 'logo'

    calContainer.appendChild(img)
    calContainer.appendChild(calculation)

    for (let sideNumber = 0; sideNumber < sides.length; sideNumber++) {
        const cubeSides = document.createElement('div');

        cubeSides.className = `side ${sides[sideNumber]}`;
        cubeSides.style.gridTemplateColumns = `repeat(${columnsRows}, 1fr)`
        cubeSides.style.gridTemplateRows = `repeat(${columnsRows}, 1fr)`
        cubeSides.id = `sides${sideNumber}`;
        cube.appendChild(cubeSides);

        for (let x = 0; x < xYZ; x++) {
            const tile = document.createElement('div');

            tile.className = 'tile';
            tile.id = `tile${x}-${sideNumber}`;
            (tile as HTMLElement).style.cssText = `--index: ${x}`;
            cubeSides.appendChild(tile);
        }
    }
}




