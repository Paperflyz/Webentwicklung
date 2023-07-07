// Needed: 'General.js' & 'DataHandler.js'

document.getElementById('out-button-confirmBasket').addEventListener('click', function() { confirmArea(1); });

// Funktion: Ausgewählte Elemente ermitteln & in Checkout-Page einfügen
function buildBasket() {
    let basketButton = document.getElementById('out-button-confirmBasket');
    
    // Eingabe kontrollieren
    let storageDataArr = readStorage(basketId);
    if (storageDataArr.length === 0) {
        document.getElementById('out-empty').classList.remove('ds-none');
        lockButton(basketButton);
        return;
    }

    let totalPrice = 0;
    for (let i = 0; i < storageDataArr.length; i++) {
        let productData = storageDataArr[i];
        
        // Produktdaten der ausgewählten ID's ermitteln
        let elementData = [];
        for (let chosenArr of productData) {
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
        // let themeArr = [];
        // let themeObj = {};
        // for (let aElement of elementData) {
        //     let aTheme = aElement.kategorie;
        //     if (!themeArr.includes(aTheme)) {
        //         themeArr.push(aTheme);
        //         themeObj[aTheme] = [];
        //     }
        //     themeObj[aTheme].push(aElement);
        // }

        // Produkttitel einfügen
        let newNode = insertBefore(basketButton, 'h2', ['out-basket-theme', 'text-light']);
        newNode.innerHTML = 'Produkt ' + (i + 1);
        newNode = insertBefore(basketButton, 'button', ['bg-primary', 'text-light', 'button-confirm', 'out-basket-editBtn'], {});
        newNode.innerHTML = 'Bearbeiten';
        newNode.addEventListener('click', function() {
            localStorage.setItem('activeProductId', i);
            window.open('shop.html', '_self');
        });

        // Gegenstände alphabetisch sortieren (nach Name)
        for (let j = elementData.length - 2; j >= 0; j--) {
            for (let k = 0; k <= j; k++) {
                if (elementData[k].name.localeCompare(elementData[k + 1].name) > -1) {
                    let temp = elementData[k];
                    elementData[k] = elementData[k + 1];
                    elementData[k + 1] = temp;
                }
            }
        }

        // Gegenstände einfügen
        for (let aElement of elementData) {
            newNode = insertBefore(basketButton, 'img', ['out-element-img'], { 'src': './assets/graphics/' + aElement.pfad, 'alt': aElement.alt });
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
            newNode = appendChild(divNode, 'span', ['out-element-totalPrice'], {}).innerHTML = (Math.round(100 * aElement.amount * aElement.preis) / 100).toFixed(2) + ' €';
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
    let elementH2 = elementDiv.previousElementSibling;
    while (elementH2.tagName.toLowerCase() != 'h2') {
        elementH2 = elementH2.previousElementSibling.previousElementSibling;
    }

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

    // Local Storage aktualisieren
    let productId = parseInt(elementH2.innerHTML.split(' ')[1]) - 1;
    changeStorage(basketId, productId, productData.id, amountChange);

    // Grenzwerte der Menge kontrollieren
    if (newVal === 0) {
        // Untergrenze erreicht (-> Element wird aus Warenkorb entfernt)
        let possTitleHtml = elementDiv.previousElementSibling.previousElementSibling.previousElementSibling; // ist Produkttitel, wenn 'fstElementTheme' true ist
        let possEmptyHtml = possTitleHtml.previousElementSibling; // ist Empty-Anzeige, wenn 'fstElement' true ist
        let possPriceHtml = elementDiv.nextElementSibling; // ist Gesamtpreis-Anzeige, wenn 'lstElement' true ist

        let fstElement = (possEmptyHtml.getAttribute('id') === 'out-empty');
        let lstElement = (possPriceHtml.getAttribute('id') === 'out-price-title');
        let fstElementTheme = (possTitleHtml.tagName.toLowerCase() === 'h2');
        let lstElementTheme = (lstElement || possPriceHtml.tagName.toLowerCase() === 'h2');
        
        // Element löschen
        basketDiv.removeChild(elementDiv.previousElementSibling);
        basketDiv.removeChild(elementDiv);
        
        if (fstElementTheme && lstElementTheme) {
            // Produkt löschen
            basketDiv.removeChild(possTitleHtml.nextElementSibling);
            basketDiv.removeChild(possTitleHtml);

            if (fstElement && lstElement) {
                // Warenkorb löschen
                basketDiv.removeChild(possPriceHtml.nextElementSibling);
                basketDiv.removeChild(possPriceHtml);
                possEmptyHtml.classList.remove('ds-none');
                lockButton(basketDiv.querySelector('#out-button-confirmBasket'));
                return;
            }
        }
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