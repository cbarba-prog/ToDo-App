//Constant for userinput, unordered-list, and form 
const userInput= document.querySelector("input[type='text']");
const ul = document.querySelector("#todoList");
const form = document.querySelector("input[type='submit']");

//localstorage for lists
let currentTasks = [];   
let index = 0;           
if (JSON.parse(localStorage.getItem("savedTask")) !== null){
    currentTasks = JSON.parse(localStorage.getItem("savedTask"));

    let count = currentTasks.length;
    for(let i = 0; i < count; i++){
        let temp = currentTasks.shift(); 
        if(!temp.removedTask){
            createNewTask(temp.taskName, false);
            currentTasks.push(temp);
        }
    }
}

//user text created and shown with remove button
function createNewTask(taskText){
    let li = document.createElement("li");
    let btn = document.createElement("button");

    li.innerText = taskText; 
    userInput.value = '';                  
    btn.innerText = " x ";

    li.dataset.index = index;  
    btn.dataset.index = index; 
    index++;                 

    li.append(btn);
    ul.append(li);
    
    let newTaskObject = {taskName:taskText}
    return newTaskObject;

}
//updates local storage
form.addEventListener("click", function(e){
    e.preventDefault();
    currentTasks.push(createNewTask(userInput.value, false));
    updateLocalStorage();
})

//line-through or remove button
ul.addEventListener("click", function(e){
    const targetTagToLowerCase = e.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "li") {
      e.target.style.textDecoration = "line-through";
    } else if (targetTagToLowerCase === "button") {
      e.target.parentNode.remove();                   
        
        let taskIndex = parseInt(e.target.dataset.index);
        currentTasks[taskIndex].removedTask = true; 
    }
    
    updateLocalStorage();
})

//returns only updated local storage
function updateLocalStorage(){
    localStorage.setItem("savedTask",JSON.stringify(currentTasks));
    return JSON.parse(localStorage.getItem("savedTask"));
}