const hamburger = document.querySelector(".icon-hamburger");


hamburger.addEventListener("click", (e) => {
    e.target.classList.toggle("opened");
    e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");
})