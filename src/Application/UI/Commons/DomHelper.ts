export function replace(parent: Node, currentChild: Node, newChild: Element) {
    let position = 0;
    if (currentChild.parentElement === parent) {
        position = Array.prototype.indexOf.call(parent.childNodes, currentChild);
        parent.removeChild(currentChild);
    } else {
        console.warn("Child element not found on parent");
    }
    insertAt(parent, newChild, position);
}

export function insertAt(parent: Node, child: Node, index: number) {
    if (!index) index = 0;
    if (index >= parent.childNodes.length) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child, parent.childNodes[index]);
    }
}