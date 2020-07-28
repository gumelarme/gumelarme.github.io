console.log("Score.js loaded!");


const scoreWrapper = document.querySelector("#score-wrapper");
let _scoreBoard = document.querySelector(".score-board");

const contestant = [
    "AGUNG",
    "HERCULES",
    "A. HERCULES",
    "AGUNG H."
]


contestant.forEach(function (item, index) {
    let sc = _scoreBoard.cloneNode(true);
    sc.classList.remove("hidden");
    sc.querySelector(".sub-btn").addEventListener('click', subScore);
    sc.querySelector(".add-btn").addEventListener('click', addScore);
    sc.querySelector("h3").innerHTML = `${item}`;
    // sc.querySelector(".score-count").id = `score-id-`
    scoreWrapper.appendChild(sc);
})


function subScore(ev){
    const parent = ev.target.parentNode;
    const display = parent.querySelector(".score-count");

    let score = parseInt(display.innerHTML)
    score -= getScore("sub");
    display.innerHTML = "" +  score;
}

function addScore(ev){
    const parent = ev.target.parentNode;
    const display = parent.querySelector(".score-count");

    let score = parseInt(display.innerHTML)
    score += getScore("add");
    display.innerHTML = "" +  score;
    // console.log(`ADD ${ev.target.innerText}`)
}

function getScore(which){
    let numStr = "";
    if(which === "add"){
        numStr = document.getElementById("add-input").value;
    }else if(which === "sub"){
        numStr = document.getElementById("sub-input").value;
    }
    return parseInt(numStr);
}

function resetScore(){
    const scores = document.getElementsByClassName("score-board");
    Array.from(scores) .forEach(function(node) {
        node.querySelector(".score-count").innerHTML = 0;
    })
}
