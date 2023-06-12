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

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Hier hast du Zugriff auf die Daten aus der JSON-Datei
    console.log(data.objekte); // Beispiel: Konsolenausgabe der "objekte" in der JSON-Datei

    // Weitere Verarbeitung der Daten
    // ...
  })
  .catch(error => {
    // Fehlerbehandlung, falls das Laden der JSON-Datei fehlschlägt
    console.error('Fehler beim Laden der JSON-Datei:', error);
  });
