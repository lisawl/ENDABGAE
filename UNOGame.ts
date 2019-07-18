let colors: string[] = [
		"red", 
		"green", 
		"yellow", 
		"blue",
	];

class Card {
	value: string;
	color: string;
	
	constructor(value: string, color:string){
		this.value = value;
		this.color = color;
	}
}

class cardStack {
	myStack: Card[];
	
	constructor(){
		this.myStack = this.fillStack();
	}
	
	fillStack():Card[] {
		let nCard;
		let arr = new Array();
		for(let i=0; i< colors.length; i++){
			console.log("Color: "+ colors[i]);
			for (let cardValue = 1; cardValue <=9; cardValue++){
				nCard = new Card(cardValue.toString(), colors[i]);
				console.log(nCard);
				arr.push(nCard);
			}
		}
		console.log(arr);
		return arr;
	}
}

class player {
	name: string;
	hand: Card[];
	
	constructor(name: string){
		this.name = name;
	}
	
	newHand(){
		
	}
	
	getName(){
		return "Hello"+this.name;
	}
}

var user = new player("Lisa");
var stack = new cardStack();
console.log(document);
document.getElementById("button").innerHTML = user.getName();



