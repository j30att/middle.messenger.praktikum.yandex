// @ts-ignore
import styles from "./profile.module.scss"
import BaseComponent from "../core/components/BaseComponent";

const template = `
      <div class="{{styles}}">  
        <form action="" class="{{styles.form}}">
              {{#each inputs}}
                <div class="{{../styles.control}}">
                  <label for="email" class="{{../styles.label}}">{{this.label}}</label>
                  <input type="{{this.type}}" class="{{../styles.input}}" id="{{this.id}}" value="{{this.value}}" placeholder="Почта">
                </div>
              {{/each}}
                <button type="submit" class="{{styles.submit}}" {{selector}}="changePassword">Сохранить</button>
        </form>
      </div>  
  `;

export default class ChangePassword extends BaseComponent{
  constructor(props = {}) {
    const state = {
      styles:styles,
      inputs: [
        {
          id: 'passwordOld',
          type: 'password',
          value: 'ArtemYev',
          label: 'Старый пароль',
        },
        {
          id: 'passwordNew',
          type: 'password',
          value: 'ArtemYevYVQ',
          label: 'Новый пароль',
        },
        {
          id: 'passwordNewRepeat',
          type: 'password',
          value: 'ArtemYevYVQ',
          label: 'Повторите новый пароль',
        },
      ]
    };

    const _props = {
      ...props,
      ...state
    }

    super('ChangePassword', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }

}
