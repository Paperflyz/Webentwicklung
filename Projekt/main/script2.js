const shopSectionContainer = document.querySelector("#shop-section > div");
const products = getProducts();
const shopIconElement = document.querySelector(".shop-icon");

shopSectionContainer.addEventListener("click", e => {
  /* Use event delegation to prevent many event listeners (for each button) */
  if (!e.target.matches("button")) return;

  const articleName = e.target.closest("article").querySelector("h3");
  let inStock = true;

  const storageItemsReduced = 
  JSON.parse(localStorage.getItem("initialItems"))
  .map(el => {
    if(el.name == articleName.textContent){
      if(el.bestand > 0) { 
        el.bestand -= 1;
        console.log(el.bestand);
      }

      if(el.bestand === 0) { 
        inStock = false;
        e.target.disabled = true;
        e.target.classList.add("disabled");
      }
    } 
    return el;
  });


  /* Change Objects in localStorage with updated stock */
  localStorage.setItem("initialItems", JSON.stringify(storageItemsReduced));

  /* Necessary for the checkout part */
  changeStorage(getProductByName(articleName.textContent).id, 1);
  
  /* Styling Specific */
  shopIconElement.classList.add("show");
  setTimeout(() => {
    shopIconElement.classList.remove("show");
  }, 1000);


})

products.forEach((el, idx) => {
  /* Insert all items into DOM from products array */
    shopSectionContainer.insertAdjacentHTML(
        "beforeend",
        `
        <article data-id="${el.id}" class="card ${idx % 2 == 0 ? "card-primary" : "card-secondary"} bg-darken ds-flex flex-flow-column align-items-center justify-content-around">
            <div class="card-header my-2">
              <img src="./assets/graphics/${el.pfad}" alt="${el.alt}" srcset="">
            </div>
            <div class="card-body ds-flex flex-flow-column align-items-start my-2">
              <h3>${el.name}</h3>
              <p>${el.beschreibung}</p>
              <p>Preis: ${el.preis} €</p>
            </div>
            <div class="card-footer my-2">
              <button class="${idx % 2 == 0 ? "bg-primary" : "bg-secondary"} btn-pill text-light">Hinzufügen</button>
            </div>
          </article>
        `
    )

    /* Set Button of all items into disabled if the stock is equal to 0 */
    const curStorageItem = JSON.parse(localStorage.getItem("initialItems"))[idx];
    console.log(curStorageItem.bestand);
    if(curStorageItem.bestand == 0) { 
      console.log(curStorageItem.bestand);
      shopSectionContainer.querySelectorAll("button")[idx].disabled = true;
      shopSectionContainer.querySelectorAll("button")[idx].classList.add("disabled")      
    }
})


