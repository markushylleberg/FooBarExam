"use strict";

let data;
let json;
let warnings = 0;
let amount;
let testcircledata;
let nyProcent;
let bartenderz;
let bajernr = 0;
let solgteBajer;
let solgteNavn;

document.addEventListener("DOMContentLoaded", loadData);


//  ********************* UPDATÉR ALLE ************************************* //
//  ********************* UPDATÉR ALLE ************************************* //
function loadData(){
data = FooBar.getData();
json = JSON.parse(data);


document.querySelector(".ko_p").innerHTML = json.queue.length;
document.querySelector(".serv_p").innerHTML = json.serving.length;

updateCircles();
updateBartenders();
updateOrders();
}
//  ********************* UPDATÉR ALLE ************************************* //
//  ********************* UPDATÉR ALLE ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* AFSPIL FUNKTIONER ************************************* //
//  ********************* AFSPIL FUNKTIONER ************************************* //
setTimeout(function(){
    soldBeersGraf();
}, 5);

setTimeout(function(){
    barChart();
    circles();
    bartenders();
    loadBeers();
}, 10);

setInterval(loadData, 500);
//  ********************* AFSPIL FUNKTIONER ************************************* //
//  ********************* AFSPIL FUNKTIONER ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* UPDATE:  BARTENDERS ************************************* //
//  ********************* UPDATE:  BARTENDERS ************************************* //
function updateBartenders(){

    for(let i =0; i < json.bartenders.length; i++){
        let detail = json.bartenders[i].statusDetail;

        if(detail == "pourBeer"){
        document.querySelector(".output").children[i].innerHTML = json.bartenders[i].name+"<br>"+json.bartenders[i].status+"<br>"+"Pouring beer";
        document.querySelector(".status_bar").children[i].setAttribute("src", "images/pouring.png");
        }if(detail == "waiting"){
        document.querySelector(".output").children[i].innerHTML = json.bartenders[i].name+"<br>"+json.bartenders[i].status+"<br>"+"Waiting for customers";
        document.querySelector(".status_bar").children[i].setAttribute("src", "images/ready.png");
        }if(detail == "startServing"){
        document.querySelector(".output").children[i].innerHTML = json.bartenders[i].name+"<br>"+json.bartenders[i].status+"<br>"+"Welcoming new customer";
        document.querySelector(".status_bar").children[i].setAttribute("src", "images/welcome.png");
        }if(detail == "receivePayment"){
        document.querySelector(".output").children[i].innerHTML = json.bartenders[i].name+"<br>"+json.bartenders[i].status+"<br>"+"Receiving payment";
        document.querySelector(".status_bar").children[i].setAttribute("src", "images/dolla.png");
        }if(detail == "releaseTap"){
        document.querySelector(".output").children[i].innerHTML = json.bartenders[i].name+"<br>"+json.bartenders[i].status+"<br>"+"Finishing pouring beer";
        document.querySelector(".status_bar").children[i].setAttribute("src", "images/done.png");
        }
        }
}
//  ********************* UPDATE:  BARTENDERS ************************************* //
//  ********************* UPDATE:  BARTENDERS ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* CREATE BARTENDERS ************************************* //
//  ********************* CREATE BARTENDERS ************************************* //
function bartenders(){
    bartenderz = json.bartenders;
    for(let i = 0; i < bartenderz.length; i++) {
        let element = document.createElement("p");
        let bartenderImg = document.createElement("img");

        element.appendChild(document.createTextNode(bartenderz[i].name));
        element.classList.toggle("testclass_to");
        bartenderImg.classList.toggle("testclass");
        bartenderImg.setAttribute("src", "images/ready.png");

        document.querySelector(".output").appendChild(element);
        document.querySelector(".status_bar").appendChild(bartenderImg);
    }
}
//  ********************* CREATE BARTENDERS ************************************* //
//  ********************* CREATE BARTENDERS ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* OPDATER:  ORDERS ************************************* //
//  ********************* OPDATER:  ORDERS ************************************* //
function updateOrders(){


    for(let i =0; i < json.queue.length+10; i++){
        let array = json.queue[i];
        // let komnuu = Array.from(array.orders);
        // let fjernkomma = document.querySelector("#order_div").children[i].textContent;
        // let nyArray = fjernkomma.split(",");
        // let nynyArray = nyArray.join("\n");
        // let nynynyArray = nynyArray.split("\n");


        document.querySelector("#order_div").children[i].innerHTML = "";
        document.querySelector("#order_div").children[i].textContent = array.order;
    }
   
}
//  ********************* OPDATER:  ORDERS ************************************* //
//  ********************* OPDATER:  ORDERS ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* CREATE BARCHART (STORAGE) ************************************* //
//  ********************* CREATE BARCHART (STORAGE) ************************************* //
function barChart(){
    let info = json.storage;

    for(let i =0; i < info.length; i++){
        let nyLine = document.createElementNS("http://www.w3.org/2000/svg","line");
        let nyTekst = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let infoLine = info[i].amount * 6.5;
        let infoNavn = info[i].name;

        nyTekst.innerHTML = infoNavn;
        nyLine.classList.toggle("barbox");
        nyTekst.classList.toggle("flyt");
        nyLine.setAttribute("x1", "9.5"*(0.75+i));
        nyLine.setAttribute("y1", "1.1");
        nyLine.setAttribute("x2", "9.5"*(0.75+i));
        nyLine.setAttribute("y2", "66.3");
        nyTekst.setAttribute("x", "1"*(9.5*i));
        nyTekst.setAttribute("y", "70");
        nyLine.style.strokeDashoffset = -65+infoLine;

        document.querySelector("#minSvg").appendChild(nyLine);
        document.querySelector("#minSvg").appendChild(nyTekst);

        if(info[i].amount <= 2){
            nyLine.classList.toggle("alert");
        }
    }
}
//  ********************* CREATE BARCHART (STORAGE) ************************************* //
//  ********************* CREATE BARCHART (STORAGE) ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* OPDATER: CIRKLER  OG  SOLD BEERS ************************************* //
//  ********************* OPDATER: CIRKLER  OG  SOLD BEERS ************************************* //
function updateCircles(){

    for(let i =0; i < json.taps.length; i++){
        testcircledata = (json.taps[i].level/250)*6.3;
        nyProcent = json.taps[i].level/2500*100+"%";
        solgteBajer = 50-(json.taps[i].level/2500)*50;
        solgteNavn = json.taps[i].beer;

    document.querySelector(".testcircle"+[i]).style.strokeDashoffset = 65-testcircledata;
    document.querySelector(".procenter").children[i].innerHTML = nyProcent;
    document.querySelector(".bajerNavne").children[i].innerHTML = solgteNavn;
    document.querySelector(".solgtgraf"+[i]).style.strokeDasharray = 180-solgteBajer;
    }
}
//  ********************* OPDATER: CIRKLER  OG  SOLD BEERS ************************************* //
//  ********************* OPDATER: CIRKLER  OG  SOLD BEERS ************************************* //

