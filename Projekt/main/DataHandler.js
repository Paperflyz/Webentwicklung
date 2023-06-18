/* Funktionen bzgl. Storage vom Webbrowser */

const itemId = 'selectedId';

function changeStorage(elementId, change) {
    let dataArr = readStorage();
    let arrI = -1;
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i][0] === elementId) {
            arrI = i;
            break;
        }
    }

    if (arrI === -1) {
        dataArr.push([elementId, change]);
    } else {
        dataArr[arrI][1] += change;
        if (dataArr[arrI][1] === 0) {
            dataArr.splice(arrI, 1);
        }
    }

    localStorage.setItem(itemId, JSON.stringify(dataArr));
}

function readStorage() {
    let data = localStorage.getItem(itemId);
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function clearStorage() {
    localStorage.removeItem(itemId);
}

/* Funktion bzgl. den angebotenen Elementen */
function getProductById(id) {
    for (let aProduct of getProducts()) {
        if (aProduct.id === id) {
            return aProduct;
        }
    }
    return null;
}

function getProductByName(name) {
    for (let aProduct of getProducts()) {
        if (aProduct.name === name) {
            return aProduct;
        }
    }
    return null;
}

if(localStorage.getItem("initialItems") == null) localStorage.setItem("initialItems", JSON.stringify(getProducts()));

function getProducts() {
    return [
        {
            "id": 1,
            "name": "Ballon",
            "pfad": "balloons.jpg",
            "preis": 1.99,
            "beschreibung": "Flieg hoch und verbreite Freude!",
            "kategorie": "Event",
            "alt": "16 Luftballons in verschiedenen Farben steigen im Himmel empor",
            "bestand": 7
        },
        {
            "id": 2,
            "name": "Becher",
            "pfad": "cup.jpg",
            "preis": 0.99,
            "beschreibung": "Genieße deinen Lieblingsdrink in Style!",
            "kategorie": "Geschirr",
            "alt": "2 Papierbecher liegen quer auf einer grauen Oberfläche",
            "bestand": 12
        },
        {
            "id": 3,
            "name": "Desinfektionsmittel",
            "pfad": "desinfektion.jpg",
            "preis": 4.99,
            "beschreibung": "Halte Keime fern und bleibe gesund!",
            "kategorie": "Hygiene",
            "alt": "Zwei Hände eines Mannes mit schwarzem T-Shirt hält in der rechten Hand Desinfektionsmittel mit hellblauer Kappe.",
            "bestand": 5
        },
        {
            "id": 4,
            "name": "Zaun",
            "pfad": "fence.jpg",
            "preis": 19.99,
            "beschreibung": "Gib deinem Garten einen neuen Look!",
            "kategorie": "Event",
            "alt": "Frontalansicht eines dunkelblauen Drahtzaunes und im hintergrund eine gemähte Wiese.",
            "bestand": 3
        },
        {
            "id": 5,
            "name": "Halle",
            "pfad": "halle.png",
            "preis": 199.99,
            "beschreibung": "Die perfekte Location für deine Veranstaltungen!",
            "kategorie": "Event",
            "alt": "Frontalansicht einer Halle mit 9 Metallsäulen und einem durchsichtigem Dach.",
            "bestand": 1
        },
        {
            "id": 6,
            "name": "Holztoilette",
            "pfad": "holztoilette.png",
            "preis": 79.99,
            "beschreibung": "Die rustikale Lösung für deine Outdoor-Bedürfnisse!",
            "kategorie": "Sanitär",
            "alt": "Eine hellgraue Holztoilette mit Halbmondausschnitt an der Vordertür mitten im Wald.",
            "bestand": 8
        },
        {
            "id": 7,
            "name": "Mikrofon",
            "pfad": "microphone.jpg",
            "preis": 149.99,
            "beschreibung": "Zeige deine Gesangstalente auf der Bühne!",
            "kategorie": "Audio",
            "alt": "Ein Mikrofon mit silbernem Metallkopf und geblurrtem Hintergrund.",
            "bestand": 10
        },
        {
            "id": 8,
            "name": "Waschbecken",
            "pfad": "sink_premium.jpg",
            "preis": 249.99,
            "beschreibung": "Ein elegantes Waschbecken für dein Badezimmer!",
            "kategorie": "Sanitär",
            "alt": "Ein schwarzes Waschbecken moderner Art mit schwarzem Wasserhahn und Temperaturregler im dunklen Badezimmer.",
            "bestand": 6
        },
        {
            "id": 9,
            "name": "Soundanlage",
            "pfad": "sound-box.jpg",
            "preis": 499.99,
            "beschreibung": "Mache jede Party zu einem unvergesslichen Erlebnis!",
            "kategorie": "Audio",
            "alt": "Eine beleuchtete Soundanlage mit vielen Knöpfen und Reglern die von einer Person mit dem rechten Arm bedient wird.",
            "bestand": 4
        },
        {
            "id": 10,
            "name": "Toilettenpapier",
            "pfad": "toilet_paper.jpg",
            "preis": 2.99,
            "beschreibung": "Das weichste Toilettenpapier, das du je benutzt hast!",
            "kategorie": "Sanitär",
            "alt": "Weiße Toilettenpapierrolle stehend auf einem hellblauen Untergrund.",
            "bestand": 9
        }
    ]    
}
