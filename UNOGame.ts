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

class Card {
	value: string;
	color: string;
	
	constructor(value: string, color:string){
		this.value = value;
		this.color = color;
	}
}

class cardStack {
	myStack: Card[] = new Array();
	
	constructor(){

		this.fillStack();
		this.shuffleCards();
	}
	
	fillStack() {
		let nCard;
		for(let i=0; i< colors.length; i++){
			for (let cardValue = 1; cardValue <=9; cardValue++){
				nCard = new Card(cardValue.toString(), colors[i]);
				this.myStack.push(nCard);
			}
		}
	}
	
	shuffleCards(){
		let rand, tmp;
		for(let i=0; i<this.myStack.length; i++){
			rand = Math.floor(Math.random()*this.myStack.length);
			tmp = this.myStack[i];
			this.myStack[i]=this.myStack[rand];
			this.myStack[rand]=tmp;
		}
	}
	
	getCard(){
		return this.myStack.pop();
	}
}

class cardPile {
	myPile: Card[] = new Array();
	
	constructor(card: Card){
		this.myPile.push(card);
	}
	
	private getTopCard():Card {
		let l:number = this.myPile.length-1
		return new Card(this.myPile[l].value, this.myPile[l].color);
	}
	
	addCard(newCard: Card){
		this.myPile.push(newCard);
	}
	
	checkTurn(card: Card):boolean {
		let topCard: Card = this.getTopCard();

		if (topCard.color == card.color || topCard.value == card.value){
			return(true)
		} else {
			return(false);
		}
	}
}

class player {
	name: string;
	hand: Card[];
	
	constructor(name: string){
		this.name = name;
		this.hand = new Array();
	}
	
	addCard(newCard: Card){
		this.hand.push(newCard);
	}
	
	removeCard(card: Card){
		console.log(this.hand);
		console.log(card)
		for (let i=0;i<this.hand.length; i++){
			console.log(this.hand[i]);
			
			if(this.hand[i].value == card.value && this.hand[i].color == card.color){
				console.log("found")
				this.hand.splice(i, 1);
			}
		}
		console.log(this.hand);
	}
	
	getName(){
		return this.name;
	}
}



function giveOutCards(players: player[], stack: cardStack){
	//console.log(stack);
	for(let i=1; i<=amountOfCards;i++){
		for (let j=0; j<players.length; j++){
			players[j].addCard(stack.getCard());
		} 
	}
}

function printPlayerStack(player: player){
	let html: string = "";
	let card: Card;
	for (let i=0; i<player.hand.length; i++){
		card = player.hand[i];
		html+=`<td><button onClick="cardClicked('${card.color}', '${card.value}')" type="${card.color}">${card.value}</button></td>`;
	}
	document.getElementById("playerstack").innerHTML = html;
}

function printComputerStack(player: player){
	let html: string = "";
	let card: Card;
	for (let i=0; i<player.hand.length; i++){
		card = player.hand[i];
		html+="<td><button type='backside'>X</button></td>"
	}
	document.getElementById("computerstack").innerHTML = html;
}

function printPile(pile: cardPile){
	let card: Card = pile.myPile[pile.myPile.length-1];
	let html: string = `<button type='${card.color}'>${card.value}</button>`;
	
	document.getElementById("pile_card").innerHTML = html;
}

function printStack(stack: cardStack){
	let html: string = "<button onClick='takeCard()' type='backside'>X</button>";
	if (stack.myStack.length > 0) {
		document.getElementById("stack").innerHTML = html;
	} else {
		document.getElementById("stack").innerHTML = "";
	}
}

/* Button Functions */
function cardClicked(color: string, value: string){
	//if (state == gameState.PlayersDraw) {
		//alert("Click! "+color+" "+value);
		let clCard=new Card(value, color);
		if(pile.checkTurn(clCard)){
			user.removeCard(clCard);
			pile.addCard(clCard);
			state = gameState.ComputersDraw;
			printPlayerStack(user);
			printPile(pile);
		} else {
			alert("You cant place this card");
		}
	//} else {
	//	alert("It's not your turn!");
	//}
	
}

function takeCard(){
	user.addCard(stack.getCard());
	printPlayerStack(user);
	printStack(stack);
	state = gameState.ComputersDraw;
}

/* Initialize */
let user = new player("Lisa");
let comp = new player("Computer");
let stack: cardStack = new cardStack();
let pile: cardPile = new cardPile(stack.getCard());

giveOutCards([user, comp], stack);
printPlayerStack(user);
printComputerStack(comp);
printPile(pile);
printStack(stack);

let state = gameState.PlayersDraw;





