console.log("ASCEE-Wheel imported!")
let slotIndex = 0;
let isSpinning = false;
const reItem = /(.*) - (PRO|CON)/
const _options = [
    "GARUDA",
    "MERDEKA",
    "GROUP 1",
    "GROUP 2",
]

let _wheel = initWheel(_options);


function resetWheel(){
    _wheel = initWheel(_options);
    slotIndex = 0;
    isSpinning = false;
    setResult("-", 1)
    setResult("-", 2)
}

function genWheel(items, colors, procon=0){
    let counter = 0;
    const segments = items.flatMap(function(item) {
        const result = [];
        const createSegment = function(text) {
            const x = {
                fillStyle: colors[counter % colors.length],
                text: `${item} - ${text}`
            }
            counter += 1;
            return x;
        }

        if(procon >= 0){
            result.push(createSegment("PRO"));
        }

        if (procon <= 0){
            result.push(createSegment("CON"));
        }

        return result;
    })

    // console.table(segments);

    let wheel = new Winwheel({
        canvasId: 'canvas-wheel',
        numSegments: procon == 0 ? items.length * 2 : items.length,
        fillStyle: '#00FFFF',
        outerRadius: 300,
        linewidth: 3,
        animation: {
            type: 'spinToStop',
            duration: 2,
            spins: 10,
            callbackFinished: spinCallback,
            // callbackAfter: drawTriangle,
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
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#22FFEE", "#EE22FF", "#FF22EE", "#AA99EE", "#2255CC"];
    return {
        wheel: genWheel(options, colors, 0),
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

    // wait before removing to make it more smooth even without animation
    setTimeout(() => {
        removeItemfromWheel(chosen.text)

        const match = chosen.text.match(reItem);
        const isPro = match[2].trim() == "PRO" ? "CON" : "PRO";
        if(_wheel.options.length == 1){
            setResult(_wheel.options[0] + " - " + isPro, 2)
        }
    }, 500);
}

function removeItemfromWheel(item){
    const match = item.match(reItem);
    const isPro = match[2].trim() == "PRO" ? -1 : 1;
    _wheel.options = _wheel.options.filter(i => i != match[1].trim());
    _wheel.wheel = genWheel(_wheel.options, _wheel.colors,
                            slotIndex % 2 == 0 ? 0 : isPro) //if its the second roll remove the opposite
}

function setResult(text, index){
    const query = `#slot${index}>div`;
    let el = document.querySelector(query);
    el.innerHTML = text;
}

function drawTriangle() {
    // Get the canvas context the wheel uses.
    let ctx = _wheel.wheel.ctx;

    ctx.strokeStyle = 'navy';     // Set line colour.
    ctx.fillStyle   = 'aqua';     // Set fill colour.
    ctx.lineWidth   = 2;
    ctx.beginPath();              // Begin path.
    ctx.moveTo(400, 174);      // Move to initial position.
    ctx.lineTo(400, 226);      // Draw lines to make the shape.
    ctx.lineTo(360, 200);
    ctx.lineTo(400, 175);
    ctx.stroke();              // Complete the path by stroking (draw lines).
    ctx.fill();}