// ///////////
// ///////////
// ///////////

//  ********************* CREATE CIRCLES (STORAGE) ************************************* //
//  ********************* CREATE CIRCLES (STORAGE) ************************************* //

function circles(){
    let taps = json.taps;

    for(let i =0; i < taps.length; i++){

        let nyCirkel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let nyCirkelTekst = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let nyProcent = document.createElementNS("http://www.w3.org/2000/svg", "text");

        nyProcent.innerHTML = "100%";
        nyProcent.classList.toggle("procent_beer");
        nyProcent.setAttribute("x", "72.6");
        nyProcent.setAttribute("y", "1"*(i*24));
        nyCirkelTekst.innerHTML = taps[i].beer;
        nyCirkelTekst.classList.toggle("navne_beer");
        nyCirkelTekst.setAttribute("x", "5");
        nyCirkelTekst.setAttribute("y", "1"*(i*24));
        nyCirkel.classList.toggle("testcircle"+i);
        nyCirkel.setAttribute("cx", "75");
        nyCirkel.setAttribute("cy", ("15"*i)*1.6);
        nyCirkel.setAttribute("r", "10");
        nyCirkel.style.strokeDashoffset = 65-testcircledata;

        document.querySelector("#minSvg2").appendChild(nyCirkel);
        document.querySelector("#minSvg2").appendChild(nyCirkelTekst);
        document.querySelector(".procenter").appendChild(nyProcent);
        console.log("hej");
    }
}
//  ********************* CREATE CIRCLES (STORAGE) ************************************* //
//  ********************* CREATE CIRCLES (STORAGE) ************************************* //

// ///////////
// ///////////
// ///////////

