import NotFoundPage from '../errors/404';
import { camelize } from '../core/utils';


//todo сервисы буду  типизировать после их вообще нет в задачах
export default class RenderService {

  ROUTER_TAG = 'router';

  _componentStack = [];

  constructor(router: any) {
    this._router = router;
  }

  render() {
    const renderStack = [...this.getPages()];
    console.log(this.getPages());
    let doc = this.ROUTER_TAG;
    while(renderStack.length > 0) {
      const {component, param, path} = renderStack.pop();
      const paramName = path.slice(1);
      const parameter = {};
      if (!!param) {
        parameter[paramName] = param;
      }
      const componentExec = this.createComponent(component, parameter)
      if (componentExec instanceof NotFoundPage) {
        return this.renderComponent(componentExec);
      }
      const template = this.renderComponent(componentExec);
      doc = this.makeHtml(doc, template);
      this._componentStack.push(componentExec)
    }

    return doc;
  }

  makeHtml = (document, template) => {
    const indexTemplate = template.querySelector(this.ROUTER_TAG);
    if (indexTemplate) {
      const parentNode = indexTemplate.parentNode;
      parentNode.append(document);
      indexTemplate.remove();
      return template;
    } else {
      return template
    }
  }

  createComponent(classComponent, param) {
    return new classComponent(param);
  }

  renderComponent = (parent) => {
    const element = parent.render();
    const child = parent.getChild()
    if (child) {
      child.forEach((component) => {
        const nodes = element.querySelectorAll(component.prototype.constructor.name.toLowerCase());
        nodes.forEach((node) => {
          const attr = node.getAttributeNames().reduce((acc, name) => {
            return {...acc, [camelize(name)]: node.getAttribute(name)};
          }, {});
          const childComponent = new component(attr);
          parent.props.childrenComponents.push(childComponent)
          node.parentNode.replaceChild(childComponent.render(), node);
        })
      })
    }
    return element;
  }

  getPages() {
    return this._router.getPath();
  }
}
