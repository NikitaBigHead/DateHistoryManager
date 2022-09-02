
date = document.querySelector(".input-data .date")
ev = document.querySelector(".input-data .event")
but  = document.querySelector(".input-data button")
tab = document.querySelector(".tab table")
//exampleEvent = document.querySelector(".cell button")

//localStorage.clear()

//elements = [[exampleEvent.parentNode.parentNode.querySelector(".date").innerHTML],
//exampleEvent.parentNode.parentNode.querySelector(".event").innerHTML]

let elements = []
//let wasAddedSomething = localStorage.getItem('wasAddedSomething')===null?false:true;

if(localStorage.getItem('events')!==null){
    //wasAddedSomething = true
    //if (wasAddedSomething === true){
      //  delete_event(exampleEvent);
    //}
    elements = JSON.parse(localStorage.getItem('events'))
    
    for (index in elements){
        addEventToDiv(index)
    }
}
 
let data = null
function but_logic(){
    //wasAddedSomething = true

    data = [date.value, ev.value]
    elements.push(data)
    localStorage.setItem("events",JSON.stringify(elements))
    addEventToDiv(elements.length - 1);
    date.value = ""
    ev.value = ""
    
    delButtons = document.querySelectorAll(".tab button");
    for (element of delButtons){
        element.addEventListener('click',delete_event);
    }

    window.scrollTo(0,document.body.scrollHeight)
}

function delete_event(e){
    console.log(elements[0])
    let index = e.target.parentNode.parentNode.rowIndex
    elements.splice(index,1)
    localStorage.setItem("events",JSON.stringify(elements))
    e.target.parentNode.parentNode.remove()


}

function addEventToDiv(index){
    tab.innerHTML+=
        `<tr>
        <td>
            <p class = "date">${elements[index][0]}<p>
        </td>
        <td>
            <p class = "event">: ${elements[index][1]}</p>
        </td>
        <td>
            <button >Удалить</button>
        </td>   
    </tr>`
}

but.addEventListener('click',but_logic )

delButtons = document.querySelectorAll(".tab button");
for (element of delButtons){
    element.addEventListener('click',delete_event);
}
