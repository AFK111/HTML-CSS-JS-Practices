
//Get slider items | Array.from[ES6 feature]
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

//Get number of slides
var slidesCount = sliderImages.length;

// Set current slide
var currentSlide = 1;

// Slide number element
var slideNumberElement = document.getElementById('slide-number');

// Previous and next buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

//Handle click on previous and next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;


// Create the ul element
var paginationElement = document.createElement('ul');
// Set id on the ul element
paginationElement.setAttribute("id","pagination-ul");
// Create li based on slidess count
for(var i = 1 ; i<=slidesCount;i++){
    // Create the li
    var paginationItem = document.createElement('li');
    // Set custom attribute on the li element
    paginationItem.setAttribute("data-index",i);
    // Set item content
    paginationItem.appendChild(document.createTextNode(i));
    // Append items to the main ul
    paginationElement.appendChild(paginationItem);
}
// Add the created ul element to the page
document.getElementById("indicators").appendChild(paginationElement);


// Get the new created ul
var paginationUL = document.getElementById("pagination-ul"); 

//Get Pagination items | Array.from[ES6 feature]
var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

//Loop through all bullets items
for(var i = 0 ; i<paginationBullets.length ; i++){
    paginationBullets[i].onclick = function(){
        currentSlide = parseInt(this.getAttribute("data-index"));
        Checker();
    };
}

// Trigger checker funtion
Checker();


/******* Start Functoins********/

// Next Slide Function
function nextSlide(){
    if(currentSlide!=slidesCount){
        currentSlide++;
        Checker();
    }
}
// previous Slide Function
function prevSlide(){
    if(currentSlide!=1){
        currentSlide--;
        Checker();
    }
}
// Checker function
function Checker(){
    // Set slide number
    slideNumberElement.textContent =  currentSlide + "/" +slidesCount;
       
    // Remove all active classes form images and pagination bullets
    removeAllActive();
    // Set active class on current slide
    sliderImages[currentSlide-1].classList.add("active");
    // Set active class on current pagination item
    paginationUL.children[currentSlide-1].classList.add("active");
    
    // Check if current slide is the first
    (currentSlide == 1) ? prevButton.classList.add("disable"): prevButton.classList.remove("disable");
    // Check if current slide is the last
    (currentSlide == slidesCount) ? nextButton.classList.add("disable"): nextButton.classList.remove("disable");

}

// Romove active classes from images and pagination bullets
function removeAllActive(){
    //loop through Images
    sliderImages.forEach(function(img){
        img.classList.remove("active");
    });
    //loop through pagination bullets
    paginationBullets.forEach(function(bullet){
        bullet.classList.remove("active"); 
    });
}

/******* End Functoins********/