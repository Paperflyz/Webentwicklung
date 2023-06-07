function switchTab(tabI) {
    let tabId = "main-sect4-tab";
    let cntId = "main-sect4-tabcontainer";
    document.getElementById(tabId + (1 + tabI)).style["grid-row"] =  "2 / 4";
    document.getElementById(tabId + (1 + tabI)).style["opacity"] = 1;
    document.getElementById(cntId + (1 + tabI)).style["visibility"] = "visible";
    document.getElementById(tabId + (2 - tabI)).style["grid-row"] = "3";
    document.getElementById(tabId + (2 - tabI)).style["opacity"] = 0.5;
    document.getElementById(cntId + (2 - tabI)).style["visibility"] = "hidden";
}