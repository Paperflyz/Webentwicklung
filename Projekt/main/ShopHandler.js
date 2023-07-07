// const { emitKeypressEvents } = require("readline");

const translateObj = {'Standort': 'location', 'Erweiterungen': 'addon', 'Equipment': 'equip', 'Dekoration': 'deco'};
const shopIconElement = document.getElementById("shop-icon");
const shopSection = document.getElementById("shop-section");

let itemId = 'activeProductId';
let productId = localStorage.getItem(itemId);
if (productId === null) {
  productId = -1;
} else {
  productId = parseInt(productId);
}

localStorage.setItem(itemId, '-1');
if (productId > -1) {
  document.getElementsByClassName('shop-button')[0].classList.add('ds-none');
}

/* Collapsing Handler durch Event-Delegation */
shopSection.addEventListener("click", (e) => {
  /* Breche ab, falls Klick nicht auf eine H2 erfolgte */
  if(!e.target.matches("h2")) return;
  collapseItems(e.target);
})

const collapseItems = function(el) {
  const siblingDiv = el.nextElementSibling;
  /* Notwendig um die Funktion abzubrechen, während die Animation noch läuft */
  if(siblingDiv.classList.contains("collapsing")) return;
  el.classList.toggle("opened");

  /* Falls Accordion aufgeklappt ist, simuliere Höhenveränderung für Animation */
  if(siblingDiv.classList.contains("show")) { 
    siblingDiv.style.height = siblingDiv.scrollHeight + "px";
    setTimeout(() => siblingDiv.style.height = 0, 100);
  }
  /* Starte direkt Animation 'collapsing' */
  siblingDiv.classList.replace("collapse", "collapsing");

  /* Entferne entsprechend Klasse "show" falls diese bereits vorhanden */
  if(siblingDiv.classList.contains("show")) { siblingDiv.classList.remove("show"); } 
  else {
    siblingDiv.style.height = siblingDiv.scrollHeight + "px";
    setTimeout(() => {
      siblingDiv.classList.add("show");
      siblingDiv.style.height = "";
    }, 400)
  }

  /* Beende Animation */
  setTimeout(() => {
    siblingDiv.classList.replace("collapsing", "collapse");
  }, 400);
}


function checkStatusButton(buttonNode, elementData) {
  let articleCnt = buttonNode.parentNode.parentNode;
  let remainingAmount = elementData.bestand - getSelectedAmount(elementData.id);
  
  if (elementData.kategorie === 'Standort') {
    // Sonderregel: Nur ein Element erlaubt
    for (let aArticle of articleCnt.parentNode.children) {
      aArticle.querySelector('button').disabled = true;
      aArticle.querySelector('button').classList.add("disabled");
    }
    // buttonNode.innerHTML = '&#x2713;';
  } else {
    if (remainingAmount === 0) {
      buttonNode.disabled = true;
      buttonNode.classList.add("disabled");
    }
  }
}

function onAddButton() {
  let articleCnt = event.target.parentNode.parentNode;
  let elementData = getProductByName(articleCnt.querySelector("h3").innerHTML);

  if (productId === -1) {
    changeStorage(buildId, -1, elementData.id, 1);
  } else {
    changeStorage(basketId, productId, elementData.id, 1);
  }
  checkStatusButton(event.target, elementData);

  // const storageItemsReduced = 
  // JSON.parse(localStorage.getItem("initialItems"))
  // .map(el => {
  //   if (el.name == articleName.textContent){
  //     if(el.bestand > 0) { 
  //       el.bestand -= 1;
  //       console.log(el.bestand);
  //     }

  //     if (el.bestand === 0) { 
  //       inStock = false;
  //       event.target.disabled = true;
  //       event.target.classList.add("disabled");
  //     }
  //   } 
  //   return el;
  // });
  
  // Styling Specific
  // shopIconElement.classList.add("show");
  // setTimeout(() => {
  //   shopIconElement.classList.remove("show");
  // }, 1000);
}

document.getElementsByClassName('shop-button')[0].addEventListener('click', function() {
  // Local Storage anpassen
  let basketArr = readStorage(basketId);
  basketArr.push(readStorage(buildId));
  localStorage.setItem(basketId, JSON.stringify(basketArr));
  localStorage.setItem(buildId, '[]');
});



// Shop aufsetzen -> Elemente einfügen



// ggf. Local Storage kontrollieren
checkStorage(basketId);
checkStorage(buildId);

// Gegenstände gruppieren (nach Kategorie)
let themeObj = {};
for (let aTheme of Object.values(translateObj)) {
  themeObj[aTheme] = [];
}

for (let aElement of getProducts()) {
  themeObj[translateObj[aElement.kategorie]].push(aElement);
}

// Kategorien befüllen
// let chosenArr = readStorage();

for (let aTheme in themeObj) {
  // Elemente alphabetisch sortieren (nach Name)
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

  // Elemente einfügen
  let htmlContainer = document.getElementById('shop-' + aTheme);
  for (let i in elementArr) {
    let aElement = elementArr[i];

    let articleHtml = appendChild(htmlContainer, 'article', ['ds-flex', 'card', (i % 2 == 0 ? 'card-primary' : 'card-secondary'), 'bg-darken', 'flex-flow-column', 'justify-content-around', 'align-items-center'], {'data-id':aElement.id});
    articleHtml.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card-header my-2">
        <img src="./assets/graphics/${aElement.pfad}" alt="${aElement.alt}">
      </div>
      <div class="card-body ds-flex flex-flow-column align-items-start my-2">
        <h3>${aElement.name}</h3>
        <p>${aElement.beschreibung}</p>
        <p>Preis: ${aElement.preis.toFixed(2)} €</p>
      </div>
      <div class="card-footer my-2">
        <button class="${i % 2 == 0 ? "bg-primary" : "bg-secondary"} btn-pill text-light">Hinzufügen</button>
      </div>
      `
    );
    let addButton = articleHtml.querySelector("button");
    addButton.addEventListener('click', onAddButton);

    // ggf. Zustand des Buttons anpassen
    // for (let iArr of chosenArr) {
    //   if (iArr[0] === aElement.id) {
    //     remainingAmount -= iArr[1];
    //     break;
    //   }
    // }

    checkStatusButton(addButton, aElement);
  }
}
