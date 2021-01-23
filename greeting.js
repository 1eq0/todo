const h2 = document.querySelector("h2");
const nameForm = document.querySelector(".get-name-form");
const inputName = nameForm.querySelector("input");

const USER_LS = "userName";

function handleSubmit(event){
    event.preventDefault();
    const val = inputName.value;
    localStorage.setItem("USER_LS",val);
    paintName();
}

function paintName(){
    const storedName = localStorage.getItem("USER_LS");
    if(storedName === null){
        inputName.classList.remove("no-show");
        nameForm.addEventListener("submit",handleSubmit);
    }
    else{
        h2.innerHTML = `Hi ${storedName} :)`;
        inputName.classList.add("no-show");
    }
}

function init(){
    paintName();
}
init();