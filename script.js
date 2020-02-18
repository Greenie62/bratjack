//create our card-deck


var values=[2,3,4,5,6,7,8,9,10,11,12,13,14]
var families=['diamonds','spades','hearts','clubs']
var initSpin=360;
var winDiv=document.querySelector(".winDiv")

var cards=[];

families.forEach(family=>{
    values.forEach(value=>{
        let cardValue;
        if(value === 11){
            cardValue="jack"
        }
        else if(value === 12){
            cardValue="queen"
        }
        else if(value === 13){
            cardValue="king"
        }
        else if(value === 14){
            cardValue="ace"
        }
        var card={
            id:cards.length,
            value:cardValue != undefined ? cardValue : value,
            family:family,
            playValue:value
        }
        cards.push(card)
    })
})


//grab the shuffle algo function n shuffle cards

var shuffled=shuffle(cards)


 function shuffle (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};



console.log(shuffled)


var cardCounter=0;
var playersHand=0;
var keptCards=[];
var score=0;



var hitBtn=document.querySelector(".hitBtn")
var holdBtn=document.querySelector(".holdBtn")

hitBtn.onclick=()=>{
if(hitBtn.textContent === "Start"){
    hitBtn.textContent="Hit"
    playerStart(shuffled)
    console.log("Player started")
}
else{
    console.log("Player hits")
playerHit(shuffled)
}
}


holdBtn.onclick=playerHolds





//more or less mirroring functions, probably (very) unnecessary, but for now...
//cuz i want the playerHit function to append card to other dom area.
function playerStart(shuffled){
    document.querySelector(".circle").style.transform=`rotate(${initSpin}deg)`
    var currentCard=shuffled[cardCounter];
    if(currentCard.value === "ace"){
        currentCard.playValue=prompt("Wild card, how do you wanna play this? As a 2 or 13?")
    }
switch(currentCard.family){

    case "diamonds":
    currentCard.family="./assets/diamond.png"
    break;

    case "spades":
    currentCard.family="./assets/spade.jpg"
    break;

    case "hearts":
    currentCard.family="./assets/heart.jpeg"
    break;

    case "clubs":
    currentCard.family="./assets/clubs.jpeg"
    break;
}
document.querySelector("#currentcard").innerHTML=
`<div class='card'>
<div class='top'>
<h4>${currentCard.value}</h4>
<img src=${currentCard.family} class='familyimg'>
</div>
<div class='cardContent'>
<h2>${currentCard.value}</h2>
</div>

<div class='bottom'>

<img src=${currentCard.family} class='familyimg'>
<h4>${currentCard.value}</h4>
</div>

</div>`

cardCounter++
initSpin+=360
playersHand+=parseInt(currentCard.playValue)
document.querySelector("#playershand").innerHTML=playersHand
keptCard={
    family:currentCard.family,
    value:currentCard.value
}
keptCards.push(keptCard)
printKept(keptCards)

}



function playerHit(shuffled){
    document.querySelector(".circle").style.transform=`rotate(${initSpin}deg)`
    var keptCard;
    var currentCard=shuffled[cardCounter];
    console.log(currentCard)
    if(currentCard.value === "ace"){
        currentCard.playValue=prompt("Wildcard! Would you like to play it as a 2 or 13??")
    }
    switch(currentCard.family){
    
        case "diamonds":
        currentCard.family="./assets/diamond.png"
        break;
    
        case "spades":
        currentCard.family="./assets/spade.jpg"
        break;
    
        case "hearts":
        currentCard.family="./assets/heart.jpeg"
        break;
    
        case "clubs":
        currentCard.family="./assets/clubs.jpeg"
        break;
    }
    document.querySelector("#currentcard").innerHTML=
    `<div class='card'>
    <div class='top'>
    <h4>${currentCard.value}</h4>
    <img src=${currentCard.family} class='familyimg'>
    </div>
    <div class='cardContent'>
    <h2>${currentCard.value}</h2>
    </div>
    
    <div class='bottom'>
    
    <img src=${currentCard.family} class='familyimg'>
    <h4>${currentCard.value}</h4>
    </div>
    
    </div>`

    cardCounter++
    initSpin+=360
    playersHand+=parseInt(currentCard.playValue)
    if(playersHand > 21){
        document.querySelector(".output").innerHTML="Player busted. House automatically wins"
        document.querySelector(".keepers").innerHTML=`<button class='startBtn'>Start Over</button>`
        document.querySelector(".holdBtn").style.pointerEvents='none'
        document.querySelector(".hitBtn").style.pointerEvents='none'
        document.querySelector(".startBtn").onclick=startOver
        return;
    }
    document.querySelector("#playershand").innerHTML=playersHand
    keptCard={
        family:currentCard.family,
        value:currentCard.value
    }
    keptCards.push(keptCard)
    printKept(keptCards)

}

