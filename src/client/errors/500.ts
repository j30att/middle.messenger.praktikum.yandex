// @ts-ignore
import styles from "./errors.module.scss"
import BaseComponent from "../core/components/BaseComponent";

const template = `
      <div class="{{styles.wrapper}}">  
        <h1 class="{{styles.title}}">500</h1>
        <h3 class="{{styles.text}}">Мы уже фиксим</h3>
        <a href="" routerLink="/chat">Назад к чатам</a>
      </div>  
  `;

export default class InternalServerError extends BaseComponent{
  constructor() {
    const state = {
      styles: styles
    };

    const _props = {
      ...state,
    }

    super('InternalServerError', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}
