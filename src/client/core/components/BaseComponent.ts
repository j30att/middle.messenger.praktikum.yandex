// @ts-ignore
import helpers from '../HandleBarsHelpers';
import Handlebars from 'handlebars';
import EventBus from '../class/EventBus';
import { camelize, getUUID } from '../utils';
import { Component, ComponentMeta, EventProps, Props } from './Types';


enum COMPONENT_EVENTS {
  ON_CHANGE_PROPS = 'onChange',
}


export default class BaseComponent {
  eventBus;
  props: Props;
  _element: Element | null;
  _selector: string = 'data-events';
  _meta: ComponentMeta = {tagName: 'div', id: ''};

  constructor(tagName: string = 'div', props: Props = {}) {
    helpers();
    const eventBus = new EventBus();
    this._meta = {tagName, id: getUUID()};
    props = {...props, childrenComponents: []}
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
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

  compileTemplate(template: string, props: Props): Element | null {
    this._element = document.createElement(this._meta.tagName);
    this._element.innerHTML = Handlebars.compile(template, props as CompileOptions)(props);
    this._element = this._element.firstElementChild;
    const child = this.props.childrenComponents;
    if (child) {
      child.forEach((component: Component) => {
    const nodes = this._element?.querySelector(component._meta.tagName.toLowerCase());
        if (nodes){
          nodes.parentNode?.replaceChild(component._element, nodes);
        }
      })
    }
    this._element?.setAttribute('data-id', this._meta.id);
    this.addHandlers()
    return this._element;
  }

  dispatchOnChange() {
    this.eventBus().emit(COMPONENT_EVENTS.ON_CHANGE_PROPS);
  }

  registerEvents(eventBus: EventBus) {
    eventBus.on(COMPONENT_EVENTS.ON_CHANGE_PROPS, this._onChange.bind(this));
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

  private _makePropsProxy(props:Props) {
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

  private _onChange() {
    this._render();
  }

}
