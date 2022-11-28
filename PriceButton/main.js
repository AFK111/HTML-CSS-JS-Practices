

let opn = document.getElementById("opn");
let opp = document.getElementById("opp");

opn.onclick=minus;
opp.onclick=plus;




var pos = 0;
var squSpan = document.querySelector(".squ span");
var price = 35;

function plus(){
    var num =parseInt (document.querySelector(".squ span").getAttribute("data-content"));
    num++;
    pos+=25;
    if(num===5){
        num=1;
        pos--;
    }
    if(num==1){
        document.getElementById("opn").classList.add("no-click");
    }else{
        document.getElementById("opn").classList.remove("no-click");
    }
    //create span and append it to the [.squ span]
    var spanElement = document.createElement('span');
    spanElement.setAttribute("class","nextV");
    spanElement.appendChild(document.createTextNode(num));
    squSpan.appendChild(spanElement); 
    document.querySelector(".squ span").setAttribute("data-content" , num)
    document.querySelector(".squ span").style.right=(pos) + "px" ;
    
    //change the price accroding to the number
    document.getElementById("price").innerHTML = "$" + (num*price);
}


function minus(){
    var num =parseInt (document.querySelector(".squ span").getAttribute("data-content"));
    num--;
    pos -= 25;
    if(num==1){
        document.getElementById("opn").classList.add("no-click");
    }else{
        document.getElementById("opn").classList.remove("no-click");
    }
    document.querySelector(".squ span").setAttribute("data-content" , num)
    document.querySelector(".squ span").style.right=(pos) + "px" ;

    //change the price accroding to the number
    document.getElementById("price").innerHTML = "$" + (num*price);

    //delete the current span to avoid frequencies
    setTimeout(() => {
        squSpan.removeChild(squSpan.lastElementChild);    
    }, 700);
}