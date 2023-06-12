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

/* Funktion bzgl. den angebotenen Elementen */

const elementsArr = [
    {
        "id": 1,
        "name": "Ballon",
        "pfad": "balloons.jpg",
        "preis": 1.99,
        "beschreibung": "Flieg hoch und verbreite Freude!",
        "kategorie": "Event"
    },
    {
        "id": 2,
        "name": "Becher",
        "pfad": "cup.jpg",
        "preis": 0.99,
        "beschreibung": "Genieße deinen Lieblingsdrink in Style!",
        "kategorie": "Geschirr"
    },
    {
        "id": 3,
        "name": "Desinfektionsmittel",
        "pfad": "desinfektion.jpg",
        "preis": 4.99,
        "beschreibung": "Halte Keime fern und bleibe gesund!",
        "kategorie": "Hygiene"
    },
    {
        "id": 4,
        "name": "Zaun",
        "pfad": "fence.jpg",
        "preis": 19.99,
        "beschreibung": "Gib deinem Garten einen neuen Look!",
        "kategorie": "Event"
    },
    {
        "id": 5,
        "name": "Halle",
        "pfad": "halle.png",
        "preis": 199.99,
        "beschreibung": "Die perfekte Location für deine Veranstaltungen!",
        "kategorie": "Event"
    },
    {
        "id": 6,
        "name": "Holztoilette",
        "pfad": "holztoilette.png",
        "preis": 79.99,
        "beschreibung": "Die rustikale Lösung für deine Outdoor-Bedürfnisse!",
        "kategorie": "Sanitär"
    },
    {
        "id": 7,
        "name": "Mikrofon",
        "pfad": "microphone.jpg",
        "preis": 149.99,
        "beschreibung": "Zeige deine Gesangstalente auf der Bühne!",
        "kategorie": "Audio"
    },
    {
        "id": 8,
        "name": "Waschbecken",
        "pfad": "sink_premium.jpg",
        "preis": 249.99,
        "beschreibung": "Ein elegantes Waschbecken für dein Badezimmer!",
        "kategorie": "Sanitär"
    },
    {
        "id": 9,
        "name": "Soundanlage",
        "pfad": "sound-box.jpg",
        "preis": 499.99,
        "beschreibung": "Mache jede Party zu einem unvergesslichen Erlebnis!",
        "kategorie": "Audio"
    },
    {
        "id": 10,
        "name": "Toilettenpapier",
        "pfad": "toilet_paper.jpg",
        "preis": 2.99,
        "beschreibung": "Das weichste Toilettenpapier, das du je benutzt hast!",
        "kategorie": "Sanitär"
    }
]

function getElement(id) {
    for (let aElement of elementsArr) {
        if (aElement.id === id) {
            return aElement;
        }
    }
    return null;
}