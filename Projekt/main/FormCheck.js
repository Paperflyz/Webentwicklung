// JS-Datei für die Formulare von 'support.html' & 'checkout.html'
// Needed: 'General.js'


// Formular aufsetzen -> Event-Listener bei Input-Feldern einfügen

document.getElementsByClassName('form-button')[0].addEventListener('click', checkForm);
for (let aElement of document.body.querySelectorAll('input[type="text"]')) {
    aElement.addEventListener('blur', function() {
        let idParts = event.target.getAttribute('id').split('-');
        checkInput(idParts[0], idParts[1]);
    });
}



// Funktion: Eingabe bei Input-Feld kontrollieren
function checkInput(idArea, idField) {
    // HTML-Elemente identifizieren
    let htmlForm = document.getElementsByTagName('form')[0];
    let confirmButton = document.getElementsByTagName('form')[0].querySelector('input[type="button"]');

    let idInput = idArea + '-' + idField;
    let htmlInput = document.getElementById(idInput);
    let htmlLabel = htmlForm.querySelector('label[for="' + idInput + '"]');
    let htmlSpan = htmlInput.nextElementSibling;
    if (htmlSpan != null && htmlSpan.tagName.toLowerCase() != "span") {
        htmlSpan = null;
    }

    // Input zurücksetzen
    // for (let i of ['empty', 'true', 'false']) {
    //     htmlInput.classList.remove('form-input-' + i);
    // }
    if (htmlSpan != null) {
        htmlSpan.classList.add('ds-none');
    }
    unlockButton(confirmButton);
    
    // Kontrolle der Eingabe
    let inputNeeded = htmlLabel.classList.contains('form-needed-txt');
    let userInput = htmlInput.value;
    let isValid = true;
    let isEmpty = (userInput === "");

    if (isEmpty) {
        isValid = !inputNeeded;
    } else {
        switch (idField) {
            case 'plz':
                isValid = new RegExp("^\\d{5}$").test(userInput);
                break;
            case 'mail':
                isValid = new RegExp("^[^\\s@]+@[^\\s@]+\\.[a-zA-Z]{1,3}$").test(userInput);
                break;
        }
    }

    // Auswertung der Kontrolle (d.h. HTML-Elemente anpassen)
    if (inputNeeded && isValid && !isEmpty) {
        htmlInput.classList.add('form-input-true');
    } else if (inputNeeded && !isValid) {
        htmlInput.classList.add('form-input-false');
        htmlSpan.classList.remove('ds-none');
    }
    return isValid;
}



// 'Absenden'-Button bestätigt -> Alle Eingaben überprüfen
function checkForm() {
    // HTML-Seite bestimmen
    let idArea = '';
    let urlParts = document.URL.split('/');
    switch (urlParts[urlParts.length - 1]) {
        case 'support.html':
            idArea = 'help';
            break;
        case 'checkout.html':
            idArea = 'out';
            break;
    }

    // Eingabe kontrollieren
    let allIdFields = ['fstName', 'lstName', 'street', 'houseNmb', 'plz', 'city', 'mail'];
    if (idArea === 'help') {
        allIdFields.push('msg');
    }

    let isValid = true;
    for (let aId of allIdFields) {
        isValid = checkInput(idArea, aId) && isValid;
    }

    // Ergebnis der Kontrolle auswerten [false]
    if (isValid === false) {
        lockButton(document.getElementsByTagName('form')[0].querySelector('input[type="button"]'));
        return;
    }

    // Ergebnis der Kontrolle auswerten [true]
    if (idArea === 'out') {
        confirmArea(2);
    } else {
        alert('Vielen Dank für Ihre Anfrage!\nWir werden unverzüglich mit Ihnen in Kontakt treten.');
    }
}