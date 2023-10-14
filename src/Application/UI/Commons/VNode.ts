/// <reference path="UI.d.ts" />

import Slot from "./Slot";
import Registry from "@/Application/Commons/Registry";
import VNodeRegistry from "./VNodeRegistry";
import NodeId from "./NodeId";
import VMount from "./VMount";
import Framework from "./Framework";

class VNode implements IVNode {
  identifier: NodeId;

  #slots: Slot[] = [];
  #props: TProps;
  #children: VNode[] = [];
  #classes: string[] = [];

  #observers: { name: string; callback: EventListenerOrEventListenerObject }[] =
    [];

  parent?: VNode;
  target?: VMount;
  dom?: Element;
  newDom?: Element;

  constructor(props?: TProps) {
    this.identifier = new NodeId();

    let nodeRegistry = Registry.get("vnode") as VNodeRegistry;
    nodeRegistry.register(this);

    this.#props = props || {};
  }

  get props(): { [name: string]: any } {
    return this.#props;
  }
  get slots(): { [name: string]: VNode } {
    let slots: { [name: string]: any } = {};
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
    this.props = Framework.defineProps(props, this.props);
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
    element.setAttribute("data-id", this.identifier.id);
    if (props?.id) {
      element.id = props.id;
    }

    props?.attributes?.forEach((attribute: TElementAttribute) =>
      element.setAttribute(attribute.name, attribute.value || "")
    );

    props?.classes?.forEach((classe: string) => element.classList.add(classe));
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

  // refresh() {

  //     console.log("refresh", this.dom, this.parent, this.parent?.dom);

  //     if (this.dom && this.parent && this.parent.dom) {
  //         let children = this.children;
  //         console.log("children", children);
  //         this.parent.dom.removeChild(this.dom);
  //         this.toHtml();
  //         Array.from(children).forEach((child: VNode) => {
  //             this.dom && child.dom && this.dom.appendChild(child.dom);
  //             child.refresh();
  //         });
  //         this.parent.dom.appendChild(this.dom);

  //     } else {
  //         this.render();
  //     }
  // }

  render(parent?: VNode | null, first: Boolean = false) {
    this.parent = parent || this.parent;

    console.log("render", this.parent, this.parent?.dom, this.parent?.newDom);
    if (this.parent) {
      this.newDom = this.enhanceNode(this.toHtml());

      console.log("new dom", this.newDom);

      this.#children.forEach((child: VNode) => {
        child.render(this);
      });
      if (this.parent.dom && this.dom) {
        this.parent.dom.removeChild(this.dom);
      }

      console.log("paretn  new dom ?", this.parent.newDom);
      this.dom = this.newDom;
      (this.parent.newDom || this.parent.dom)?.appendChild(this.newDom);
      //   if (first) {
      //     this.parent.dom?.appendChild(this.newDom);
      //   } else {
      //     this.parent.newDom?.appendChild(this.newDom);
      //   }
      this.newDom = undefined;
    }
  }
}

export default VNode;
