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
/*
 *  Stack Functions
 */
var cardStack = [];
function fillStack() {
    var nCard;
    for (var i = 0; i < colors.length; i++) {
        for (var cardValue = 1; cardValue <= 9; cardValue++) {
            nCard = { value: cardValue.toString(), color: colors[i] };
            console.log(nCard);
            cardStack.push(nCard);
        }
    }
}
function shuffleCards() {
    var rand, tmp;
    for (var i = 0; i < cardStack.length; i++) {
        rand = Math.floor(Math.random() * cardStack.length);
        tmp = cardStack[i];
        cardStack[i] = cardStack[rand];
        cardStack[rand] = tmp;
    }
}
function giveOutCards() {
    for (var i = 1; i <= amountOfCards; i++) {
        userStack.push(cardStack.pop());
        compStack.push(cardStack.pop());
    }
    console.log(userStack);
    console.log(compStack);
}
/*
 *  Pile Functions
 */
var cardPile = [];
function checkTurn(card) {
    var topCard = cardPile[cardPile.length - 1];
    if (topCard.color == card.color || topCard.value == card.value) {
        return (true);
    }
    else {
        return (false);
    }
}
/*
 *  Player/Computer Functions
 */
var userStack = [];
var compStack = [];
function removeCard(card, stack) {
    for (var i = 0; i < stack.length; i++) {
        if (stack[i].value == card.value && stack[i].color == card.color) {
            stack.splice(i, 1);
        }
    }
}
/*
 *  Game Functions
 */
function printPlayerStack() {
    var html = "";
    var card;
    for (var i = 0; i < userStack.length; i++) {
        card = userStack[i];
        html += "<td><button onClick=\"cardClicked('" + card.color + "', '" + card.value + "')\" type=\"" + card.color + "\">" + card.value + "</button></td>";
    }
    document.getElementById("playerstack").innerHTML = html;
}
function printComputerStack() {
    var html = "";
    var card;
    for (var i = 0; i < compStack.length - 1; i++) {
        card = compStack[i];
        html += "<td><button type='backside'>X</button></td>";
    }
    document.getElementById("computerstack").innerHTML = html;
}
function printPile() {
    var card = cardPile[cardPile.length - 1];
    console.log(cardPile[cardPile.length - 1]);
    var html = "<button type='" + card.color + "'>" + card.value + "</button>";
    document.getElementById("pile_card").innerHTML = html;
}
function printStack() {
    var html = "<button onClick='takeCard()' type='backside'>X</button>";
    if (cardStack.length > 0) {
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
    var clCard = { color: color, value: value };
    if (checkTurn(clCard)) {
        removeCard(clCard, userStack);
        cardPile.push(clCard);
        state = gameState.ComputersDraw;
        printPlayerStack();
        printPile();
    }
    else {
        alert("You cant place this card");
    }
    //} else {
    //	alert("It's not your turn!");
    //}
}
function takeCard() {
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
var state = gameState.PlayersDraw;
