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

function checkMailInput(idArea) {
    let inputField = document.getElementById(idArea + '-mail');
    let isValid = new RegExp("^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}").test(inputField.value);

    if(isValid === true) {
        inputField.classList.remove(idArea + '-input-empty');
        inputField.classList.remove(idArea + '-input-false');
        inputField.classList.add(idArea + '-input-true');
    } else {
        inputField.classList.remove(idArea + '-input-empty');
        inputField.classList.remove(idArea + '-input-true');
        inputField.classList.add(idArea + '-input-false');
    }
}

function checkSupportRequest() {
    let button = document.getElementById("help-button");
    button.setAttribute("disabled", "");
    button.classList.remove("bg-orange");
    button.classList.add("bg-red");
}