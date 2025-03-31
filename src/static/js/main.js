document.getElementById("companies-selection").addEventListener("change", (e)=>{
    let cards = document.getElementsByClassName("project-card")
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.remove("hidden")
    }
    if(e.currentTarget.value === ""){
        return;
    } 
    for(let i = 0; i < cards.length; i++){
        if(cards[i].id !== e.currentTarget.value){
            cards[i].classList.add("hidden")
        }
    }
})

