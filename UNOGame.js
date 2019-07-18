var colors = [
    "red",
    "green",
    "yellow",
    "blue",
];
var Card = /** @class */ (function () {
    function Card(value, color) {
        this.value = value;
        this.color = color;
    }
    return Card;
}());
var cardStack = /** @class */ (function () {
    function cardStack() {
        this.myStack = this.fillStack();
    }
    cardStack.prototype.fillStack = function () {
        var nCard;
        var arr = new Array();
        for (var i = 0; i < colors.length; i++) {
            console.log("Color: " + colors[i]);
            for (var cardValue = 1; cardValue <= 9; cardValue++) {
                nCard = new Card(cardValue.toString(), colors[i]);
                console.log(nCard);
                arr.push(nCard);
            }
        }
        console.log(arr);
        return arr;
    };
    return cardStack;
}());
var player = /** @class */ (function () {
    function player(name) {
        this.name = name;
    }
    player.prototype.newHand = function () {
    };
    player.prototype.getName = function () {
        return "Hello" + this.name;
    };
    return player;
}());
var user = new player("Lisa");
var stack = new cardStack();
console.log(document);
document.getElementById("button").innerHTML = user.getName();
var Dynamically_create_element = /** @class */ (function () {
    function Dynamically_create_element() {
    }
    Dynamically_create_element.prototype.Create_Element = function (htmlelent) {
        var element = document.createElement("input");
        //Assign different attributes to the element.
        element.setAttribute("type", htmlelent);
        element.setAttribute("value", htmlelent);
        element.setAttribute("name", htmlelent);
        element.setAttribute("style", "color:Red");
        document.body.appendChild(element);
    };
    return Dynamically_create_element;
}());
window.onload = function () {
    var button = document.createElement('button');
    button.innerText = "Add";
    button.onclick = function () {
        var doc = document.getElementById('Select1').value;
        var create = new Dynamically_create_element();
        create.Create_Element(doc);
    };
    document.body.appendChild(button);
};