function printKept(kept){
    
    document.querySelector(".keepers").innerHTML=""
    kept.forEach(k=>{
        console.log(k)
        var keptDiv=document.createElement("div");
        keptDiv.className='keptDiv'
        var p=document.createElement("p");
        p.appendChild(document.createTextNode(k.value))
        var img=document.createElement("img");
        img.setAttribute('src',k.family)
        img.className='smallimg'
        keptDiv.appendChild(p)
        keptDiv.appendChild(img);
        document.querySelector(".keepers").appendChild(keptDiv)
        
    })
}



function playerHolds(){
    console.log("player holds at " + playersHand)
    var dealer=(Math.random() * 6 | 0) + 15;

    if(dealer === 21 && playersHand === 21){
        console.log("Tie!")
        document.querySelector(".output").innerHTML="Tie!"
    }

    else if(playersHand === 21 && dealer !== 21){
        console.log("player hit blackjack. house stands no chance!")
        score+=200;
        document.querySelector(".output").innerHTML="Brat hit blackjack. house stands no chance!"
    
    }
    else if(dealer > 21 && playersHand < 21){
        console.log("dealer busted. player won!")
        score+=100;
        document.querySelector(".output").innerHTML="Dealer busted. player won!"
    
    }

    else if(playersHand > 21){
        console.log("Player busted. House automatically wins")
        document.querySelector(".output").innerHTML="Player busted. House automatically wins"
    }
    
    else if((21 - dealer) > (21-playersHand)){
        console.log('player was closer to blackjack, you win!')
        winDiv.classList.add('showWin')
        score+=50;
        document.querySelector(".output").innerHTML="Player holds at " + playersHand + " while dealer holds at " + dealer + " .Player wins!"

        setTimeout(()=>{
            console.log("WTF?")
            winDiv.classList.remove('showWin')
        },1500)
        
    }
    else if(playersHand === dealer){
        document.querySelector('.output').innerHTML="Player holds at " + playersHand + " while dealer holds at " + dealer + " .Its a damn tie!"
    }
    else{
        console.log("Player holds at " + playersHand + " while dealer holds at " + dealer + " .Dealer wins!")
        document.querySelector(".output").innerHTML="Player holds at " + playersHand + " while dealer holds at " + dealer + " .Dealer wins!"
    }
    document.querySelector('#score').innerHTML=score;
    document.querySelector(".keepers").innerHTML=`<button class='startBtn'>Start Over</button>`
    document.querySelector(".holdBtn").style.pointerEvents='none'
    document.querySelector(".hitBtn").style.pointerEvents='none'


    document.querySelector(".startBtn").onclick=startOver
}



function resetGame(){
    document.querySelector(".holdBtn").textContent="Replay!"
}



function startOver(){
    console.log('start over fx firing')
    playersHand=0;
    initSpin=360
    document.querySelector("#playershand").innerHTML=playersHand
    currentCard=0;
    shuffled=shuffle(cards)
    keptCards=[];
    document.querySelector(".keepers").innerHTML=""
    document.querySelector(".holdBtn").style.pointerEvents='all'
    document.querySelector(".hitBtn").style.pointerEvents='all'
    document.querySelector(".output").innerHTML=""
}



document.querySelector(".circle").onclick=(e)=>{
   
}