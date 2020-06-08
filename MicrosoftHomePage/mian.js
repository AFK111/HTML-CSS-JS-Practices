
let menuBtn = document.querySelector(".menu-btn");
let mainMenu = document.querySelector(".main-menu");

menuBtn.addEventListener("click" , () =>mainMenu.classList.toggle("show") );


//to make the side menu disappear when press on the any thing of the body except the main menu
document.addEventListener('click' , function(e){
    
    if( mainMenu.classList.contains("show")  &&  e.target.className != 'main-menu show' && e.target.parentElement.className != 'main-menu show'&&
    e.target.parentElement.parentElement.className != 'main-menu show' &&  e.target.className != 'fas fa-bars fa-2x' ){
        mainMenu.classList.toggle("show");
        console.log(e.target.parentElement.className);
    }

});