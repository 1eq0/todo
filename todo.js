const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".get-todo-form");
const inputTodo = todoForm.querySelector("input");
const todoCnt = document.querySelector(".todo-count");

const TODO_LS = "toDos"

let toDos = [];
let finDos =[];

function saveList(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
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

function init(){
    showList();
    todoForm.addEventListener("submit",handleSubmit);
    showCnt();
}
init();