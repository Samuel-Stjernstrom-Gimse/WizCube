const factor: HTMLInputElement = document.getElementById('input-1')as HTMLInputElement
const maxFactor: number = 40
const button: HTMLElement = document.getElementById('button')

const sides: string[] = ['front', 'back', 'right', 'left', 'top', 'bottom']
const cube: Element = document.querySelector('.cube')
const calContainer: Element = document.querySelector('.cal-container')

const buttonRax: HTMLElement = document.getElementById('rax')
const buttonRay: HTMLElement = document.getElementById('ray')

const speedUp: HTMLElement = document.getElementById('speedUp')
const speedDown: HTMLElement = document.getElementById('speedDown')
let speed: number = 40

button.addEventListener('click', (): void => {
    if (factor.valueAsNumber > maxFactor) {
        factor.valueAsNumber = 0
    }
    const square: number = factor.valueAsNumber * factor.valueAsNumber
    renderCube(square, Math.sqrt(square), factor.valueAsNumber )
})

//build, render, inject function
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

// cube rotation color and speed manipulation
const colorPicker: Element = document.querySelector('.color-picker')
for(let i: number = 1; i <= 5; i++) {
    let cssColor: string = `--color-${i}`
    let color: HTMLInputElement = document.createElement('input') as HTMLInputElement

    color.type = 'color'
    color.id = `color${i}`
    color.className = 'color-pickers'

    colorPicker.appendChild(color)
    color.addEventListener('input', (): void => {
        document.documentElement.style.setProperty(cssColor, color.value)
    })
}

speedUp.addEventListener('click',(): void => {
    speed += 40
    xText = xAxisTrue ? `${speed}turn` : '0'
    yText = yAxisTrue ? '0' : `${speed}turn`


    updateKeyframes()
} )
speedDown.addEventListener('click',(): void => {
    speed -= 40
    xText = xAxisTrue ? `${speed}turn` : '0'
    yText = yAxisTrue ? '0' : `${speed}turn`

    updateKeyframes()
} )

buttonRax.addEventListener('click', ():void => {
    xAxisTrue = !xAxisTrue
    xText = xAxisTrue ? `${speed}turn` : '0'

    updateKeyframes()
})

buttonRay.addEventListener('click', ():void => {
    yAxisTrue = !yAxisTrue
    yText = yAxisTrue ? '0' : `${speed}turn`

    updateKeyframes()
});

let xAxisTrue: boolean = false
let yAxisTrue: boolean = false

let xText: string = '-20deg'
let yText: string = `${speed}turn`

function updateKeyframes(): void {
    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(`
        @keyframes cube-rotation {
            from { transform: rotateX(-20deg) rotateY(-45deg); }
            to { transform: rotateX(${xText}) rotateY(${yText}); }
        }
    `,0)
}
//error handler
const error = (errorText: HTMLHeadingElement): void => {
    errorText.innerText = `ERROR only numbers 1-${maxFactor}`
    errorText.style.color = 'rgb(255,5,5)'
}

updateKeyframes()
renderCube(1,1,1)