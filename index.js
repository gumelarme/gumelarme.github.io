console.log("ASCEE-Wheel imported!")
let slotIndex = 0;
let isSpinning = false;
let _wheel = initWheel();

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
    // if (slotIndex > 2){
    //     _wheel = initWheel();
    //     slotIndex = 0;
    // }

    console.log('Clicked!')
    if(!isSpinning){
        _wheel.wheel.rotationAngle = 0;
        _wheel.wheel.startAnimation();
        isSpinning = true;
    }
}

function initWheel(){
    const colors = ["#FF0000", "#00FF00", "#0000FF"];
    const options = [1, 2, 3, 4, 5, 6]
    return {
        wheel: genWheel(options, colors),
        colors,
        options
    }
}

function spinCallback(chosen){
    setResult(chosen.text);
    _wheel.wheel.stopAnimation(false);
    _wheel.wheel.draw();
    slotIndex += 1;
    isSpinning = false;
    removeItemfromWheel(chosen.text)
}

function removeItemfromWheel(item){
    _wheel.options = _wheel.options.filter(i => i != item);
    // console.log(nOption, item)
    _wheel.wheel = genWheel(_wheel.options, _wheel.colors)
}


function setResult(text){
    const index = (slotIndex % 2) + 1;
    let el = document.getElementById("slot"+index);
    el.innerHTML = text;
}
