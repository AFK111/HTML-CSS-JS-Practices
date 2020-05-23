/*
Tasks : 
[1] go to [Json placeholder website] and use fake api that this site serves[pick one of the apis] . 
*/



//Main variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");


getButton.onclick = function(){ getRepos(); };





/**************** Start functions ************/

//Get repos function
function getRepos(){

    if(theInput.value != ""){ // if theInpute filed contains username
        
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then( (res) => {return res.json();} )
        .then( (repositories) => {

            //empty the show-data div
            reposData.innerHTML="";
            
            //check if there is no repos or the user name isn't exist
            if(repositories.length  == 0)
                reposData.innerHTML = "<span>No repositories</span>";
            

            //loop on repositores 
            repositories.forEach(repo => {
                
                //create the main div element
                let mainDiv = document.createElement("div");
                
                
                
                //create repo name text
                let repoName = document.createTextNode(repo.name);
                //append the text to main div
                mainDiv.appendChild(repoName);


                //create repo URL 
                let theUrl = document.createElement("a");
                //create repo URL text
                let theUrlText = document.createTextNode("visit");
                //append the repo URL text to the repo URL [anchor tag]
                theUrl.appendChild(theUrlText);
                //add the href property
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                //set the targer property
                theUrl.setAttribute("target","_blank");
                //append the url to the main div
                mainDiv.appendChild(theUrl);



                //create stars count span
                let starsSpan = document.createElement("span");
                //create stars count text
                let starsSpanText = document.createTextNode(`Stars ${repo.stargazers_count}`)
                //append stars count text to stars span
                starsSpan.appendChild(starsSpanText);
                //append stars count span to main div
                mainDiv.appendChild(starsSpan);



                //add class on main div
                mainDiv.className = "repo-box";


                //append the main div to show-data container
                reposData.appendChild(mainDiv);
                

            }) ;
        
        
        } );

    }else{   //if value empty
         
        reposData.innerHTML = "<span>Please write github username</span>";
        
     
    
    }

}


/**************** End functions ************/