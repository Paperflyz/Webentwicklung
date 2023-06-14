const hamburger = document.getElementById("icon-hamburger");
const hamburger_close = document.getElementById("icon-close");
const shopSectionContainer = document.querySelector("#shop-section > div");


[hamburger, hamburger_close].forEach(el => {
    el.addEventListener("click", (e) => {
        hamburger.classList.toggle("ds-none");
        hamburger_close.classList.toggle("ds-none");
        e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");

    })
});



