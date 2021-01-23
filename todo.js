const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".get-todo-form");
const inputTodo = todoForm.querySelector("input");

const TODO_LS = "todo"


function showList(){
    
}

function saveList(){

}

function addList(text){
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    checkbox.type="checkbox";
    checkbox.addEventListener("")
    span.innerText=text;
    button.innerText="X"
    button.addEventListener("click",handleClick);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
    saveList();
}

function handleSubmit(event){
    event.preventDefault();
    const val = inputTodo.value;
    addList(val);
}

function init(){
    showList();
    todoForm.addEventListener("submit",handleSubmit);
}
init();