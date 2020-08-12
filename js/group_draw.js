
console.log("Randomizer");
// let teamNames = Array.from(Array(16).keys()).map(x => "Team Name " + x);
const div = document.createElement('div');
let machineIndex = 1;
let index = 0;
let machine = {};
let elements = [];

function populate(teamNames, slot) {
    // console.log(slot);
    while(slot.firstChild){
        slot.firstChild.remove();
    }

    teamNames.map( datum => {
        let x = div.cloneNode();
        x.innerHTML = datum;
        slot.appendChild(x)
    })
}

function dummy(slot){
    let x = div.cloneNode();
    x.innerHTML = "-"
    slot.appendChild(x);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


function createSlot(slot, teamNames){
    populate(teamNames, slot);
    const machine =  new SlotMachine(slot, {active: 0});
    return machine;
}

function init(){
    elements = document.querySelectorAll(`#machine${machineIndex} > .slot`);
    machine = createSlot(elements[index], teamNames)
    Array.from(elements).slice(1, elements.length).forEach( el => {
        dummy(el);
    });
}


init();
function next(active) {
    console.log("removing: ", teamNames[active]);
    teamNames = teamNames.filter(text => text != teamNames[active]);
    if(index >= elements.length-1){
        machineIndex +=1;
        index = 0;
        init();
        console.log(teamNames)
        return;
    }

    index += 1;
    machine = createSlot(elements[index], teamNames);
    // const random = getRandom(1, 20);
    // machine.shuffle(random, next);
}

const btnRun = document.querySelector("#btnRun");
const btnStop = document.querySelector("#btnStop");

btnRun.addEventListener('click', () => {
    machine.shuffle(9999);
});

btnStop.addEventListener('click', () => {
    machine.stop();
    setTimeout(() => {
        next(machine.active);
    }, 500)
});
