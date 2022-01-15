export default class RenderService {

  ROUTER_TAG = '<router>';

  _componentStack = [];

  constructor(router) {
    this._router = router;
  }

  render() {
    const renderStack = [...this.getTree()];
    let doc = this.ROUTER_TAG;
    while(renderStack.length > 0) {
      const {component, param, path} = renderStack.pop();
      const paramName = path.slice(1);
      const parameter = {};
      if (!!param) {
        parameter[paramName] = param;
      }
      const componentExec = this.createComponent(component, parameter)
      const template = this.renderComponent(componentExec);
      doc = this.makeHtml(doc, template);
      this._componentStack.push(componentExec)
    }
    return doc;
  }

  addHandlers() {
    const componentStack = [...this._componentStack];
    while(componentStack.length > 0) {
      const component = componentStack.pop();
      component.addHandlers();
    }

  }

  makeHtml = (document, template) => {
    const indexTemplate = template.indexOf(this.ROUTER_TAG);
    if (indexTemplate === -1) {
      return template
    } else {
      return template.replace(this.ROUTER_TAG, document)
    }
  }

  createComponent(classComponent, param) {
    return new classComponent(param);
  }

  renderComponent = (component) => {
    return component.getRenderedTemplate()
  }

  getTree() {
    return this._router.getPath();
  }
}
