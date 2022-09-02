function funcButCont(){
    count++;
    if (count<Questions.length){
        card = set_card(Questions,count);
        next(card,count+1,Questions.length);
    }
    else {
        alert(`было выполненно ${countRight} из ${Questions.length}`);
        setStatistics();
        document.location = "index.html";
    }
}
function sleep(ms) {
    let t = (new Date()).getTime();
    let i = 0;
    while (((new Date()).getTime() - t) < ms){
        i++;
    }
}
function funcButRestart(){
    localStorage.setItem('setting', Number(document.querySelector('.countQuestions').value));
    location.reload();
}
function changer(){
    if (arrRadioBut[0].checked === true){
        localStorage.setItem('setting', events.length);
        document.querySelector('.countQuestions').value = events.length;
        document.querySelector('.countQuestions').setAttribute('disabled','');
        localStorage.setItem("radioBut", 0);
    }
    else if (arrRadioBut[1].checked === true){
        document.querySelector('.countQuestions').removeAttribute('disabled');
        localStorage.setItem("radioBut", 1);
    }
}
async function funcButCheck(){
    getAnswer = true;
    let lenQues = Questions.length;
    if (card.get('date') === InputDate.value )
    {
        countRight++;
        await DrawBorderColor("green");
    }
    else{
        await DrawBorderColor("red");
    }
    //sleep(700);

    count++;
    if (count<lenQues){
        card = set_card(Questions,count);
    }
    else {
        alert(`было выполненно ${countRight} из ${Questions.length}`);
        setStatistics();
        document.location = "index.html";
    }
    InputDate.value  = "";
    setTimeout(next,500,card,count+1,lenQues);
    //next(card,count+1,lenQues);

}
function setStatistics(){
    let arr = (localStorage.getItem("statistics") ===null || localStorage.getItem("statistics") ==='' ) ? []:JSON.parse(localStorage.getItem("statistics"));
    arr.push([countRight,Questions.length]);
    localStorage.setItem("statistics",JSON.stringify(arr));
}
function next(ev,count,lenQues){
    DrawBorderColor('none');
    output_event(ev,count,lenQues);
}
function DrawBorderColor(color){
    if(color === "red"){
        Window.classList.add("red");
    }
    else if (color === "green"){
        Window.classList.add("green");
    }
    else if (color === "none") {
        Window.classList.remove("green");
        Window.classList.remove("red");
    }

}
function output_event(ev,count,lenQues){
    numQuestion.innerHTML = `${count}/${lenQues}`;
    text.innerHTML =`<p>${ev.get("event")}</p>`;
}

function getRandomNum(min,max){
    return Math.floor(Math.random() * (max  - min) + min);
}
function genArr(countQuestions){
    let Questions = [];
    
    let max = events.length;
    if (arrRadioBut[1].checked === true){
        for(let i = 0;i<countQuestions;i++){
            let index = getRandomNum(0,max);
            Questions.push(events[index]);
        }

    }
    else if (arrRadioBut[0].checked === true){
        for(let i = 0;i<countQuestions;i++){
            let index = getRandomNum(0,max);
            let breakVar;
            while (breakVar!= false){
                let index = getRandomNum(0,max);
                breakVar = false;
                for( el of Questions){
                    if ((el[0] === events[index][0])
                        && (el[1] === events[index][1])){
                        breakVar = true;
                        break;
                    } 
                }
                if (breakVar === false){
                    Questions.push(events[index]);
                    events.splice(index,1);
                    max -= 1;
                }
            }
        }
    }
    return Questions;
}


function set_card(Questions,index){
    return new Map([
        ["date",Questions[index][0]],
        ["event",Questions[index][1]]
    ]);
}

function main(){
    Questions = genArr(countQuestions);

    count = 0;
    card = set_card(Questions,count);

    output_event(card,count+1,Questions.length);
    ButCheck.addEventListener('click',funcButCheck);
    ButCont.addEventListener('click',funcButCont);
    butRestart.addEventListener('click', funcButRestart);
    for (let el of arrRadioBut){
        el.addEventListener('click', changer);
    }
}
//document.querySelector(".countQuestions").value = localStorage.getItem("setting");
//console.log(document.querySelector('.countQuestions'));
document.querySelector(".countQuestions").value = (localStorage.getItem("setting") ===null || localStorage.getItem("setting") ==='') ? JSON.parse(localStorage.getItem('events')).length : localStorage.getItem("setting");

let countQuestions = document.querySelector('.countQuestions').value;
let Window = document.querySelector(".all");

let numQuestion = document.querySelector(".countDiv .count");
let text = document.querySelector(".main .text");
let butRestart = document.querySelector(".settings .but");

let InputDate = document.querySelector(".inputArea .date");
let ButCheck = document.querySelector(".inputArea .but.check");
let ButCont = document.querySelector(".inputArea .but.next")


let arrRadioBut = document.querySelectorAll(".radio");
localStorage.getItem("radioBut")!==null? arrRadioBut[localStorage.getItem("radioBut")].setAttribute('checked',''):null;
//let arrRadioBut = document.forms["TheForm"].elements["radio"]

let count;
let countRight = 0;
let Questions;
let card;
let events = JSON.parse(localStorage.getItem("events")); 
main();
