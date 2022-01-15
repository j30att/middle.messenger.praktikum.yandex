import helpers from "../Shared/HandleBarsHelpers";
import styles from "../Shared/css/AuthFroms.module.scss"
import BaseComponent from "../shared/components/BaseComponent/BaseComponent";

const Handlebars = require("handlebars");

export class RegisterComponent extends BaseComponent{
  _template = `
    <div class="{{ styles.card }}">
      <h1 class="{{ styles.title }}">{{title}}</h1>
        <form class="{{ styles.form }}">
           <div class="{{styles.register-form-input-wrapper}}"> 
             <div class="{{styles.control}}">
              <span class="{{styles.alert}}">Почта</span>
                 <input type="text"
                       name="email"
                       id="email"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                <label for="email" class="{{styles.label-control}}">Почта</label>
             </div>
             <div class="{{styles.control}}">
                <span class="{{styles.alert}}"></span>
                <input type="text"
                       name="login"
                       id="login"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                 <label for="login" class="{{styles.label-control}}">Позывной</label>
             </div>
             
             <div class="{{styles.control}}">
                <span class="{{styles.alert}}"></span>
                <input type="text"
                       name="name"
                       id="name"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                <label for="name" class="{{styles.label-control}}">Имя</label>
             </div>
             
             <div class="{{styles.control}}">
                <span class="{{styles.alert}}"></span>
                <input type="text"
                       name="surname"
                       id="surname"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                <label for="surname" class="{{styles.label-control}}">Фамилия</label>
             </div>
             
             <div class="{{styles.control}}">
                <span class="{{styles.alert}}"></span>
                <input type="number"
                       name="phone"
                       id="phone"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                <label for="phone" class="{{styles.label-control}}">Телефон</label>
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
              <div class="{{styles.control}}">
                 <input type="password"
                       name="passwordRepeat"
                       id="passwordRepeat"
                       placeholder=" "
                       class="{{styles.input-control}}"
                       >
                 <label for="passwordRepeat" class="{{styles.label-control}}">Секретная фраза (Еще раз)</label>
              </div>
             </div>
            
            <button>{{button}}</button>  
        </form>
        {{link "Войти" href=link class="context"}}
    </div>
  `;

  _context = {
    title: 'Регистрация',
    button: 'Авторизоваться',
    link: '/auth/login',
    styles: styles,

  };

  constructor() {
    super();
    this._renderTemplate = this.render();
  }

}
