import styles from "./auth.module.scss"
import BaseClass from "../shared/components/BaseClass";

export default class LogInPage extends BaseClass {

  _renderTemplate = '';
  _template = `
    <div class="{{ styles.card }}">
      <h1 class="{{ styles.title }}">{{title}}</h1>
        <form class="{{ styles.form }}">
          <div class="{{ styles.form-input-wrapper }}">
            <div class="{{styles.control}}">
               <span class="{{styles.alert}}">Неверный позывной</span>
               <input type="text"
                     name="login"
                     id="login"
                     placeholder=" "
                     class="{{styles.input-control}}"
                     >
               <label for="login" class="{{styles.label-control}}">Позывной</label>
            </div>
             <div class="{{styles.control}}">
               <input type="password"
                     name="password"
                     id="password"
                     placeholder=" "
                     class="{{styles.input-control}}"
                     >
               <label for="password" class="{{styles.label-control}}">Секретная фраза</label>
            </div>
          </div>
          <button>{{button}}</button>  
        </form>
        {{link "Нет аккаунта?" href=link class="context"}}
    </div>
  `;
  _context = {
    title: 'Входи',
    button: 'Авторизоваться',
    link: '/auth/register',
    styles: styles,
  };

  constructor() {
    super();
    this._renderTemplate = this.render();
  }

}
