window.onload= function(){


/* Start start game */
document.querySelector(".control-buttons span").onclick= function(){
    document.querySelector(".control-buttons").remove();
    flipAll();
};

/*  End start game  */

};


/* Start put emojis on the front-face of the card */

var emojis=["&#9996;" , "&#128139" , "&#128152" , "&#128164" ,
     "&#128169" , "&#128168" , "&#128520" , "&#128525" ,"&#128528" ,"&#128536" , "&#128579" ,"&#128701" ,"&#129297" ,"&#129304" ,
        "&#129409" ,"&#129413" , "&#129510" ,"&#129504"];
        emojis = shuffle(emojis);
for(var i= 0 ; i<12;i++){    
    document.getElementsByClassName("front")[i].innerHTML = emojis[i];
}
/* End put emojis on the front-face of the card */

/* Start put images on the back-face of the card */
var imgs=["1.png","2.png","3.png","4.png","5.png","6.png","1.png","2.png",
            "3.png","4.png","5.png","6.png"];
imgs = shuffle(imgs);
for(var i= 0 ; i<12;i++){    
    document.querySelectorAll(".back img")[i].setAttribute("src" , "images/" + imgs[i]);
    document.querySelectorAll(".back img")[i].setAttribute("data-face" , imgs[i][0]);
    document.querySelectorAll(".game-block")[i].setAttribute("data-face" , imgs[i][0]);
}
/* End put images on the back-face of the card */

/* Start start game */
document.querySelector(".winning-screen .replay").onclick= function(){
    location.reload();
};
/*  End start game  */


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let winScreen = document.querySelector(".winning-screen");
blocks.forEach((block,index) => {

    //add Click Event on all blocks
    block.addEventListener("click",function(){ flipBlock(block) });
});

/********************************* Start functions ***********************/
var success = 0;  // track number of matched block until now (when become 6 the game end)
var tries = 0 ;   // track number of wrong tries
//function to shuffle array content
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


//function to flip card(masterFunction)
function flipBlock(selectedBlock){

    selectedBlock.classList.add("is-flipped");

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if(allFlippedBlocks.length === 2){
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
    }
    //when the user wins
    if(success == 6){
        var  tit = document.querySelector(".winning-screen .title");
        if(tries == 1){tit.style.color="orange"; tit.innerHTML="IronMan"}
        else if(tries == 2) {tit.style.color="purple"; tit.innerHTML="SpiderMan"}
        else if(tries == 3) {tit.style.color="blue"; tit.innerHTML="GoodMan"}
        else if(tries == 4) {tit.style.color="lightblue"; tit.innerHTML="Not Bad"}
        else if(tries == 5) {tit.style.color="green"; tit.innerHTML="Ass"}
        else {tit.style.color="grey"; tit.innerHTML="Asshole"}
        winScreen.style.display = "block"; 
    }
}

//function to prevent clicking on cards
function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
         blocksContainer.classList.remove("no-clicking");  
    }, duration);
}


//function to check matched block 
function checkMatchedBlocks(firstBlock , secondBlock){

    let triesElement = document.querySelector(".tries span");
    if(firstBlock.dataset.face === secondBlock.dataset.face ){
       //console.log(firstBlock.dataset.face + ' ' + firstBlock.dataset.face);
        success++;
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        
        var arrsuccess = ["success1" , "success2" , "success3"];
        var ran = success%3; 
        document.getElementById(arrsuccess[ran]).play();
        
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        tries++;
        if(tries == 1) triesElement.style.color="orange";
        else if(tries == 2) triesElement.style.color="purple";
        else if(tries == 3) triesElement.style.color="blue";
        else if(tries == 4) triesElement.style.color="lightblue";
        else if(tries == 5) triesElement.style.color="green";
        else triesElement.style.color="grey";
        

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped"); 

            if(tries%2==0)
                 document.getElementById("fail2").play();
            else
            document.getElementById("fail1").play();
        }, 700);
    }

}


//function to flip card twice when game starts
function flipAll(){
        //flip ale card
        for(var i= 0 ; i<12;i++)document.getElementsByClassName("game-block")[i].classList.add("is-flipped"); 
        setTimeout(() => {
            for(var i= 0 ; i<12;i++)document.getElementsByClassName("game-block")[i].classList.remove("is-flipped"); 
       }, 2000);
}

/********************************* End functions ***********************/