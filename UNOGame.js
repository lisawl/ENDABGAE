var amountOfCards = 5;
var colors = [
    "red",
    "green",
    "yellow",
    "blue",
];
var gameState;
(function (gameState) {
    gameState[gameState["PlayersDraw"] = 0] = "PlayersDraw";
    gameState[gameState["ComputersDraw"] = 1] = "ComputersDraw";
    gameState[gameState["Won"] = 2] = "Won";
    gameState[gameState["Lost"] = 3] = "Lost";
})(gameState || (gameState = {}));
var Card = /** @class */ (function () {
    function Card(value, color) {
        this.value = value;
        this.color = color;
    }
    return Card;
}());
var cardStack = /** @class */ (function () {
    function cardStack() {
        this.myStack = new Array();
        this.fillStack();
        this.shuffleCards();
    }
    cardStack.prototype.fillStack = function () {
        var nCard;
        for (var i = 0; i < colors.length; i++) {
            for (var cardValue = 1; cardValue <= 9; cardValue++) {
                nCard = new Card(cardValue.toString(), colors[i]);
                this.myStack.push(nCard);
            }
        }
    };
    cardStack.prototype.shuffleCards = function () {
        var rand, tmp;
        for (var i = 0; i < this.myStack.length; i++) {
            rand = Math.floor(Math.random() * this.myStack.length);
            tmp = this.myStack[i];
            this.myStack[i] = this.myStack[rand];
            this.myStack[rand] = tmp;
        }
    };
    cardStack.prototype.getCard = function () {
        return this.myStack.pop();
    };
    return cardStack;
}());
var cardPile = /** @class */ (function () {
    function cardPile(card) {
        this.myPile = new Array();
        this.myPile.push(card);
    }
    cardPile.prototype.getTopCard = function () {
        var l = this.myPile.length - 1;
        return new Card(this.myPile[l].value, this.myPile[l].color);
    };
    cardPile.prototype.addCard = function (newCard) {
        this.myPile.push(newCard);
    };
    cardPile.prototype.checkTurn = function (card) {
        var topCard = this.getTopCard();
        if (topCard.color == card.color || topCard.value == card.value) {
            return (true);
        }
        else {
            return (false);
        }
    };
    return cardPile;
}());
var player = /** @class */ (function () {
    function player(name) {
        this.name = name;
        this.hand = new Array();
    }
    player.prototype.addCard = function (newCard) {
        this.hand.push(newCard);
    };
    player.prototype.removeCard = function (card) {
        console.log(this.hand);
        console.log(card);
        for (var i = 0; i < this.hand.length; i++) {
            console.log(this.hand[i]);
            if (this.hand[i].value == card.value && this.hand[i].color == card.color) {
                console.log("found");
                this.hand.splice(i, 1);
            }
        }
        console.log(this.hand);
    };
    player.prototype.getName = function () {
        return this.name;
    };
    return player;
}());
function giveOutCards(players, stack) {
    //console.log(stack);
    for (var i = 1; i <= amountOfCards; i++) {
        for (var j = 0; j < players.length; j++) {
            players[j].addCard(stack.getCard());
        }
    }
}
function printPlayerStack(player) {
    var html = "";
    var card;
    for (var i = 0; i < player.hand.length; i++) {
        card = player.hand[i];
        html += "<td><button onClick=\"cardClicked('" + card.color + "', '" + card.value + "')\" type=\"" + card.color + "\">" + card.value + "</button></td>";
    }
    document.getElementById("playerstack").innerHTML = html;
}
function printComputerStack(player) {
    var html = "";
    var card;
    for (var i = 0; i < player.hand.length; i++) {
        card = player.hand[i];
        html += "<td><button type='backside'>X</button></td>";
    }
    document.getElementById("computerstack").innerHTML = html;
}
function printPile(pile) {
    var card = pile.myPile[pile.myPile.length - 1];
    var html = "<button type='" + card.color + "'>" + card.value + "</button>";
    document.getElementById("pile_card").innerHTML = html;
}
function printStack(stack) {
    var html = "<button onClick='takeCard()' type='backside'>X</button>";
    if (stack.myStack.length > 0) {
        document.getElementById("stack").innerHTML = html;
    }
    else {
        document.getElementById("stack").innerHTML = "";
    }
}
/* Button Functions */
function cardClicked(color, value) {
    //if (state == gameState.PlayersDraw) {
    //alert("Click! "+color+" "+value);
    var clCard = new Card(value, color);
    if (pile.checkTurn(clCard)) {
        user.removeCard(clCard);
        pile.addCard(clCard);
        state = gameState.ComputersDraw;
        printPlayerStack(user);
        printPile(pile);
    }
    else {
        alert("You cant place this card");
    }
    //} else {
    //	alert("It's not your turn!");
    //}
}
function takeCard() {
    user.addCard(stack.getCard());
    printPlayerStack(user);
    state = gameState.ComputersDraw;
}
/* Initialize */
var user = new player("Lisa");
var comp = new player("Computer");
var stack = new cardStack();
var pile = new cardPile(stack.getCard());
giveOutCards([user, comp], stack);
printPlayerStack(user);
printComputerStack(comp);
printPile(pile);
printStack(stack);
var state = gameState.PlayersDraw;
