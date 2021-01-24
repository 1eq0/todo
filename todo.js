const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".get-todo-form");
const inputTodo = todoForm.querySelector("input");
const todoCnt = document.querySelector(".todo-count");

const TODO_LS = "toDos"
const FINDO_LS = "finDos";

let toDos = [];
let finDos =[];

function saveList(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}
function saveFinList(){
    localStorage.setItem(FINDO_LS,JSON.stringify(finDos));
}

function checkTodo(event){
    const target = event.target;
    const li = target.parentNode;
    const text = li.querySelector("span").innerHTML;
    finDoObj={
        text:text,
        id:li.id
    };
    if(target.checked){
        finDos.push(finDoObj);
        showCnt();
    }
    else{
        const cleanFinDos = finDos.filter(function(finDo){
            return Number(finDo.id) !== parseInt(li.id);
        });
        finDos = cleanFinDos;
        showCnt();
    }
    saveFinList();
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    const cleanFinDos = finDos.filter(function(finDo){
        return Number(finDo.id) !== parseInt(li.id);
    });
    finDos = cleanFinDos;
    saveFinList();
    saveList();
    showCnt();
}

function addList(text){
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const newId = toDos.length+1;
    checkbox.type="checkbox";
    checkbox.addEventListener("change",checkTodo);
    span.innerText=text;
    button.innerText="X"
    button.addEventListener("click",deleteToDo);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    li.id = newId;
    todoList.appendChild(li);
    const toDoObj = {
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveList();
    showCnt();
}

function handleSubmit(event){
    event.preventDefault();
    const val = inputTodo.value;
    addList(val);
    inputTodo.value="";
}

function showCnt(){
    todoCnt.innerHTML=`${finDos.length}/${toDos.length}`;
}

function showList(){
    const loadToDos = localStorage.getItem(TODO_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo){
            addList(toDo.text);
        });
    }
}
function showCheck(){
    const loadFinDos = localStorage.getItem(FINDO_LS);
    const li = todoList.querySelectorAll("li");
    if(loadFinDos!==null){
        const parsedFinDos = JSON.parse(loadFinDos);
        parsedFinDos.forEach(function(finDo){
            for(let i = 0; i<li.length;i++){
                if(Number(finDo.id)===Number(li[i].id)){
                    let checkbox = li[i].querySelector("input");
                    checkbox.checked = true;
                    finDoObj={
                        text:li[i].querySelector("span").innerText,
                        id:li[i].id
                    };
                    finDos.push(finDoObj);
                }
            }
        });
    }
}

function init(){
    showList();
    todoForm.addEventListener("submit",handleSubmit);
    showCheck();
    showCnt();
}
init();