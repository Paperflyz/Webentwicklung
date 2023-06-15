export function lockButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.setAttribute('disabled', '');
    button.classList.add('bg-blutrubin');
    button.classList.remove('bg-primary');
    button.style['opacity'] = 0.5;
}

export function unlockButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.removeAttribute('disabled');
    button.classList.remove('bg-blutrubin');
    button.classList.add('bg-primary');
    button.style['opacity'] = 1;
}

/* Node erstellen & aufsetzen */

export function insertBefore(nextNode, tag, classArr, attbObj) {
    let newNode = document.createElement(tag);
    nextNode.parentNode.insertBefore(newNode, nextNode);
    adjustNode(newNode, classArr, attbObj);
    return newNode;
}

export function appendChild(parentNode, tag, classArr, attbObj) {
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