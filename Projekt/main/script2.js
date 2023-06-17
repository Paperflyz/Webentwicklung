import { getProductById, getProductByName, getProducts, writeStorage, readStorage } from "./DataHandler.js";
const hamburger = document.getElementById("icon-hamburger");
const hamburger_close = document.getElementById("icon-close");
const shopSectionContainer = document.querySelector("#shop-section > div");
const products = getProducts();


[hamburger, hamburger_close].forEach(el => {
    el.addEventListener("click", (e) => {
        hamburger.classList.toggle("ds-none");
        hamburger_close.classList.toggle("ds-none");
        e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");

    })
});

shopSectionContainer.addEventListener("click", e => {
  if (!e.target.matches("button")) return;

  const articleName = e.target.closest("article").querySelector("h3");
  writeStorage(getProductByName(articleName.textContent).id, 1);
  console.log(getProductByName(articleName.textContent).id);
  
})

products.forEach((el, idx) => {
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
})


