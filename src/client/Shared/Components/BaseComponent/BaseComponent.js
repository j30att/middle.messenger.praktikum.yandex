import Handlebars from "handlebars";
import helpers from "../../HandleBarsHelpers";

export default class BaseComponent {
  _renderTemplate ='';
  _template = '';
  _context = {};
  _selector = 'handler';

  addHandlers(){
    const nodeList = document.querySelectorAll(`[${this._selector}]`);
    nodeList.forEach(item => {
      item.addEventListener('click', (event) => {
        const handler = event.currentTarget.getAttribute(this._selector);
        this[handler](event);
      })
    })
  }

  constructor() {
    helpers();
    this._renderTemplate = this.render();
  }

  compile(context) {
    const template = Handlebars.compile(this._template);
    return template(context)
  }

  getRenderedTemplate() {
    return this._renderTemplate
  }

  render() {
    return this.compile(this._context);
  }
}
