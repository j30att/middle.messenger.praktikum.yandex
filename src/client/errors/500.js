import styles from "./errors.module.scss"
import BaseClass from "../shared/components/BaseClass";

export default class InternalServerError extends BaseClass{
  _template = `
      <div class="{{styles.wrapper}}">  
        <h1 class="{{styles.title}}">500</h1>
        <h3 class="{{styles.text}}">Мы уже фиксим</h3>
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
