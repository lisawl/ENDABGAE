//Konsolenausgabe//
console.log("Hallo");
window.onload = function () {
    document.getElementById("Button").addEventListener("click", ChangeName);
    document.getElementById("id1").addEventListener("click", ChangeClass);
    window.alert("Schon OK geklickt?");
    console.log("Seite geladen");
    newelements();
    //Rechnung, Wertzuwesiung//
    let name = "Name"; //Typ String
    let surname = "Name2";
    let number1 = 1; //Typ Number
    let number2 = 2;
    let number3 = 3;
    number1 = 2; //Neuer Wert zugewiesen
    console.log(number1 + number2);
    number1 = number2 + number3 + number2; //Addiert und neue Wertzwueisung
    console.log(name + number1);
    console.log(name + surname);
    console.log(number1);
};
//Button verändert sich auf Klick//
function ChangeName() {
    document.getElementById("Button").innerHTML = "Hans Günter";
}
//Klasse eines HTML Elements verändert//
function ChangeClass() {
    document.getElementById("id1").className = "Klasse2";
    console.log("Neuer Klassenname: " + document.getElementById("id1").className);
}
//Neue HTML Dateien erstellen//
function newelements() {
    let NeuesDiv = document.createElement("div");
    let NeuerButton = document.createElement("button");
    document.body.appendChild(NeuesDiv);
    NeuesDiv.appendChild(NeuerButton);
    NeuerButton.innerHTML = "Button wurde durch TS erstellt";
    console.log("Neue Button wurder erstellt");
    let ZweiterButton = document.createElement("button");
    NeuesDiv.appendChild(ZweiterButton);
    ZweiterButton.innerHTML = "Ich wurde auch durch TS erstellt";
}
//# sourceMappingURL=script.js.map