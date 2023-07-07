// JS-Datei für die HTML-Datei 'index.html'


// Funktion: Tab-Switch bei FAQ-Bereich

document.getElementById('main-sect4-tab1').addEventListener('click', function() { switchTab(0); });
document.getElementById('main-sect4-tab2').addEventListener('click', function() { switchTab(1); });

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