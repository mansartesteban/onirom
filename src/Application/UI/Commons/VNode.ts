/// <reference path="UI.d.ts" />

import Slot from "./Slot";
import Registry from "@/Application/Commons/Registry";
import VNodeRegistry from "./VNodeRegistry";
import NodeId from "./NodeId";
import VMount from "./VMount";
import { defineProps } from "./Framework";

class VNode implements IVNode {
    identifier: NodeId;

    #slots: Slot[] = [];
    #props: TProps;
    #children: VNode[] = [];
    #classes: string[] = [];

    #observers: { name: string; callback: EventListenerOrEventListenerObject; }[] =
        [];

    parent?: VNode;
    target?: VMount;
    dom?: Element;
    newDom?: Element;
    isMounted: Boolean = false;

    constructor(props?: TProps) {
        this.identifier = new NodeId();

        let nodeRegistry = Registry.get("vnode") as VNodeRegistry;
        nodeRegistry.register(this);

        this.#props = props || {};
    }

    get props(): { [name: string]: any; } {
        return this.#props;
    }
    get slots(): { [name: string]: VNode; } {
        let slots: { [name: string]: any; } = {};
        this.#slots.forEach((slot: Slot) => {
            slots[slot.name] = slot.node;
        });
        return slots;
    }
    get children(): VNode[] {
        return this.#children;
    }
    get classes(): string[] {
        return this.#classes;
    }
    get observers(): {
        name: string;
        callback: EventListenerOrEventListenerObject;
    }[] {
        return this.#observers;
    }

    set props(props: TProps) {
        this.#props = props;
    }
    set slots(slots: Slot) {
        this.#slots.push(slots);
    }
    set children(children: VNode) {
        this.#children.push(children);
    }
    set classes(classes: string) {
        this.#classes.push(classes);
    }
    set observers(observers: {
        name: string;
        callback: EventListenerOrEventListenerObject;
    }) {
        this.#observers.push(observers);
    }

    defineProps(props: TProps) {

        //TODO:
        // const handler = {
        //     get(cible: any, prop: any, recepteur: any) {
        //         if (prop === "message2") {
        //             return "le monde";
        //         }
        //         return Reflect.get(...arguments);
        //     },
        // };

        let definedProps = defineProps(props, this.props);
        console.log("deinfe props", definedProps);
        // let proxy = new Proxy(definedProps, handler);
        this.props = definedProps;
        return definedProps;
    }

    defineSlot(name: string, node: VNode) {
        this.#slots.push(new Slot(name, node));
    }

    add(child: VNode) {
        this.#children.push(child);
    }

    remove(child: VNode) {
        let foundIndex = this.#children.findIndex(
            (c: VNode) => c.identifier === child.identifier
        );
        if (foundIndex !== -1) {
            this.#children.splice(foundIndex, 1);
        }
    }

    on(eventName: string, callback: EventListenerOrEventListenerObject) {
        this.#observers.push({ name: eventName, callback });
    }

    createElement(tag: string = "div", props?: TElementProps) {
        let element = document.createElement(tag);
        // element.setAttribute("data-id", this.identifier.id);
        if (props?.id) {
            element.id = props.id;
        }

        props?.attributes?.forEach((attribute: TElementAttribute) =>
            element.setAttribute(attribute.name, attribute.value || "")
        );

        this.classes?.forEach((classe: string) => element.classList.add(classe));
        return element;
    }

    toHtml(): Element {
        return this.createElement();
    }

    enhanceNode(dom: Element) {
        if (dom) {
            dom.classList.add(...this.classes);

            this.#observers.forEach(
                (observer: {
                    name: string;
                    callback: EventListenerOrEventListenerObject;
                }) => {
                    dom?.addEventListener(observer.name, observer.callback);
                }
            );
        }
        return dom;
    }

    firstRender() {
        if (this.parent) {
            this.dom = this.enhanceNode(this.toHtml());
            this.children.forEach((child: VNode) => child.render(this));
            this.parent.dom?.append(this.dom);
            this.isMounted = true;
        }
    }

    reRender() {
        if (this.parent && this.parent.dom && this.dom) {
            this.newDom = this.enhanceNode(this.toHtml());

            // Render each child of this node
            this.children.forEach((child: VNode) => child.render(this));

            Array.from(this.dom.childNodes).forEach((child: Node) => {
                if (child instanceof Element) {
                    this.newDom?.appendChild(child);
                }
            });

            replace(this.parent.dom, this.dom, this.newDom);
            this.dom = this.newDom;
            this.newDom = undefined;

        }
    }

    render(parent?: VNode | null) {
        this.parent = parent || this.parent;

        if (!this.parent) {
            console.error("No parent found to render in");
        }

        // If the node is already mounted we refresh it, else we render it
        this.isMounted ? this.reRender() : this.firstRender();
    }
}

export default VNode;

function replace(parent: Node, currentChild: Node, newChild: Element) {
    let position = 0;
    if (currentChild.parentElement === parent) {
        // console.log("removing", parent, currentChild, newChild);
        position = Array.prototype.indexOf.call(parent.childNodes, currentChild);
        parent.removeChild(currentChild);
    } else {
        console.warn("Child element not found on parent");
    }
    insertAt(parent, newChild, position);
}

function insertAt(parent: Node, child: Node, index: number) {
    if (!index) index = 0;
    if (index >= parent.childNodes.length) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child, parent.childNodes[index]);
    }
}

/*
TODO:
- Implement a shouldUpdate or needUpdate 
    => For exemple, if we update a class or attribute, it should not rerender as the Element can directly have its dom udpated. 
    => But if we change a prop which change a component, we should rereder 
- Implement lyfecycleHooks (onCreate, created, onMount, mounted, onUpdate, updated, onRemove, removed, onDestroy, destroyed)
*/
