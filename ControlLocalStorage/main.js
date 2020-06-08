//Select Elements
let allBtnSpans = document.querySelectorAll(".buttons span");
let result = document.querySelector(".result > span");
let theInput = document.getElementById("the-input");

allBtnSpans.forEach(span => {
    span.addEventListener("click" , (e) => {
        if(e.target.classList.contains("check-item")) { if(checkInput()) checkItem(); }   //check item

        if(e.target.classList.contains("add-item"))   { if(checkInput()) addItem(); }       //add item

        if(e.target.classList.contains("delete-item")){ if(checkInput()) deleteItem(); } //delete item

        if(e.target.classList.contains("show-items")) { showItems(); }   //show items

    });
});




/************************ Start Functinos ***********************/ 

//fuction to validate the input
function checkInput(){
    if(theInput.value.trim() == ''){  //trim to remove spaces from the start and end of string and to detect the string with just spaces [no chars]
        result.innerHTML = 'Input cannot be empty';
        return 0;
    }
    return 1;
}   


function checkItem(){
   
    if(localStorage.getItem(theInput.value))
        result.innerHTML = `<span>${theInput.value}</span> is found in local storage`;
    else
        result.innerHTML = `<span>${theInput.value}</span> is NOT found in local storage `;
}


function addItem(){
    localStorage.setItem(theInput.value , "TestValue");
    result.innerHTML = `${theInput.value} <span>is Added</span>`;
    theInput.value = '';
}

function deleteItem(){
   
    if(localStorage.getItem(theInput.value)){
        localStorage.removeItem(theInput.value);
        result.innerHTML = `<span>${theInput.value}</span> is deleted `;
        theInput.value='';
    }
        
    else
        result.innerHTML = `<span>${theInput.value}</span> is NOT found`;

}

function showItems(){
    
    if(localStorage.length){
        console.log(localStorage.length);
        result.innerHTML = '';
        for( let [key,value] of Object.entries(localStorage) ){
            result.innerHTML += `<span class="keys">${key} => ${value}</span>`;
        }
    
    }
    else{
        result.innerHTML = `Local Stoarge is empty`;
    }

}


/************************ End Functinos ***********************/