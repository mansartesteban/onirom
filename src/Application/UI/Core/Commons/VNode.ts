/// <reference path="UI.d.ts" />

import Registry from "@commons/Registry";
import Slot from "@ui/Core/Commons/Slot";
import VNodeRegistry from "@ui/Core/Commons/VNodeRegistry";
import NodeId from "@ui/Core/Commons/NodeId";
import VMount from "@ui/Core/Commons/VMount";
import { defineProps, h } from "@ui/Core/Commons/Framework";

import { NodeRenderer, Renderables } from "@ui/Core/Commons/NodeRenderer";

class VNode implements IVNode {
  identifier: NodeId;

  #slots: Slot[] = [];
  #props: TProps;
  #children: VNode[] = [];
  #classes: string[] = [];
  #content: string = "";
  #tag: string = "";
  #attributes: { [name: string]: any } = {};
  #listeners: TEventListener[] = [];

  parent?: VNode;
  target?: VMount;
  dom?: Element;
  newDom?: Element;
  isMounted: Boolean = false;

  renderer: NodeRenderer = new NodeRenderer(this);

  constructor(props?: TProps, tag: string = "", children: VNode[] = []) {
    this.identifier = new NodeId();

    let nodeRegistry = Registry.get("vnode") as VNodeRegistry;
    nodeRegistry.register(this);

    this.#props = props || {};
    this.#tag = tag;
    this.#children = children;
    this.setup();
  }

  setup() {}

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
  get listeners(): TEventListener[] {
    return this.#listeners;
  }
  get content() {
    return this.#content;
  }
  get attributes(): { [name: string]: any } {
    return this.#attributes;
  }
  get tag() {
    return this.#tag;
  }

  set props(props: TProps) {
    this.#props = props;
  }
  set slots(slots: Slot) {
    this.#slots.push(slots);
  }
  set children(children: VNode | VNode[]) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    this.#children = children;
  }
  set classes(classes: string[]) {
    this.renderer.dispatch(Renderables.Classes);
    this.#classes = classes.filter(Boolean);
  }
  set listeners(listeners: TEventListener) {
    this.renderer.dispatch(Renderables.Listeners);
    this.#listeners.push(listeners);
  }
  set content(content: string) {
    this.renderer.dispatch(Renderables.Content);
    this.#content = content;
  }
  set attributes(attributes: { [name: string]: any }) {
    this.renderer.dispatch(Renderables.Attributes);
    this.#attributes = { ...this.#attributes, ...attributes };
  }
  set tag(tag: string) {
    this.renderer.dispatch(Renderables.Tag);
    this.#tag = tag;
  }

  h(element: string | VNode, props?: TProps, children?: VNode[]) {
    const node = h(element, props, children);
    node.parent = this;
    this.children = node;
    node.render();
  }

  defineProps(props: TProps): TProps {
    let definedProps = defineProps(props, this.props);

    let proxy = new Proxy(definedProps, {
      get: (_, key: string) => definedProps[key],
      set: (obj: {}, prop: string, value: any): boolean => {
        // Don't reaffect var nor trigger render if value is the same
        const update = value !== definedProps[prop];
        if (update) {
          Reflect.set(obj, prop, value);
          definedProps.__notify(prop);
          this.render();
        }
        return update;
      },
    });

    this.props = proxy;
    return this.props;
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
    this.#listeners.push({ name: eventName, callback, attached: false });
  }

  createElement(tag: string = "div", props?: TElementProps) {
    let element = document.createElement(tag);

    if (props?.id) {
      element.id = props.id;
    }

    return element;
  }

  create(): Element {
    return this.createElement();
  }

  render(parent?: VNode) {
    if (!this.isMounted) {
      this.renderer.dispatch(Renderables.Dom);
      this.classes.length && this.renderer.dispatch(Renderables.Classes);
      this.listeners.length && this.renderer.dispatch(Renderables.Listeners);
      this.attributes.length && this.renderer.dispatch(Renderables.Attributes);
      this.content && this.renderer.dispatch(Renderables.Content);
    }

    this.renderer.render(parent);
  }
}

export default VNode;

/*
TODO
- Implement lyfecycleHooks (onCreate, created, onMount, mounted, onUpdate, updated, onRemove, removed, onDestroy, destroyed)
- Implement unmount, destroy
- If several props are changed in the same scope, the vnode will rerender as many times as there are updates 
    => Create a "renderQueue" which will store all modification to bring before to render
    => When "transactions" are finished, call the render method of the node
    => Call a nextTick callbacks at the end of render (nextTick could be global or individual)
- If the value changed is not a prop (attribute, callback ...) render method is not called

*/
