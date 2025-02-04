
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

//FUNCTIONS

//ADD button function
function addTask() {
    if (inputBox.value === '') {
        alert("Please write a task!");
    } 
    else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = '';
        //creates x element
        let span = document.createElement("span");
        span.innerHTML = " \u00d7";
        span.title = "delete"
        span.style.marginLeft = "10px";
        li.appendChild(span);
        //creates pencil element
        let editSpan = document.createElement("span");
        editSpan.innerHTML = " \u270E";
        editSpan.classList.add("edit-span");
        editSpan.title = "edit";
        editSpan.style.marginLeft = "10px";
        li.appendChild(editSpan);
        
    }
    saveData()
}

//Stores data in browser
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

//Gets data from browser
function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();

//EVENTS

//li and spam function 
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");        
        saveData()
    }
    else if (e.target.tagName === "SPAN") {      
        if (e.target.classList.contains("edit-span")) {

            let li = e.target.parentElement;
            let task = li.firstChild.textContent.trim();
            let editedTask = prompt("Edit your task:", task);

            if (editedTask !== null && editedTask !== "") {
                li.firstChild.textContent = editedTask.trim();
                saveData();
            }
        }
        else {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

//Enables Enter to start addTask()
inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


/*
localStorage.clear();
*/