// *********************** BEVEAGES ************************** //
// *********************** BEVEAGES ************************** //

function loadBeers(){

    let beer = json.beertypes;

    let template = document.querySelector("#beveages_template");
    let comtainer = document.querySelector("#beveages_container");


    beer.forEach( function(element){

    let label = element.label;
    let klon = template.cloneNode(true).content;

    klon.querySelector(".data-name").textContent = element.name;
    klon.querySelector(".data-category").textContent = element.category;
    klon.querySelector(".data-alc").textContent = element.alc+"%";
    klon.querySelector(".data-img").setAttribute("src", "images/"+label);
    klon.querySelector(".data-info").textContent = element.description.aroma;
    klon.querySelector(".data-appear").textContent = element.description.appearance;
    klon.querySelector(".data-overall").textContent = element.description.overallImpression;



    console.log(label);
    document.querySelector("#beveages_container").appendChild(klon);

    })

    for(let i =0; i < json.beertypes.length; i++){
        let nyClass = document.querySelector("#popVindue").children[i];

        nyClass.classList.toggle("hopop"+i);
        nyClass.style.opacity = "0";
    }
}
// *********************** BEVEAGES ************************** //
// *********************** BEVEAGES ************************** //

// ///////////
// ///////////
// ///////////

// *********************** SOLD BEERS (OVERVIEW) ************************** //
// *********************** SOLD BEERS (OVERVIEW) ************************** //

function soldBeersGraf(){
    let jsontaps = json.taps;

    for(let i =0; i < jsontaps.length; i++){

        // let nyBarDiagram = document.createElementNS("http://www.w3.org/2000/svg","line");
        let nyBarTekst = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let nyBarGraf = document.createElementNS("http://www.w3.org/2000/svg","line");


        nyBarTekst.innerHTML = "";
        nyBarTekst.setAttribute("x", "5.5");
        nyBarTekst.setAttribute("y", "3.7"*(0.88+i));
        nyBarTekst.classList.toggle("bajerclass");

        nyBarGraf.setAttribute("x1", "15");
        nyBarGraf.setAttribute("y1", "3.7"*(0.77+i));
        nyBarGraf.setAttribute("x2", "115");
        nyBarGraf.setAttribute("y2", "3.7"*(0.77+i));
        nyBarGraf.classList.toggle("solgtgraf"+[i]);
        nyBarGraf.style.strokeDasharray = "100";
        nyBarGraf.style.strokeDashoffset = "-180";

        document.querySelector("#minSvg3").children[3].appendChild(nyBarTekst);
        document.querySelector("#minSvg3").appendChild(nyBarGraf);
        console.log("virker det");
    }

}
// *********************** SOLD BEERS (OVERVIEW) ************************** //
// *********************** SOLD BEERS (OVERVIEW) ************************** //

// ///////////
// ///////////
// ///////////

// **************************** GENERAL FUNKTIONALITET **************** //
// **************************** GENERAL FUNKTIONALITET **************** //
// **************************** GENERAL FUNKTIONALITET **************** //

document.querySelector("#navigation").addEventListener("click", showMenu);
document.querySelector("#navigation").addEventListener("click", flyv);



function showMenu(){
    document.querySelector("#navigation").classList.toggle("show");
    document.querySelector(".bar1").classList.toggle("spin");
    document.querySelector(".bar2").classList.toggle("spinn");
}

function flyv(){
    // console.log(event.target.text);
    // console.log(event.target.text)
    if(event.target.text == "OVERVIEW"){
    document.querySelector("#storage").style.marginLeft = "100vw";
    document.querySelector("#beveages").style.marginLeft = "100vw";
    document.querySelector("#overview").style.marginLeft = "10vw";
    } if(event.target.text == "BEVEAGES"){
        document.querySelector("#storage").style.marginLeft = "100vw";
        document.querySelector("#beveages").style.marginLeft = "10vw";
        document.querySelector("#overview").style.marginLeft = "100vw";
    } if(event.target.text == "STORAGE"){
        document.querySelector("#storage").style.marginLeft = "10vw";
        document.querySelector("#beveages").style.marginLeft = "100vw";
        document.querySelector("#overview").style.marginLeft = "100vw";
    }

}

// **************************** GENERAL FUNKTIONALITET **************** //
// **************************** GENERAL FUNKTIONALITET **************** //
// **************************** GENERAL FUNKTIONALITET **************** //