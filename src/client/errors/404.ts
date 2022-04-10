// @ts-ignore
import styles from "./errors.module.scss"
import BaseComponent from "../core/components/BaseComponent";

const template = `
      <div class="{{styles.wrapper}}">  
        <h1 class="{{styles.title}}">404</h1>
        <h3 class="{{styles.text}}">Не туда попали</h3>
        <a href="" routerLink="/chat">Назад к чатам</a>
      </div>  
  `;

export default class NotFoundPage extends BaseComponent{
  constructor() {
    const state = {
      styles: styles
    };

    const _props = {
      ...state,
    }

    super('NotFoundPage', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}
