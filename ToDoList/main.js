/*
Tasks : 
[1 Done] Use sweet alert if input is empty  and when task is here and delete tasks.
[2 Done] Check if task Is exist.
[3 Done] Create delete all tasks button
[4 Done] Create finish all tasks button
[5 Done] put alert when click delete all or delete
[6] Add tasks to the local storage
*/

//setting up variables
let theInput = document.querySelector(".add-task textarea") ;
let addBtn = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// when window load
window.onload = function(){
    theInput.focus();

    //the variable that mantains the number of the next Note 
    if( localStorage.getItem("todo_nxtNote") == null )
            localStorage.setItem("todo_nxtNote" , 1);
    
    this.getAllNotesFromLStorage();        
};


//adding new task
addBtn.onclick = function(){
if(theInput.value != ""){  // if textarea not empty
    
    let noTasksMsg = document.querySelector(".no-tasks-message");
    if(document.body.contains(noTasksMsg)){
        noTasksMsg.remove(); //remove no tasks msg
    }

    //ensure that this task is not exist////////////////////////////
    var isExt = isExist(theInput.value);
    if(isExt){
        //show sweet alert that this task here
        return;
    }

    let mainSpan = document.createElement("span");               //create span[task-box] element
    let deleteSpan = document.createElement("span");             //create span[delete] element  
    let doneSpan = document.createElement("span");               //create span[done-undone] element    
    let boxText = document.createTextNode(theInput.value);       //create text to span[task-box]
    
    var todo_nxtNote = parseInt(localStorage.getItem("todo_nxtNote"));   // get the number of the next note
    mainSpan.appendChild(boxText);                               //add text to span[task-box]
    mainSpan.className= "task-box";                              //add class to span[task-box]
    mainSpan.setAttribute("id" , todo_nxtNote);                  // put this number as id to this note
    addNoteToLStorage(theInput.value , todo_nxtNote);            //add the note to the local storage
    
    localStorage.setItem("todo_nxtNote" , ++todo_nxtNote);       // add 1 to the next node variable of the local stoarage

    doneSpan.innerHTML = "&#128078;";                            //add text to span[done-undone]
    doneSpan.className = "done-undone";                           //add class to span[done-undone]
    doneSpan.setAttribute("title" , "finished/unfinished");       //add title attrubte to span[done-undone]


    deleteSpan.innerHTML = "&#10006;";                            //add text to span[delete]
    deleteSpan.className = "delete";                              //add class to span[delete]
    deleteSpan.setAttribute("title" , "delete");                  //add title attrubte to span[delete]

    mainSpan.appendChild(deleteSpan);                             //add span[delete] to span[task-box]
    mainSpan.appendChild(doneSpan);                             //add span[done-undone] to span[task-box]   
    

    tasksContainer.appendChild(mainSpan);                        //add the task to the container

    theInput.value="";                    
    theInput.focus();     
    
    calculateTasks();
}else{
    
    //sweet alert for adding empty input field
    Swal.fire({   
        title: 'Empty Task!',
        text: '',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then( (result) => {
          if(result.value){ /* press yes button */ }
          else if(result.dismiss === Swal.DismissReason.cancel){ /* press no button */ }
          else {/* not press yes or no */ }  
      }) ;
}

};


var remove_add = 1; //remvove : 0 , add : 1   // this variable is to decide to add or remove finished class [finish all]

//when click on any thing in the page , I will check what is that thing and do action according to the clicked thing 
document.addEventListener('click' , function(e){
    
    //Delete Task
    if(e.target.className == 'delete'){
    
        //sweet alert for confirmation to delete a message [yes or no]
        Swal.fire({   
            title: "are you sure ?",
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            
        }).then( (result) => {
            if(result.value){ 
                deleteNoteFromLStorage( e.target.parentElement.getAttribute("id") );
                e.target.parentElement.remove();
                if(tasksContainer.childElementCount == 0)createNoTasksMsg();
                calculateTasks();
                calculateCompletedTasks(); 
                }
            else if(result.dismiss === Swal.DismissReason.cancel){  }
            else {  }  
        });        
    }

    //Finish Task
    if( e.target.classList.contains("done-undone")){

        e.target.parentElement.classList.toggle("finished");
        e.target.innerHTML = e.target.parentElement.classList.contains("finished") ? "&#128077" : "&#128078" ;  
        
        var newStatus = e.target.parentElement.classList.contains("finished") ? 1 : 0;
        changeNoteStatusFromLStorage(e.target.parentElement.getAttribute("id") , newStatus);

        calculateCompletedTasks();
    }

    //Delete All Task
    if(e.target.className == 'delete-all'){

        //if there are no messages then don't delete any thing
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if(document.body.contains(noTasksMsg)){
            return;
        }

        //sweet alert for confirmation to delete all messages [yes or no]
        Swal.fire({   
            title: "Are you sure ?",
            text: " All tasks will be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            
        }).then( (result) => {
            if(result.value){ 
                deleteAllNotesFromLStorage();
                tasksContainer.innerHTML="";
                createNoTasksMsg();
                calculateTasks();
                calculateCompletedTasks();    
            }
            else if(result.dismiss === Swal.DismissReason.cancel){  }
            else {  }  
        });                
       
    }

    
    //Finish All Task
    if(e.target.className == 'finish-all'){
        
         //if there are no messages then don't finish any thing
         let noTasksMsg = document.querySelector(".no-tasks-message");
         if(document.body.contains(noTasksMsg)){
             return;
         }

           
        for(var i =0 ;i<tasksContainer.children.length ;i++){
            
            if(remove_add == 1){ tasksContainer.children[i].classList.add("finished");  }
            else if(remove_add == 0){ tasksContainer.children[i].classList.remove("finished"); }
            //tasksContainer.children[i].classList.toggle("finished");
            tasksContainer.children[i].lastChild.innerHTML = tasksContainer.children[i].classList.contains("finished") ? "&#128077" : "&#128078" ;
        }
        remove_add = !remove_add;

        var newStatus = tasksContainer.children[0].classList.contains("finished") ? 1 : 0;
        changeAllNoteStatusFromLStorage(newStatus);
        calculateCompletedTasks();
    }


});




/*********** Start Functions **********/



// Function to create no tasks msg
function createNoTasksMsg(){

    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("No tasks ... just relax");
    msgSpan.appendChild(msgText);
    msgSpan.className = "no-tasks-message";
    tasksContainer.appendChild(msgSpan);

}


// Function to calculate number of tasks
function calculateTasks(){
    tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
}

// Function to calculate number of completed tasks
function calculateCompletedTasks(){
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}

// Function to check if the new task is exist or not
function isExist(newTask){
    var ch = false;
    for(var i =0 ;i<tasksContainer.children.length ;i++){
        //console.log(tasksContainer.children[i].childNodes[0].textContent + " new " + newTask);
        if(tasksContainer.children[i].childNodes[0].textContent === newTask ) {ch = true; break;}
    }

    if(ch){
         //sweet alert for adding an exist task
        Swal.fire({   
            title: 'Exist Task',
            text: '',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then( (result) => {
            if(result.value){ /* press yes button */ }
            else if(result.dismiss === Swal.DismissReason.cancel){ /* press no button */ }
            else {/* not press yes or no */ }  
        });
    }

    return ch;
}
   

/*********** End Functions **********/





//Start Local Storage ............................................................................................
//function to add note to local storage [edit status array]
function addNoteToLStorage(msg , mid){
    var note = `0,${msg}`;  //status 0:unfinished 1:finished
    localStorage.setItem(mid , note);
}

//function to delete notes from local storage [edit status array]
function deleteNoteFromLStorage(mid){
    localStorage.removeItem(mid);
}
function deleteAllNotesFromLStorage(){
    localStorage.clear();
}
//function to change status of notes 
function changeNoteStatusFromLStorage(mid , status){
    var note = localStorage.getItem(mid).split(",");
    note[0] = status;
    localStorage.setItem(mid , note.join());
}
function changeAllNoteStatusFromLStorage(status){

    for (var i = 1; i < localStorage.length; i++){
        var note = localStorage.getItem(localStorage.key(i)).split(",");
        note[0] = status;
        localStorage.setItem(localStorage.key(i) , note.join());
    }
}

//function to get all notes from local storage when page loaded
function getAllNotesFromLStorage(){

    //remove no task msg if there are tasks
    let noTasksMsg = document.querySelector(".no-tasks-message");
    if( localStorage.length >1){
        noTasksMsg.remove(); //remove no tasks msg
    }

    for (var i = 1; i < localStorage.length; i++){

        //console.log(localStorage.getItem(localStorage.key(i)).split(","));
        
        var note = localStorage.getItem(localStorage.key(i)).split(",");  //note[0] : status  , note[1] : content
        
        
        
        let mainSpan = document.createElement("span");               //create span[task-box] element
        let deleteSpan = document.createElement("span");             //create span[delete] element  
        let doneSpan = document.createElement("span");               //create span[done-undone] element    
        let boxText = document.createTextNode(note[1]);              //create text to span[task-box]
        
        mainSpan.appendChild(boxText);                               //add text to span[task-box]
        mainSpan.className= "task-box";                              //add class to span[task-box]
        mainSpan.setAttribute("id" , localStorage.key(i));           // put this number as id to this note
          
        doneSpan.innerHTML = note[0] == "0" ? "&#128078;" : "&#128077;" ;                            //add text to span[done-undone]
        doneSpan.className = "done-undone";                           //add class to span[done-undone]
        doneSpan.setAttribute("title" , "finished/unfinished");       //add title attrubte to span[done-undone]
        if(note[0] == 1)mainSpan.classList.add("finished");
    
        deleteSpan.innerHTML = "&#10006;";                            //add text to span[delete]
        deleteSpan.className = "delete";                              //add class to span[delete]
        deleteSpan.setAttribute("title" , "delete");                  //add title attrubte to span[delete]
    
        mainSpan.appendChild(deleteSpan);                             //add span[delete] to span[task-box]
        mainSpan.appendChild(doneSpan);                             //add span[done-undone] to span[task-box]   
        
    
        tasksContainer.appendChild(mainSpan);                        //add the task to the container
    
        theInput.value="";                    
        theInput.focus();     
        
        calculateTasks();
        calculateCompletedTasks();

    }

}

//End Local Storage ............................................................................................