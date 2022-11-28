// Select Elements
let theContainer = document.querySelector(".quiz-app");
let countSpan = document.querySelector(".count > span");    // > mean the direct child
let bulletsSpansContainer = document.querySelector(".bullets > .spans-container");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let rightAnswers = 0;
let WrongAnswers = 0;
let currentIndex = 0;  //current question


getQuestions();








/************************** Start Functions *********************************/

//Function to get json file from the server [we will use AJAX here] and but them in the JS object.
function getQuestions(){

    let myRequest = new XMLHttpRequest();
    myRequest.open("GET" , "QuestionsFiles/html_questions.json" , true);
    myRequest.send();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let questionObject = JSON.parse(this.responseText);
            let qCount = questionObject.length;

            //create bullets and set question count
            createBullets(qCount);

            //add questions data
            addQuestionData(questionObject[currentIndex] , qCount);

            //click on submit
             submitButton.onclick = () => {
                
                let theRightAnswer = questionObject[currentIndex].right_answer; //get the right answer
                checkAnswer(theRightAnswer , qCount);                           //edit wrongAnswers and rightAnswers variables
                
                currentIndex++;                                                 //increace Index of the current question to view the next question
                if(currentIndex < qCount){
                    addQuestionData(questionObject[currentIndex] , qCount);              //add the next question
                    bulletsSpansContainer.children[currentIndex].className = "on";       //handling the bullets
                }else{ //show the Result
                   
                    showResults(qCount);
                }
                
                if(currentIndex==qCount-1) submitButton.innerHTML = "Finish"; //to change submit button content at the last questions

            
            };

        }
    };

}


//Function that will create the bullets and put the number of total questions in the countspan 
function createBullets(num){
    countSpan.innerHTML = "1/" + num;

    //create bullet spanas
    for(let i = 0 ; i<num ; i++){
        let theBullet = document.createElement("span");
        if(i==0)theBullet.className = "on"; 
        bulletsSpansContainer.appendChild(theBullet);     
    }
}


//Function to put the next question on screen
function addQuestionData(obj , count){
    
    countSpan.innerHTML = currentIndex+1+ "/" + count;  //to update questions counter

    //empty the question and the choices if they exist
    quizArea.innerHTML='';
    answersArea.innerHTML='';

   //create question title
    let questionTitle = document.createElement("h2");            
    let questionText  = document.createTextNode(obj.title);                                                  
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);


    //create the choices
    for(let i = 1 ; i<=4 ; i++){
        
        //create answer div
        let mainDiv = document.createElement("div");
        mainDiv.className = "answer";

        //create radio input and append it to the answer[main] div
        let radioInput = document.createElement("input");
        radioInput.name = "choices";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.label = obj[`answer_${i}`];
        mainDiv.appendChild(radioInput);
        
        //create label and append it to the answer[main] div
        let theLabel = document.createElement("label");
        theLabel.htmlFor = `answer_${i}`;
        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        theLabel.appendChild(theLabelText);
        mainDiv.appendChild(theLabel);

        //append the answer[main] div to the answers-area div
        answersArea.appendChild(mainDiv);
    }

}


//Function to check the answer if it is true or false
function checkAnswer(rAnswer , count){
  
    let choices = document.getElementsByName("choices");
    let theChoosenAnswer; 

    for(let i = 0 ; i< 4 ; i++){
        if(choices[i].checked)
            theChoosenAnswer = choices[i].dataset.label;  //fill the variable with the content of the choosen radio button
    }


    if(theChoosenAnswer === rAnswer)rightAnswers++;
    else WrongAnswers++;

}

//Function to show result
function showResults(count){
    theContainer.innerHTML = `  <div class="quiz-info">
                                    <div class="category">Category : <span>HTML</span></div>
                                    <div class="count">Questions Counter: <span>${count}/${count}</span> </div>
                                </div>`;
    
    if(rightAnswers == count) //full mark
        theResult = `<div class = "results"><span class="perfect">Perfect :  ${rightAnswers}/${count} </span></div>`;                            
    else if(rightAnswers >= count/2)  //succsess
        theResult = `<div class = "results"><span class="passed">Passed :  ${rightAnswers}/${count} </span></div>`;
    else //fali
    theResult = `<div class = "results"><span class="try-again">Study harder :  ${rightAnswers}/${count} </span></div>`;    
    
    console.log(theResult);
    theContainer.innerHTML += theResult;
}





/************************** End Functions *********************************/