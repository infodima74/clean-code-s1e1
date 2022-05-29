//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelectorAll(".add-new-task__input")[0];//Add a new task.
var addButton=document.querySelector(".add-new-task__btn");//first button
var incompleteTaskHolder=document.querySelectorAll(".tasks")[0];//ul of #tasks
var completedTasksHolder=document.querySelectorAll(".tasks")[1];//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add('tasks__elem');
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add('tasks__elem__checkbox');
    //label
    var label=document.createElement("label");//label
    label.classList.add('input','task__elem__text');
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.classList.add('input', 'tasks__elem__input');
    //button.edit
    var editButton=document.createElement("btn");//edit button
    editButton.classList.add('btn','tasks__elem__btn-edit');
  

    //button.delete
    var deleteButton=document.createElement("btn");//delete button
    deleteButton.classList.add("btn", "tasks__elem__btn-delete")
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.classList.add("btn-delete__img");

    label.innerText=taskString;
    //label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    //editInput.className="task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    //editButton.className="edit";

    //deleteButton.className="delete";
    //deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".tasks__elem__btn-edit");
    var containsClass=listItem.classList.contains("tasks__elem_edit");
    
    //If class of the parent is ..tasks__item_edit
    if(containsClass){

        //switch to ..tasks__item_edit
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle ..tasks__item_edit on the parent.
    listItem.classList.toggle("tasks__elem_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    listItem.querySelector('.task__elem__text').classList.add("task__elem__text_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #tasks.
    var listItem=this.parentNode;
    listItem.querySelector('.task__elem__text').classList.remove("task__elem__text_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".tasks__elem__checkbox");
    var editButton=taskListItem.querySelector(".tasks__elem__btn-edit");
    var deleteButton=taskListItem.querySelector(".tasks__elem__btn-delete");
   

    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.