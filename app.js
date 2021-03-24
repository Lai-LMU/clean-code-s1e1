// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
const createNewTaskElement = function(taskString){
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "task";

    //Each elements, needs appending.
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit";
    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};



const addTask = function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.

const editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if(containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    };

    listItem.classList.toggle("edit-mode");
};


const deleteTask = function(){
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
};


const taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function(){
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}


const ajaxRequest = function(){
    console.log("AJAX Request");
};


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++) {
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
};

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++) {
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
};


// Issues with usability don't get seen until they are in front of a human tester