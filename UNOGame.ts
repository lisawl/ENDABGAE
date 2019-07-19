let amountOfCards: number = 5;

let colors: string[] = [
		"red", 
		"green", 
		"yellow", 
		"blue",
	];
	
enum gameState {
	PlayersDraw,
	ComputersDraw,
	Won,
	Lost,
}

interface Card {
	value: string;
	color: string;
}

/*
 *  Stack Functions 
 */
let cardStack: Card[] = [];

function fillStack() {
	let nCard;
	for(let i=0; i< colors.length; i++){
		for (let cardValue = 1; cardValue <=9; cardValue++){
			nCard ={ value: cardValue.toString(), color: colors[i]};
			console.log(nCard)
			cardStack.push(nCard);
		}
	}
}

function shuffleCards(){
	let rand, tmp;
	for(let i=0; i<cardStack.length; i++){
		rand = Math.floor(Math.random()*cardStack.length);
		tmp = cardStack[i];
		cardStack[i]=cardStack[rand];
		cardStack[rand]=tmp;
	}
}

function giveOutCards(){
	for(let i=1; i<=amountOfCards;i++){
		userStack.push(cardStack.pop());
		compStack.push(cardStack.pop());
	}
	console.log(userStack)
	console.log(compStack)
}


/*
 *  Pile Functions 
 */
let cardPile: Card[] = [];

function checkTurn(card: {color: string, value: string}):boolean {
	let topCard = cardPile[cardPile.length-1];
	
	if (topCard.color == card.color || topCard.value == card.value){
		return(true)
	} else {
		return(false);
	}
}

/*
 *  Player/Computer Functions 
 */

let userStack: Card[] = [];
let compStack: Card[] = [];

function removeCard(card: {color: string, value: string}, stack: Card[]){
	for(let i=0; i<stack.length; i++){
		if (stack[i].value == card.value && stack[i].color == card.color){
			stack.splice(i, 1);
		}
	}
}

/*
 *  Game Functions
 */

function printPlayerStack(){
	let html: string = "";
	let card: {color: string, value: string};
	for (let i=0; i<userStack.length; i++){
		card = userStack[i];
		html+=`<td><button onClick="cardClicked('${card.color}', '${card.value}')" type="${card.color}">${card.value}</button></td>`;
	}
	document.getElementById("playerstack").innerHTML = html;
}

function printComputerStack(){
	let html: string = "";
	let card: {color: string, value: string};
	for (let i=0; i<compStack.length-1; i++){
		card = compStack[i];
		html+="<td><button type='backside'>X</button></td>"
	}
	document.getElementById("computerstack").innerHTML = html;
}

function printPile(){
	let card: {color: string, value: string} = cardPile[cardPile.length-1];
	console.log(cardPile[cardPile.length-1])
	let html: string = `<button type='${card.color}'>${card.value}</button>`;
	
	document.getElementById("pile_card").innerHTML = html;
}

function printStack(){
	let html: string = "<button onClick='takeCard()' type='backside'>X</button>";
	if (cardStack.length > 0) {
		document.getElementById("stack").innerHTML = html;
	} else {
		document.getElementById("stack").innerHTML = "";
	}
}

/* Button Functions */
function cardClicked(color: string, value: string){
	//if (state == gameState.PlayersDraw) {
		//alert("Click! "+color+" "+value);
		let clCard = {color: color, value: value};
		if(checkTurn(clCard)){
			removeCard(clCard, userStack);
			cardPile.push(clCard);
			state = gameState.ComputersDraw;
			printPlayerStack();
			printPile();
		} else {
			alert("You cant place this card");
		}
	//} else {
	//	alert("It's not your turn!");
	//}
	
}

function takeCard(){
	userStack.push(cardStack.pop());
	printPlayerStack();
	printStack();
	state = gameState.ComputersDraw;
}

/* Initialize */
fillStack();
shuffleCards();
giveOutCards();
cardPile.push(cardStack.pop());

printPlayerStack();
printComputerStack();
printPile();
printStack();

let state = gameState.PlayersDraw;





