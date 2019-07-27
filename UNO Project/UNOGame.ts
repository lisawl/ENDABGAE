let amountOfCards: number = 5;

let colors: string[] = [
		"rot", 
		"grün", 
		"gelb", 
		"blau",
	];
	
enum gameState {
	PlayersDraw,
	ComputersDraw,
	Won,
	Lost,
}

interface iCard {
	value: string;
	color: string;
}

/* "Stack" Funktion - Ziehstapel*/
let cardStack: iCard[] = [];

function fillStack() {
	let nCard;
	for(let i=0; i< colors.length; i++){
		for (let cardValue = 1; cardValue <=9; cardValue++){
			nCard ={ value: cardValue.toString(), color: colors[i]};
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
	
}


/* "Pile" - Funktion - Ablegestapel*/
let cardPile: iCard[] = [];

function checkTurn(card: iCard):boolean {
	let topCard = cardPile[cardPile.length-1];
	
	if (topCard.color == card.color || topCard.value == card.value){
		return(true);
	} else {
		return(false);
	}
}

function checkGameOver(){
	if(userStack.length == 0){
		state == gameState.Won;
		alert("Du hast gewonnen! :)");
	} else if(compStack.length == 0){
		state == gameState.Lost;
		alert("Du hast verloren :(");
	}
}

function addCard_Pile(card: iCard){
	cardPile.push(card);
}

/*Player/Computer Funktion */

let userStack: iCard[] = [];
let compStack: iCard[] = [];

function removeCard(card: iCard, stack: iCard[]){
	for(let i=0; i<stack.length; i++){
		if (stack[i].value == card.value && stack[i].color == card.color){
			stack.splice(i, 1);
		}
	}
}

function playCard(card: iCard, stack: iCard[]){
	console.log("Spiele eine Karte:");
	console.log(card);
	removeCard(card, stack);
	addCard_Pile(card);
	
	if(stack == userStack){
		state = gameState.ComputersDraw;
	} else {
		state = gameState.PlayersDraw;
	}
	
	checkGameOver();
	
	redrawBoard();
}

function takeCard(stack: iCard[]){
	if (state == gameState.PlayersDraw || state == gameState.ComputersDraw){
		stack.push(cardStack.pop());
		if(state == gameState.PlayersDraw){
			state = gameState.ComputersDraw;
			computersTurn();
		} else {
			state = gameState.PlayersDraw;
		}
		redrawBoard();
	}

}

function computersTurn(){
	if(state == gameState.ComputersDraw){
		console.log("Der Computer ist dran!")
		setTimeout(function() {
			let cardIndex = compCheckCards();
			console.log(cardIndex);
			if (cardIndex == -1){
				compStack.push(cardStack.pop());
				redrawBoard();
				state = gameState.PlayersDraw;
			} else {
				let card = {value: compStack[cardIndex].value, color: compStack[cardIndex].color};
				playCard(card, compStack);
			}
			console.log("Computer hat gespielt!");
		}, 2000)
	}

}

function compCheckCards():number {
	let topCard = cardPile[cardPile.length-1];
	for (let i = 0; i<compStack.length; i++){
		if(compStack[i].color == topCard.color || compStack[i].value == topCard.value){
			console.log(topCard);
			console.log(compStack[i]);
			return i;
		}
	}
	return -1;
}

/* Spiel Funktion*/

function printPlayerStack(){
	let html: string = "";
	let card: iCard;
	for (let i=0; i<userStack.length; i++){
		card = userStack[i];
		html+=`<td><button onClick="cardClicked('${card.color}', '${card.value}')" type="${card.color}">${card.value}</button></td>`;
	}
	document.getElementById("playerstack").innerHTML = html;
}

function printComputerStack(){
	let html: string = "";
	let card: iCard;
	for (let i=0; i<compStack.length; i++){
		card = compStack[i];
		if(state == gameState.Won || state == gameState.Lost){
			html+=`<td><button type="${card.color}">${card.value}</button></td>`;	//Offen
		} else {
			html+="<td><button type='backside'></button></td>"						//Verdeckt
		}
		
		
	}
	document.getElementById("computerstack").innerHTML = html;
}

function printPile(){
	let card: iCard = cardPile[cardPile.length-1];
	//console.log(cardPile[cardPile.length-1])
	let html: string = `<button type='${card.color}'>${card.value}</button>`;
	
	document.getElementById("pile_card").innerHTML = html;
}

function printStack(){
	let html: string = "<button onClick='cardStackClicked()' type='backside'></button>";
	if (cardStack.length > 0) {
		document.getElementById("stack").innerHTML = html;
	} else {
		document.getElementById("stack").innerHTML = "";
	}
}
function redrawBoard(){
	printPlayerStack();
	printComputerStack();
	printPile();
	printStack();
}

/* Button Funktion */
function cardClicked(color: string, value: string){
	if (state == gameState.PlayersDraw) {
		let clCard = {color: color, value: value};
		if(checkTurn(clCard)){
			playCard(clCard, userStack);
			computersTurn();
		} else {
			alert("Du kannst diese Karte nicht legen");
		}
	} else {
		alert("DU bist nicht dran!");
	}
	
}

function cardStackClicked(){
	if(state == gameState.PlayersDraw){
		takeCard(userStack);
	}
}

/* Initialisierung */
fillStack();
shuffleCards();
giveOutCards();
cardPile.push(cardStack.pop());

printPlayerStack();
printComputerStack();
printPile();
printStack();

let state = gameState.PlayersDraw;





