const factor: HTMLInputElement = document.getElementById('input-1')as HTMLInputElement
const maxFactor: number = 40
const button: HTMLElement = document.getElementById('button')

const sides: string[] = ['front', 'back', 'right', 'left', 'top', 'bottom']
const cube: Element = document.querySelector('.cube')
const calContainer: Element = document.querySelector('.cal-container')

const buttonRax: HTMLElement = document.getElementById('rax')
const buttonRay: HTMLElement = document.getElementById('ray')

button.addEventListener('click', (): void => {
    if (factor.valueAsNumber > maxFactor) {
        factor.valueAsNumber = 0
    }
    const square: number = factor.valueAsNumber * factor.valueAsNumber
    renderCube(square, Math.sqrt(square), factor.valueAsNumber )
})

const renderCube = (xYZ: number, columnsRows: number, factorX: number):void =>{
    calContainer.innerHTML = ' '
    cube.innerHTML = ' '
    factor.value = ''

    const img: HTMLImageElement = document.createElement('img')
    const calculation: HTMLHeadingElement = document.createElement('h4')

    factorX
        ? calculation.innerText = ` ${factorX} x ${factorX} x ${factorX} = ${xYZ * factorX}`
        : error(calculation) //input control

    img.src ="img/cube-svgrepo-com%20(3).svg"
    img.id = 'logo'

    calContainer.appendChild(calculation)
    calContainer.appendChild(img)

    for (let sideNumber: number = 0; sideNumber < sides.length; sideNumber++) {
        const cubeSides: HTMLDivElement = document.createElement('div')

        cubeSides.className = `side ${sides[sideNumber]}`
        cubeSides.style.gridTemplateColumns = `repeat(${columnsRows}, 1fr)`
        cubeSides.style.gridTemplateRows = `repeat(${columnsRows}, 1fr)`
        cubeSides.id = `sides${sideNumber}`
        cube.appendChild(cubeSides)

        for (let x: number = 0; x < xYZ; x++) {
            const tile: HTMLDivElement = document.createElement('div')

            tile.className = 'tile'
            tile.id = `tile${x}-${sideNumber}`; // ; is required ?
            (tile as HTMLElement).style.cssText = `--index: ${x}`
            cubeSides.appendChild(tile)
        }
    }

}
// cube rotation
let xAxTrue: boolean = false
let yAxTrue: boolean = false

let xText: string = '-20deg'
let yText: string = '1turn'

buttonRax.addEventListener('click', ():void => {
    xAxTrue = !xAxTrue
    xText = xAxTrue ? '1turn' : '-20deg'

    updateKeyframes()
})

buttonRay.addEventListener('click', ():void => {
    yAxTrue = !yAxTrue
    yText = yAxTrue ? '0' : '1turn'

    updateKeyframes()
});

function updateKeyframes() {
    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(`
        @keyframes cube-rotation {
            from { transform: rotateX(-20deg) rotateY(0); }
            to { transform: rotateX(${xText}) rotateY(${yText}); }
        }
    `, 0)
}

updateKeyframes()

renderCube(1,1,1)
//error handler
const error = (errorText: HTMLHeadingElement): void => {
    errorText.innerText = `ERROR only numbers 1-${maxFactor}`
    errorText.style.color = 'rgb(255,5,5)'
}
