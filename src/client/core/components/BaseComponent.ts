// @ts-ignore
import helpers from '../HandleBarsHelpers';
import Handlebars from 'handlebars';
import EventBus from '../libs/EventBus';
import { getUUID } from '../utils';
import { ComponentMeta, EventProps } from '../types/Types';
import { ComponentProps } from '../types/Types';

enum COMPONENT_EVENTS {
  ON_INIT= 'onInit',
  ON_CHANGE_PROPS = 'onChange',
  ON_DESTROY = 'onChange',
}

export default class BaseComponent {
  eventBus;
  props: ComponentProps;
  _element: Element | null;
  _selector: string = 'data-events';
  _meta: ComponentMeta = {tagName: 'div', id: ''};

  constructor(tagName: string = 'div', props: ComponentProps = {}) {
    helpers();
    const eventBus = new EventBus();
    this._meta = {tagName, id: getUUID()};
    props = {...props, childrenComponents: []}
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
  }

  dispatchOnInit() {
    this.eventBus().emit(COMPONENT_EVENTS.ON_INIT);
  }

  dispatchOnChange() {
    this.eventBus().emit(COMPONENT_EVENTS.ON_CHANGE_PROPS);
  }

  dispatchOnDestroy() {
    this.eventBus().emit(COMPONENT_EVENTS.ON_DESTROY);
  }

  registerEvents(eventBus: EventBus) {
    eventBus.on(COMPONENT_EVENTS.ON_CHANGE_PROPS, this._onChange.bind(this));
    eventBus.on(COMPONENT_EVENTS.ON_CHANGE_PROPS, this._onInit.bind(this));
    eventBus.on(COMPONENT_EVENTS.ON_CHANGE_PROPS, this._onDestroy.bind(this));
  }

  render() {
  }

  _render() {
    this.removeHandlers();
    this.render();
    const node = document.querySelector(`[data-id="${this._meta.id}"]`);
    this.addHandlers()
    if (node && this._element) {
      node.parentNode?.replaceChild(this._element, node);
    }
  }

  compileTemplate(template: string, props: ComponentProps): Element | null {
    this._element = document.createElement(this._meta.tagName);
    if (this._element) {
      this._element.innerHTML = Handlebars.compile(template, props as CompileOptions)(props);
      this._element = this._element.firstElementChild;
      const child = this.props.childrenComponents;
      if (child) {
        child.forEach((component: BaseComponent) => {
          const nodes = this._element?.querySelector(component._meta.tagName.toLowerCase());
          if (nodes) {
            nodes.parentNode?.replaceChild(component._element, nodes);
          }
        })
      }
      this._element?.setAttribute('data-id', this._meta.id);
    }
    this.addHandlers()
    return this._element;
  }

  getChild() {
    return this.props.components || null;
  };

  removeHandlers() {
    if (this.props.events) {
      const node = this._element?.querySelector(`[data-selector="${this.props.selector}"]`);
      this.props.events.forEach((eventObj: EventProps) => {
        const event = eventObj.event;
        const func = eventObj.handler;
        node?.removeEventListener(event, func as EventListener);
      });
    }
  }

  addHandlers() {
    if (this.props.events) {
      const node = this._element?.querySelector(`[data-selector="${this.props.eventSelector}"]`);
      this.props.events.forEach((eventObj: EventProps) => {
        const event = eventObj.event;
        const func = eventObj.handler;
        node?.addEventListener(event, func as EventListener);
      });
    }
  }

  private _makePropsProxy(props: ComponentProps) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        let value = target[prop as string];
        return (typeof value === 'function') ? value.bind(target) : value;
      },
      set(target, prop, val) {
        target[prop as string] = val;
        if (prop !== 'value') {
          self.dispatchOnChange();
        }
        return true
      }
    })
  }

  private _onInit() {
    console.log('component init')
  }

  private _onChange() {
    this._render();
  }

  private _onDestroy(){
    console.log('component destroy')
  }


}
