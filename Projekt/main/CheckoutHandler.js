// Needed: 'General.js' & 'DataHandler.js'

// Funktion: Ausgewählte Elemente ermitteln & in Checkout-Page einfügen
function buildBasket() {
    let basketButton = document.getElementById('out-button-confirmBasket');
    
    // Eingabe kontrollieren
    let storageDataArr = readStorage();
    if (storageDataArr.length === 0) {
        document.getElementById('out-empty').classList.remove('ds-none');
        lockButton(basketButton);
        return;
    }

    let elementData = [];
    let totalPrice = 0;
    for (let chosenArr of storageDataArr) {
        let newData = getProductById(chosenArr[0]);
        if (newData === null) {
            alert('ERROR: Element not found!\nPlease reload the page!');
            lockButton(basketButton);
            return;
        }
        newData.amount = chosenArr[1];
        totalPrice += newData.amount * newData.preis;
        elementData.push(newData);
    }

    // Gegenstände gruppieren (nach Kategorie)
    let themeArr = [];
    let themeObj = {};
    for (let aElement of elementData) {
        let aTheme = aElement.kategorie;
        if (!themeArr.includes(aTheme)) {
            themeArr.push(aTheme);
            themeObj[aTheme] = [];
        }
        themeObj[aTheme].push(aElement);
    }


    // Gegenstände alphabetisch sortieren (nach Name)
    for (let i = elementData.length - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            if (elementData[j].name.localeCompare(elementData[j + 1].name) > -1) {
                let temp = elementData[j];
                elementData[j] = elementData[j + 1];
                elementData[j + 1] = temp;
            }
        }
    }

    // Kategorien einfügen
    themeArr.sort();
    for (let aTheme of themeArr) {
        // Titel einfügen
        let themeNode = insertBefore(basketButton, 'h2', ['out-basket-theme', 'text-light']);
        themeNode.innerHTML = aTheme;

        // Gegenstände alphabetisch sortieren (nach Name)
        let elementArr = themeObj[aTheme];
        for (let i = elementArr.length - 2; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                if (elementArr[j].name.localeCompare(elementArr[j + 1].name) > -1) {
                    let temp = elementArr[j];
                    elementArr[j] = elementArr[j + 1];
                    elementArr[j + 1] = temp;
                }
            }
        }

        // Gegenstände einfügen
        for (let aElement of elementArr) {
            let newNode = insertBefore(basketButton, 'img', ['out-element-img'], {'src': './assets/graphics/' + aElement.pfad, 'alt': aElement.alt});
            newNode.addEventListener('click', changeElementDiv);
            let divNode = insertBefore(basketButton, 'div', ['out-element-div', 'ds-grid', 'col-gap', 'grid-row-gap', 'bg-light'], {});
            divNode.addEventListener('click', changeElementDiv);
            
            appendChild(divNode, 'h3', ['out-element-desc-title'], {}).innerHTML = aElement.name;
            appendChild(divNode, 'span', ['out-element-amount-title'], {}).innerHTML = 'Anzahl';
            appendChild(divNode, 'p', ['out-element-desc-txt'], {}).innerHTML = aElement.beschreibung;
            let circleNode = appendChild(divNode, 'div', ['out-element-amount-circle', 'bg-secondary'], {});
            appendChild(circleNode, 'span', ['out-element-amount-txt', 'text-light'], {}).innerHTML = aElement.amount;

            appendChild(divNode, 'span', ['out-element-amount'], {}).innerHTML = "Anzahl: " + aElement.amount;
            let flexNode = appendChild(divNode, 'div', ['ds-flex', 'out-element-flex'], {});

            let btnNode = appendChild(flexNode, 'button', ['ds-flex', 'out-element-button', 'bg-primary'], {});
            btnNode.innerHTML = '+';
            btnNode.addEventListener('click', changeElementAmount);
            if (aElement.amount === aElement.bestand) {
                lockButton(btnNode);
                btnNode.classList.add('text-dark');
            } else {
                btnNode.classList.add('text-light');
            }
            btnNode = appendChild(flexNode, 'button', ['ds-flex', 'out-element-button', 'bg-primary', 'text-light'], {});
            btnNode.innerHTML = '-';
            btnNode.addEventListener('click', changeElementAmount);

            newNode = appendChild(divNode, 'span', ['out-element-onePrice'], {}).innerHTML = '(je ' + aElement.preis + ' €)';
            newNode = appendChild(divNode, 'span', ['out-element-totalPrice'], {}).innerHTML = aElement.preis + ' €';
        }
    }


    // Gesamtpreis einfügen
    insertBefore(basketButton, 'span', ['text-light'], {'id': 'out-price-title'}).innerHTML = 'TOTAL:';
    insertBefore(basketButton, 'span', ['text-light'], {'id': 'out-price-txt'}).innerHTML = (Math.round(100 * totalPrice) / 100).toFixed(2) + ' €';
}

