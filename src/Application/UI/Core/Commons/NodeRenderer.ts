import { replace } from "@ui/Core/Commons/DomHelper";
import VNode from "@ui/Core/Commons/VNode";

enum Renderables {
  Classes,
  Attributes,
  Dom,
  Listeners,
  Tag,
  Content,
}

class RenderDispatcher {
  [Renderables.Classes]: Boolean = false;
  [Renderables.Attributes]: Boolean = false;
  [Renderables.Dom]: Boolean = false;
  [Renderables.Listeners]: Boolean = false;
  [Renderables.Tag]: Boolean = false;
  [Renderables.Content]: Boolean = false;
}

class NodeRenderer {
  #node: VNode;
  renderDispatcher: RenderDispatcher = new RenderDispatcher();

  constructor(node: VNode) {
    this.#node = node;
  }

  dispatch(part: keyof RenderDispatcher, value: Boolean = true) {
    this.renderDispatcher[part] = value;
  }

  /**
   * Depending on which part has to be refreshed, call different rendering methods
   * and avoid to rerender the whole dom element for optimization
   */
  applyRender() {
    (this.renderDispatcher[Renderables.Dom] ||
      this.renderDispatcher[Renderables.Tag]) &&
      this.#renderDom();
    this.renderDispatcher[Renderables.Attributes] && this.#renderAttributes();
    this.renderDispatcher[Renderables.Classes] && this.#renderClasses();
    this.renderDispatcher[Renderables.Content] && this.#renderContent();
    this.renderDispatcher[Renderables.Listeners] && this.#renderListeners();
  }

  #renderDom() {
    this.#node.isMounted ? this.#reRender() : this.#firstRender();
    this.renderDispatcher[Renderables.Dom] = false;
    this.renderDispatcher[Renderables.Tag] = false;
  }

  #renderClasses() {
    if (this.#node.dom) {
      this.#node.dom.setAttribute("class", this.#node.classes.join(" "));
      this.renderDispatcher[Renderables.Classes] = false;
    }
  }
  #renderAttributes() {
    Object.keys(this.#node.attributes).forEach((attributeKey: string) => {
      this.#node.dom &&
        this.#node.dom.setAttribute(
          attributeKey,
          this.#node.attributes[attributeKey]
        );
    });
    this.renderDispatcher[Renderables.Attributes] = false;
  }
  #renderContent() {
    if (this.#node.dom) {
      this.#node.dom.innerHTML = this.#node.content;
      this.renderDispatcher[Renderables.Content] = false;
    }
  }
  #renderListeners() {
    //TODO
    this.#node.listeners.forEach((listener: TEventListener) => {
      !listener.attached &&
        this.#node.dom?.addEventListener(listener.name, listener.callback);
      listener.attached = true;
    });
    this.renderDispatcher[Renderables.Listeners] = false;
  }

  #firstRender() {
    if (this.#node.parent) {
      this.#node.dom = this.#node.create();

      if (this.#node.content) {
        this.#node.dom.innerHTML = this.#node.content;
      } else {
        this.#node.children.forEach((child: VNode) => child.render(this.#node));
      }

      this.#node.parent.dom?.append(this.#node.dom);
      this.#node.isMounted = true;
    }
  }

  #reRender() {
    if (this.#node.parent?.dom && this.#node.dom) {
      this.#node.newDom = this.#node.create();

      if (this.#node.content) {
        this.#node.dom.innerHTML = this.#node.content;
      } else {
        this.#node.children.forEach((child: VNode) =>
          child.renderer.render(this.#node)
        );
      }

      Array.from(this.#node.dom.childNodes).forEach((child: Node) => {
        if (child instanceof Element) {
          this.#node.newDom?.appendChild(child);
        }
      });

      replace(this.#node.parent.dom, this.#node.dom, this.#node.newDom);
      this.#node.listeners.forEach((listener: TEventListener) => {
        this.#node.dom?.removeEventListener(listener.name, listener.callback);
        listener.attached = false;
      });
      this.#node.dom = this.#node.newDom;
      this.#node.newDom = undefined;
    }
  }

  render(parent?: VNode | null) {
    if (this.#node.parent && parent && parent !== this.#node.parent) {
      this.dispatch(Renderables.Dom);
    }
    this.#node.parent = parent || this.#node.parent;

    this.applyRender();
    // If the node is already mounted we refresh it, else we render it
  }
}

export { NodeRenderer, Renderables, RenderDispatcher };
