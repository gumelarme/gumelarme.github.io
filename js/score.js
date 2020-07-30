console.log("score.js loaded!");
const scoreWrapper = document.querySelector("#score-wrapper");
let _scoreBoard = document.querySelector(".score-board");
let buffer = []
let _isEdit = false;

let contestant = [
    { name: "AGUNG", score: 0 },
    { name: "HERCULES", score: 0 },
    { name: "A. HERCULES", score: 0 },
    { name: "AGUNG H.", score: 0 },
]



contestant.forEach(function (item, index) {
    let sc = _scoreBoard.cloneNode(true);
    sc.classList.remove("hidden");
    sc.querySelector(".sub-btn").addEventListener('click', subScore);
    sc.querySelector(".add-btn").addEventListener('click', addScore);
    sc.querySelector(".score-name > span").innerHTML = `${item.name}`;
    sc.querySelector(".score-count > span").innerHTML = item.score;
    scoreWrapper.appendChild(sc);
})


function subScore(ev){
    changeScore(ev.target, "sub");
}

function addScore(ev){
    changeScore(ev.target, "add");
}


function changeScore(target, operation){
    const parent = target.parentNode;
    const display = parent.querySelector(".score-count>span");
    let score = parseInt(display.innerHTML.trim());
    score += getScore(operation);
    display.innerHTML= score;
}

function getScore(which){
    let numStr = "";
    console.log(`${which}-input`)
    numStr = document.getElementById(`${which}-input`).value;
    const result = parseInt(numStr);
    return which === "add" ? result : -result;
}

function resetScore(){
    const scores = document.getElementsByClassName("score-board");
    Array.from(scores) .forEach(function(node) {
        node.querySelector(".score-count>span").innerHTML = 0;
    })
}

function btnEdit_Click(){
    if(_isEdit){
        setScore();
    }else{
        editScore();
    }
}


function setScore(){
    // const score = Array.from(scoreWrapper.querySelectorAll('.score-count>input'));
    // buffer = score.map((v) => parseInt(v.value.trim()));
    contestant = Array.from(scoreWrapper.querySelectorAll('.score-board')).map(function(e) {
        const name = e.querySelector(".score-name>input").value.trim();
        const score = parseInt(e.querySelector(".score-count>input").value);
        return {name, score};
    })

    toggleEdit();
}


function editScore(){
    // const score = Array.from(scoreWrapper.querySelectorAll('.score-count>span'));
    // buffer = score.map((v) => parseInt(v.innerHTML.trim()));
    contestant = Array.from(scoreWrapper.querySelectorAll('.score-board')).map(function(e) {
        const name = e.querySelector(".score-name > span").innerHTML.trim();
        const score = parseInt(e.querySelector(".score-count > span").innerHTML.trim());
        return {name, score};
    })
    toggleEdit();
}


function toggleEdit(){
    Array.from(scoreWrapper.querySelectorAll('.score-board')).forEach(function(x, i) {
        const span = x.querySelector(".score-count > span");
        const inputScore = x.querySelector(".score-count > input");

        const header = x.querySelector(".score-name > span");
        const inputName = x.querySelector(".score-name > input");

        if(_isEdit){
            header.classList.remove("hidden");
            inputName.classList.add("hidden");

            inputScore.classList.add("hidden");
            span.classList.remove("hidden");

            header.innerHTML = contestant[i].name;
            span.innerHTML = contestant[i].score;

        }else{
            header.classList.add("hidden");
            inputName.classList.remove("hidden");

            span.classList.add("hidden");
            inputScore.classList.remove("hidden");

            inputName.value = contestant[i].name;
            inputScore.value = contestant[i].score;
        }
    });

    Array.from(scoreWrapper.querySelectorAll('button')).forEach(function(btn) {
        console.log("disabling button")
        if(_isEdit){
            // btn.classList.remove("hidden");
            btn.disabled = false;
        }else{
            // btn.classList.add("hidden");
            btn.disabled =true;
        }
    });


    document.getElementById('reset-btn').disabled = !_isEdit;
    const btn = document.getElementById("edit-btn");
    btn.innerText = _isEdit ? "Edit" : "Set";
    _isEdit = !_isEdit;
}
