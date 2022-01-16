import styles from "./errors.module.scss"
import BaseClass from "../shared/components/BaseClass";

export default class NotFoundPage extends BaseClass{
  _template = `
      <div class="{{styles.wrapper}}">  
        <h1 class="{{styles.title}}">404</h1>
        <h3 class="{{styles.text}}">Не туда попали</h3>
        <a href="" routerLink="/chat">Назад к чатам</a>
      </div>  
  `;

  _context = {
    styles: styles
  };

  constructor() {
    super();
    this._renderTemplate = this.render();
  }
}