function changeElementAmount() {
    // HTML-Elemente & Produktdaten ermitteln
    let clickBtn = event.target;
    let elementDiv = clickBtn.parentNode.parentNode;
    let basketDiv = elementDiv.parentNode;

    let elementName = elementDiv.querySelector('.out-element-desc-title').innerHTML;
    let productData = getProductByName(elementName);

    // Mengenanzeige aktualisieren
    let amountChange = (clickBtn.innerHTML === '+') ? 1 : -1;

    let amountHtml = elementDiv.querySelector('.out-element-amount');
    let smallDiv = (window.getComputedStyle(amountHtml).display != 'none');
    let newVal = 0;
    if (!smallDiv) {
        amountHtml = elementDiv.querySelector('.out-element-amount-txt');
        newVal = parseInt(amountHtml.innerHTML) + amountChange;
        amountHtml.innerHTML = newVal;
    } else {
        newVal = parseInt(amountHtml.innerHTML.split(' ')[1]) + amountChange;
        amountHtml.innerHTML = 'Anzahl: ' + newVal;
    }

    // Grenzwerte der Menge kontrollieren
    if (newVal === 0) {
        // Untergrenze erreicht (-> Element wird aus Warenkorb entfernt)
        let possTitleHtml = elementDiv.previousElementSibling.previousElementSibling; // ist Kategorientitel, wenn 'fstElementTheme' true ist
        let possEmptyHtml = possTitleHtml.previousElementSibling; // ist Empty-Anzeige, wenn 'fstElement' true ist
        let possPriceHtml = elementDiv.nextElementSibling; // ist Gesamtpreis-Anzeige, wenn 'lstElement' true ist

        let fstElement = (possEmptyHtml.getAttribute('id') === 'out-empty');
        let lstElement = (possPriceHtml.getAttribute('id') === 'out-price-title');
        let fstElementTheme = (possTitleHtml.tagName.toLowerCase() === 'h2');
        let lstelementTheme = (lstElement || possPriceHtml.tagName.toLowerCase() === 'h2');
        
        if (fstElementTheme && lstelementTheme) {
            if (fstElement && lstElement) {
                // Warenkorb löschen
                basketDiv.removeChild(possPriceHtml.nextElementSibling);
                basketDiv.removeChild(possPriceHtml);
                possEmptyHtml.classList.remove('ds-none');
                lockButton(basketDiv.querySelector('#out-button-confirmBasket'));
            }

            // Kategorie löschen
            basketDiv.removeChild(possTitleHtml);
        }
        
        // Produkt löschen
        basketDiv.removeChild(elementDiv.previousElementSibling);
        basketDiv.removeChild(elementDiv);
    } else if (newVal === productData.bestand) {
        // Obergrenze erreicht (->'+'-Button wird gesperrt)
        lockButton(clickBtn);
        clickBtn.classList.add('text-dark');
        clickBtn.classList.remove('text-light');
    } else if (newVal === (productData.bestand - 1) && amountChange === -1) {
        // Einschränkungen durch Obergrenze aufheben
        unlockButton(clickBtn.previousElementSibling);
        clickBtn.previousElementSibling.classList.add('text-light');
        clickBtn.previousElementSibling.classList.remove('text-dark');
    }

    // Local Storage aktualisieren
    changeStorage(productData.id, amountChange);

    // Elementpreis aktualisieren
    if (newVal > 0) {
        elementDiv.querySelector('.out-element-totalPrice').innerHTML = (Math.round(100 * newVal * productData.preis) / 100).toFixed(2) + ' €';
    }

    // Gesamtpreis aktualisieren
    let totalHtml = basketDiv.querySelector('#out-price-txt');
    let newPrice = parseFloat(totalHtml.innerHTML.split(' ')[0]) + (amountChange * productData.preis);
    totalHtml.innerHTML = (Math.round(100 * newPrice) / 100).toFixed(2) + ' €';
}


// Beschreibung ein-/ausblenden (nur mobile-view)

function changeElementDiv() {
    /* let maxWidth = 767;
    if (window.matchMedia('screen and (min-width: ' + maxWidth + 'px)').matches === true) {
        return;
    }

    let clickedDiv = event.target;
    if (clickedDiv.tagName.toLowerCase() == 'img') {
        clickedDiv = clickedDiv.nextSibling;
    } else if (clickedDiv.tagName.toLowerCase() != 'div') {
        clickedDiv = clickedDiv.parentNode;
    }
    let descNode = clickedDiv.querySelector('.out-element-desc-txt');

    if (window.getComputedStyle(descNode).fontSize === '0px') {
        console.log('true');
        descNode.style.fontSize = 'initial';
    } else {
        console.log('false');
        descNode.style.fontSize = '0px';
    } */
}

// Div-Wechsel
function confirmArea(newAreaId) {
    // Wechsel zum nächsten Bereich
    let percent = 100 * newAreaId / 3;
    document.getElementById('out-flex').style.transform = 'translateX(-' + percent + '%)';

    // Bereichspezifische Anweisungen durchführen
    if (newAreaId === 2) {
        // Warenkorb aus Local Storage löschen
        clearStorage();
    }
}