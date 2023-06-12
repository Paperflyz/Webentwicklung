const hamburger = document.getElementById("icon-hamburger");
const hamburger_close = document.getElementById("icon-close");


[hamburger, hamburger_close].forEach(el => {
    el.addEventListener("click", (e) => {
        hamburger.classList.toggle("ds-none");
        hamburger_close.classList.toggle("ds-none");
        e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");
    })
})
// hamburger.addEventListener("click", (e) => {
//     e.target.classList.toggle("opened");
//     e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");
// })