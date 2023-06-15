import { lockButton, insertBefore, appendChild } from './General.js';
import { readStorage, getProductById } from './DataHandler.js';

// Funktion: Ausgewählte Elemente ermitteln & in Checkout-Page einfügen
document.body.onload = function() {
    let buttonId = 'out-button-confirmBasket';
    
    // Eingabe kontrollieren
    let storageDataArr = readStorage();
    if (storageDataArr.length === 0) {
        document.getElementById('out-empty').classList.remove('ds-none');
        lockButton(buttonId);
        return;
    }

    let elementData = [];
    for (let chosenArr of storageDataArr) {
        let newData = getProductById(chosenArr[0]);
        if (newData === null) {
            alert('ERROR: Element not found!\nPlease reload the page!');
            lockButton(buttonId);
            return;
        }
        newData.amount = chosenArr[1];
        elementData.push(newData);
    }

    // Daten einfügen
    let fooNode = document.getElementById(buttonId);
    for (let dataObj of elementData) {
        let imgNode = insertBefore(fooNode, 'img', ['out-element-img'], {'src': './assets/graphics/' + dataObj.pfad});
        imgNode.addEventListener('click', changeElementDiv);
        let divNode = insertBefore(fooNode, 'div', ['out-element-div', 'ds-grid', 'col-gap', 'row-gap', 'bg-light'], {});
        divNode.addEventListener('click', changeElementDiv);
        
        let newChild = appendChild(divNode, 'h2', ['out-element-desc-title'], {});
        newChild.innerHTML = dataObj.name;
        newChild = appendChild(divNode, 'span', ['out-element-amount-title'], {});
        newChild.innerHTML = 'Anzahl';
        newChild = appendChild(divNode, 'p', ['out-element-desc-txt'], {});
        newChild.innerHTML = dataObj.beschreibung;
        newChild = appendChild(divNode, 'span', ['out-element-amount'], {});
        newChild.innerHTML = "Anzahl: " + dataObj.amount;

        let circleNode = appendChild(divNode, 'div', ['out-element-amount-circle', 'bg-secondary'], {});
        newChild = appendChild(circleNode, 'span', ['out-element-amount-txt', 'text-light'], {});
        newChild.innerHTML = dataObj.amount;
    }
}


// Beschreibung ein-/ausblenden (nur mobile-view)
function changeElementDiv() {
    console.log(event.type);
    let maxWidth = 767;
    if (window.screen.width > maxWidth) {
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
        descNode.style['font-size'] = 'initial';
    } else {
        descNode.style['font-size'] = '0px';
    }
}

// Div-Wechsel
document.getElementById('out-flex').addEventListener('click', function() {
    console.log('function triggered');
    let flex = document.getElementById('out-flex');
    flex.style.transform = 'translateX(-33.33%)';
})