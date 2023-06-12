/* Funktionen bzgl. Storage vom Webbrowser */

const itemId = 'selectedId';

function writeStorage(newId) {
    let idArr = readStorage();
    idArr.push(newId);
    localStorage[itemId] = idArr;
}

function readStorage() {
    let idArr = localStorage[itemId];
    if (idArr === undefined) {
        idArr = [];
    }
    return idArr;
}

function clearStorage() {
    localStorage.clear();
}

/* Funktion bzgl. JSON-Datei */

function readJson() {
    // TODO: JSON-Datei auslesen & in Konsole ausgeben
}