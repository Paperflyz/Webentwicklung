const hamburger = document.querySelector(".icon-hamburger");
const hamburger_close = document.querySelector(".icon-close");
const timeEl = document.querySelector(".footer-text-local_time");

function clockTimer() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    timeEl.textContent = `${hours}:${minutes} Uhr`;
    setTimeout(() => clockTimer(), 1000);
}

function lockButton(button) {
    button.setAttribute('disabled', '');
    button.classList.add('bg-blutrubin');
    button.classList.remove('bg-primary');
    button.style['opacity'] = 0.5;
}

function unlockButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove('bg-blutrubin');
    button.classList.add('bg-primary');
    button.style['opacity'] = 1;
}

/* Node erstellen & aufsetzen */

function insertBefore(nextNode, tag, classArr, attbObj) {
    let newNode = document.createElement(tag);
    nextNode.parentNode.insertBefore(newNode, nextNode);
    adjustNode(newNode, classArr, attbObj);
    return newNode;
}

function appendChild(parentNode, tag, classArr, attbObj) {
    let newNode = document.createElement(tag);
    parentNode.appendChild(newNode);
    adjustNode(newNode, classArr, attbObj);
    return newNode;
}

function adjustNode(node, classArr, attbObj) {
    for (let aClass of classArr) {
        node.classList.add(aClass);
    }
    for (let aId in attbObj) {
        node.setAttribute(aId, attbObj[aId]);
    }
}

[hamburger, hamburger_close].forEach(el => {
    el.addEventListener("click", (e) => {
        hamburger.classList.toggle("ds-none");
        hamburger_close.classList.toggle("ds-none");
        e.target.closest("nav").querySelector(".menu-slide").classList.toggle("show");
    })
});

document.addEventListener("DOMContentLoaded", clockTimer);