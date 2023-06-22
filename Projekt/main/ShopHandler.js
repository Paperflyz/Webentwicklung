const translateObj = {'Standort': 'location', 'Erweiterungen': 'addon', 'Equipment': 'equip', 'Dekoration': 'deco'};
const shopIconElement = document.getElementById("shop-icon");


function checkStatusButton(buttonNode, category, remainingAmount) {
  let articleCnt = buttonNode.parentNode.parentNode;
  
  if (category === 'Standort') {
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
  let remainingAmount = elementData.bestand - changeStorage(elementData.id, 1);
  checkStatusButton(event.target, elementData.kategorie, remainingAmount);

  /*
  const storageItemsReduced = 
  JSON.parse(localStorage.getItem("initialItems"))
  .map(el => {
    if (el.name == articleName.textContent){
      if(el.bestand > 0) { 
        el.bestand -= 1;
        console.log(el.bestand);
      }

      if (el.bestand === 0) { 
        inStock = false;
        event.target.disabled = true;
        event.target.classList.add("disabled");
      }
    } 
    return el;
  });

  localStorage.setItem("initialItems", JSON.stringify(storageItemsReduced));
  */
  
  // Styling Specific
  shopIconElement.classList.add("show");
  setTimeout(() => {
    shopIconElement.classList.remove("show");
  }, 1000);
}



// Shop aufsetzen -> Elemente einfügen



// Gegenstände gruppieren (nach Kategorie)
let themeObj = {};
for (let aTheme of Object.values(translateObj)) {
  themeObj[aTheme] = [];
}

for (let aElement of getProducts()) {
  themeObj[translateObj[aElement.kategorie]].push(aElement);
}

// Kategorien befüllen
let chosenArr = readStorage();

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
        <img src="./assets/graphics/${aElement.pfad}" alt="${aElement.alt}" srcset="">
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
    let remainingAmount = aElement.bestand;
    for (let iArr of chosenArr) {
      if (iArr[0] === aElement.id) {
        remainingAmount -= iArr[1];
        break;
      }
    }

    checkStatusButton(addButton, aElement.kategorie, remainingAmount);
  }
}