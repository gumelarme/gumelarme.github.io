console.log("ASCEE-Wheel imported!")
let slotIndex = 0;
let isSpinning = false;
const _options = [
    "GARUDA",
    "MERDEKA",
    "ERANGEL",
    "SOMETHING",
    "SOMEGROUP",
    "SOMEONE",
]
let _wheel = initWheel(_options);


function resetWheel(){
    _wheel = initWheel(_options);
    slotIndex = 0;
    isSpinning = false;
    setResult("-", 1)
    setResult("-", 2)
}

function genWheel(items, colors){
    let counter = 0;
    const segments = items.map(function(item) {
        const result = {
            fillStyle: colors[counter % colors.length],
            text: item + ""
        };
        counter += 1;
        return result;
    })

    // console.table(segments);

    let wheel = new Winwheel({
        canvasId: 'canvas-wheel',
        numSegments: items.length,
        fillStyle: '#00FFFF',
        outerRadius: 200,
        linewidth: 3,
        animation: {
            type: 'spinToStop',
            duration: 2,
            spins: 10,
            callbackFinished: spinCallback,
        },
        pointerAngle: 90,
        pointerGuide: {
            display: true,
            strokeStyle: 'black',
        },
        segments
    });

    return wheel;
}

function startSpin(){
    if(slotIndex % 2 == 0){
        setResult("-", 1)
        setResult("-", 2)
    }

    if(!isSpinning){
        _wheel.wheel.rotationAngle = 0;
        _wheel.wheel.startAnimation();
        isSpinning = true;
    }
}

function initWheel(options){
    const colors = ["#FF0000", "#00FF00", "#0000FF"];
    // const options = [1, 2, 3, 4, 5, 6]
    return {
        wheel: genWheel(options, colors),
        colors,
        options
    }
}

function spinCallback(chosen){
    const index = (slotIndex % 2) + 1;
    setResult(chosen.text, index);
    _wheel.wheel.stopAnimation(false);
    _wheel.wheel.draw();
    slotIndex += 1;
    isSpinning = false;
    removeItemfromWheel(chosen.text)
}

function removeItemfromWheel(item){
    _wheel.options = _wheel.options.filter(i => i != item);
    _wheel.wheel = genWheel(_wheel.options, _wheel.colors)
}

function setResult(text, index){
    const query = `#slot${index}>div`;
    let el = document.querySelector(query);
    el.innerHTML = text;
}
