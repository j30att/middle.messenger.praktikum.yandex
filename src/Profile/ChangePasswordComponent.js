import BaseComponent from "../Shared/Components/BaseComponent/BaseComponent";
import styles from "./ProfileComponent.module.scss"

export default class ChangePasswordComponent extends BaseComponent{
  _template = `
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

  _context = {
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

  changePassword(event){
    event.preventDefault();
    console.log('changePasswordFunction');
    window.location.href = '/profile';
  }

  constructor() {
    super();
    this._selector = `${this.constructor.name}Handler`;
    this._context.selector = this._selector;
    this._renderTemplate = this.render();
  }
}
