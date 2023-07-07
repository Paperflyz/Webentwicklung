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
        arrI = dataArr.length - 1;
    } else {
        dataArr[arrI][1] += change;
        if (dataArr[arrI][1] === 0) {
            dataArr.splice(arrI, 1);
        }
    }

    localStorage.setItem(itemId, JSON.stringify(dataArr));
    return dataArr[arrI][1];
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
            "name": "Halle",
            "pfad": "halle.png",
            "preis": 199.99,
            "beschreibung": "Eine gemütliche und große Halle für Events jeglicher Art!<br>Halle beinhaltet Toiletten und Waschbecken.",
            "kategorie": "Standort",
            "alt": "Frontalansicht einer Halle mit 9 Metallsäulen und einem durchsichtigem Dach.",
            "bestand": 1
        }, {
            "id": 2,
            "name": "Wiese",
            "pfad": "wiese.jpg",
            "preis": 199.99,
            "beschreibung": "Eine Location unter den Sternen!",
            "kategorie": "Standort",
            "alt": "Frontalansicht einer Wiese mit Laubbäumen am hellichten Tag bei teilweise bewölktem Wetter.",
            "bestand": 1
        }, {
            "id": 3,
            "name": "Eigenfläche",
            "pfad": "eigenflaeche.jpg",
            "preis": 0.00,
            "beschreibung": "Auf dem eigenen Grundstück ist es doch am Gemütlichsten!",
            "kategorie": "Standort",
            "alt": "Ausblick eines Gartens mit Swimming-Pool, Gartenliege und Gartenhecke bei Dämmerung.",
            "bestand": 1
        }, {
            "id": 4,
            "name": "Zaun",
            "pfad": "fence.jpg",
            "preis": 19.99,
            "beschreibung": "Gib deinem Garten einen neuen Look!<br>pro Anzahl: 30 Meter Zaun",
            "kategorie": "Erweiterungen",
            "alt": "Frontalansicht eines dunkelblauen Drahtzaunes und im hintergrund eine gemähte Wiese.",
            "bestand": 3
        }, {
            "id": 5,
            "name": "Ballon",
            "pfad": "balloons.jpg",
            "preis": 1.99,
            "beschreibung": "Flieg hoch und verbreite Freude!",
            "kategorie": "Dekoration",
            "alt": "16 Luftballons in verschiedenen Farben steigen im Himmel empor",
            "bestand": 7
        }, {
            "id": 6,
            "name": "Becher",
            "pfad": "cup.jpg",
            "preis": 0.99,
            "beschreibung": "Genieße deinen Lieblingsdrink in Style!",
            "kategorie": "Dekoration",
            "alt": "2 Papierbecher liegen quer auf einer grauen Oberfläche",
            "bestand": 12
        }, {
            "id": 7,
            "name": "Desinfektionsmittel",
            "pfad": "desinfektion.jpg",
            "preis": 4.99,
            "beschreibung": "Halte Keime fern und bleibe gesund!",
            "kategorie": "Erweiterungen",
            "alt": "Zwei Hände eines Mannes mit schwarzem T-Shirt hält in der rechten Hand Desinfektionsmittel mit hellblauer Kappe.",
            "bestand": 5
        }, {
            "id": 8,
            "name": "Toilette",
            "pfad": "toilets.jpg",
            "preis": 79.99,
            "beschreibung": "Die rustikale Lösung für deine Outdoor-Bedürfnisse!",
            "kategorie": "Erweiterungen",
            "alt": "Eine reihe von bunten Mobiltoiletten direkt nebeneinander in Diagonalansicht.",
            "bestand": 8
        }, {
            "id": 9,
            "name": "Mikrofon",
            "pfad": "microphone.jpg",
            "preis": 149.99,
            "beschreibung": "Zeige deine Gesangstalente auf der Bühne!",
            "kategorie": "Equipment",
            "alt": "Ein Mikrofon mit silbernem Metallkopf und geblurrtem Hintergrund.",
            "bestand": 10
        }, {
            "id": 10,
            "name": "Waschbecken",
            "pfad": "sink_premium.jpg",
            "preis": 249.99,
            "beschreibung": "Ein elegantes Waschbecken für dein Badezimmer!",
            "kategorie": "Erweiterungen",
            "alt": "Ein schwarzes Waschbecken moderner Art mit schwarzem Wasserhahn und Temperaturregler im dunklen Badezimmer.",
            "bestand": 6
        }, {
            "id": 11,
            "name": "Soundanlage",
            "pfad": "sound-box.jpg",
            "preis": 499.99,
            "beschreibung": "Mache jede Party zu einem unvergesslichen Erlebnis!",
            "kategorie": "Equipment",
            "alt": "Eine beleuchtete Soundanlage mit vielen Knöpfen und Reglern die von einer Person mit dem rechten Arm bedient wird.",
            "bestand": 4
        }, {
            "id": 12,
            "name": "Toilettenpapier",
            "pfad": "toilet_paper.jpg",
            "preis": 2.99,
            "beschreibung": "Das weichste Toilettenpapier, das du je benutzt hast!",
            "kategorie": "Erweiterungen",
            "alt": "Weiße Toilettenpapierrolle stehend auf einem hellblauen Untergrund.",
            "bestand": 9
        }
    ]   
}
