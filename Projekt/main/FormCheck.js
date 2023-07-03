// Needed: 'General.js'

document.getElementsByClassName('form-button')[0].addEventListener('click', checkForm);
for (let aElement of document.body.querySelectorAll('input[type="text"]')) {
    aElement.addEventListener('blur', function() {
        let idParts = event.target.getAttribute('id').split('-');
        checkInput(idParts[0], idParts[1]);
    });
}

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



function checkForm() {
    // HTML-Seite bestimmen
    let idArea = '';
    switch (document.URL.split('/')[3]) {
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


    // TODO: Mail verschicken
    // -> (support.html) Support-Anfrage per Mail & per Webseite bestätigen
    // -> (checkout.html) Auftragsbestätigung per Mail bestätigen & zur nächsten Sicht switchen


    if (idArea === 'out') {
        confirmArea(2);
    } else {
        alert('input valid');
    }
}