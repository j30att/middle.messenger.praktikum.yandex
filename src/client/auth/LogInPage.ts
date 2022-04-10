// @ts-ignore
import styles from './auth.module.scss'
import BaseComponent from '../core/components/BaseComponent';
import FormInput from '../core/components/form/formInput/input.component';

const template = `
    <div class="{{ styles.card-wrapper }}">
      <div class="{{ styles.card }}">
        <h1 class="{{ styles.title }}">{{title}}</h1>
          <form class="{{ styles.form }}">
            <div class="{{ styles.form-input-wrapper }}">
              <FormInput 
                id="login"
                title="Логин" 
                name="login"
                type="text" 
                ></FormInput>
              <FormInput 
                id="password"
                title="Пароль"
                name="password"
                type="password"
                ></FormInput>
            </div>
            <button data-events>{{button}}</button>  
          </form>
          {{link "Нет аккаунта?" href=link class="context"}}
      </div>
    </div>
  `;

export default class LogInPage extends BaseComponent {
  constructor(props = {}) {
    const state = {
      title: 'Входи',
      button: 'Авторизоваться',
      link: '/auth/register',
      styles: styles,
    };

    const _props = {
      ...props,
      ...state,
      components: [FormInput],
    }

    super('LoginPage', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}
