import { animate, createTimeline   } from 'animejs'

window.addEventListener('resize', function () { 
    "use strict";
    window.location.reload(); 
});

let isMobile = (window.innerWidth < 1000)
if(isMobile){
    document.getElementById("mobile-nav").classList.remove("hidden")
    document.getElementById("desktop").classList.add("hidden")
}

function getChildElementByClass(parentElement, className){

    for (let child of parentElement.children){
        if(child.classList.contains(className)){
            return child;
        }
    }
    return null;
}


document.getElementById("companies-selection").addEventListener("change", (e)=>{
    let cards = document.getElementsByClassName("project-card")
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.remove("hidden")
    }
    if(e.currentTarget.value === ""){
        return;
    } 
    for(let i = 0; i < cards.length; i++){

        console.log(cards[i].id)
        if(cards[i].id !== e.currentTarget.value){
            cards[i].classList.add("hidden")
        }
    }
})

// let expandButtons = Array.from(document.getElementsByClassName("material-symbols-outlined"))
// expandButtons.forEach((i) =>{
    
//     i.addEventListener("click", (e)=>{
//         let card = e.currentTarget.parentElement.parentElement
//         if(card.classList.contains("expand")){
           
//             card.classList.remove("expand")
//             e.currentTarget.innerText = "expand_content"

//             let img = getChildElementByClass(card, "project-image");
//             let vid = getChildElementByClass(card, "video-player");

//             if (img) img.classList.remove("hidden");
//             if (vid) vid.classList.add("hidden");
//         } else {
//             let img = getChildElementByClass(card, "project-image");
//             let vid = getChildElementByClass(card, "video-player");

//             if (img) img.classList.add("hidden");
//             if (vid){
//                 vid.classList.remove("hidden");
//             } else {
//                 img.classList.remove("hidden")
//             }
//             card.classList.add("expand");
//             e.currentTarget.innerText = "collapse_content";
//         }
//     })
// })


let nav = document.getElementsByClassName("mob-nav-burger")
nav[0].addEventListener("click", (e)=>{
    let nav = document.getElementById("navlist")
    nav.classList.toggle("expand-nav-burger")
    nav.classList.toggle("collapse-nav-burger")
})

let outside = false;
let ul = document.getElementById("work-list")
let ulBound = ul.getBoundingClientRect()
let work = document.getElementById("work") 
let workBound = work.getBoundingClientRect()
console.log(workBound)

// const timelineCompanyHeadline = createTimeline({defaults: {duration: 250}})

window.addEventListener('scroll', () => {
    // console.log(ul.getBoundingClientRect())
    let translateXPos = (ulBound.width / 2) + (ulBound.x / 2)
    let height = window.innerHeight;
    const triggerPoint = isMobile ? height * 2.5 : height * 2; 
    const endPoint = workBound.bottom * .825
    if(!isMobile){


        if (window.scrollY > triggerPoint) {
            animate("#company-headline", {
                translateX: -translateXPos,
                translateY: 300,
                rotate: '-90deg',
                duration: 250,
                easing: 'easeOutExpo'
            });
            
        } else if (window.scrollY < triggerPoint) {
            animate("#company-headline", {
                translateX: 0,
                translateY: 0,
                rotate: '0deg',
                duration: 250,
                easing: 'easeOutExpo'
            });
            
        }  
    
        if(window.scrollY > endPoint){
    
            outside = true;
            animate("#company-headline", {
                translateX: -1000,
                opacity: -1,
                // translateY: 0,
                // rotate: '0deg',
                duration: 150,
                easing: 'easeOutExpo'
            });
        } else if(window.scrollY < endPoint && outside){
            outside = false;
            animate("#company-headline", {
                translateX: 0,
                opacity: 1,
                // translateY: 0,
                // rotate: '0deg',
                duration: 250,
                easing: 'easeOutExpo'
            });
        }
    }
  });




