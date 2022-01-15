export default class RouterLinkDirective {
  _selector = 'routerLink';

  constructor() {
    const nodeList = document.querySelectorAll(`[${this._selector}]`);
    nodeList.forEach(item => {
      item.addEventListener('click', (event) => {
        this.handler(event)
      })
    })
  }

  handler(event){
    window.location.href = event.currentTarget.getAttribute(this._selector);
  }
}
