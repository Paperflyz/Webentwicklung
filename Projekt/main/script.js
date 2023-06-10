function switchTab(tabI) {
    let tabId = "main-sect4-tab";
    let cntId = "main-sect4-tabcontainer";

    document.getElementById(tabId + (1 + tabI)).classList.remove("main-sect4-hiddenTab");
    document.getElementById(tabId + (1 + tabI)).classList.add("main-sect4-activeTab");
    document.getElementById(cntId + (1 + tabI)).style["visibility"] = "visible";

    document.getElementById(tabId + (2 - tabI)).classList.remove("main-sect4-activeTab");
    document.getElementById(tabId + (2 - tabI)).classList.add("main-sect4-hiddenTab");
    document.getElementById(cntId + (2 - tabI)).style["visibility"] = "hidden";
}

function checkPlzInput(idArea) {
    console.log("run plz");
    let inputField = document.getElementById(idArea + '-plz');
    inputField.classList.remove(idArea + '-input-false');
    inputField.classList.remove(idArea + '-input-true');
    document.getElementById(idArea + '-plz-err').classList.add('ds-none');
    unlockButton();

    let userInput = inputField.value;
    if (userInput === "") return true;

    let isValid = new RegExp("^\\d{5}$").test(userInput);
    console.log(isValid);
    if (isValid === true) {
        inputField.classList.add(idArea + '-input-true');
    } else {
        inputField.classList.add(idArea + '-input-false');
        document.getElementById(idArea + '-plz-err').classList.remove('ds-none');
    }
    return isValid;
}

function checkMailInput(idArea) {
    console.log("run mail");
    let inputField = document.getElementById(idArea + '-mail');
    for (let i of ['empty', 'true', 'false']) {
        inputField.classList.remove(idArea + '-input-' + i);
    }
    document.getElementById(idArea + '-mail-err').classList.add('ds-none');
    unlockButton();

    let userInput = inputField.value;
    if (userInput === "") {
        inputField.classList.add(idArea + '-input-false');
        document.getElementById(idArea + '-mail-err').classList.remove('ds-none');
        return false;
    }

    let isValid = new RegExp("^[^\\s@]+@[^\\s@]+\.[a-zA-Z]{1,3}$").test(userInput);
    if (isValid === true) {
        inputField.classList.add(idArea + '-input-true');
    } else {
        inputField.classList.add(idArea + '-input-false');
        document.getElementById(idArea + '-mail-err').classList.remove('ds-none');
    }
    return isValid;
}

function checkMessageInput(idArea) {
    console.log("run msg");
    let inputField = document.getElementById(idArea + '-msg');
    for (let i of ['empty', 'true', 'false']) {
        inputField.classList.remove(idArea + '-input-' + i);
    }
    document.getElementById(idArea + '-msg-err').classList.add('ds-none');
    unlockButton();

    let isValid = (inputField.value != "");
    if (isValid === true) {
        inputField.classList.add(idArea + '-input-true');
    } else {
        inputField.classList.add(idArea + '-input-false');
        document.getElementById(idArea + '-msg-err').classList.remove('ds-none');
    }
    return isValid;
}

function unlockButton() {
    let button = document.getElementById("help-button");
    button.removeAttribute("disabled");
    button.classList.remove("bg-blutrubin");
    button.classList.add("bg-primary");
    button.style['opacity'] = 1;
}

function checkSupportRequest() {
    let idArea = "help";
    let isValid = checkPlzInput(idArea);
    console.log("PLZ: " + isValid);
    isValid = checkMailInput(idArea) && isValid;
    console.log("Mail: " + isValid);
    isValid = checkMessageInput(idArea) && isValid;
    console.log("Msg: " + isValid);

    let button = document.getElementById("help-button");
    if (isValid === false) {
        button.setAttribute("disabled", "");
        button.classList.remove("bg-primary");
        button.classList.add("bg-blutrubin");
        button.style['opacity'] = 0.5;
        return false;
    }

    // TODO: Mail verschicken
}