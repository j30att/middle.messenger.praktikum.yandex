// @ts-ignore
import styles from "./auth.module.scss"
import BaseComponent from "../core/components/BaseComponent";
import FormInput from '../core/components/form/formInput/input.component';
import { Component } from '../core/components/Types';

//todo выделить отдельный компонент формы

const template = `
  <div class="{{ styles.card-wrapper_register }}">
    <div class="{{ styles.card }}">
      <h1 class="{{ styles.title }}">{{title}}</h1>
        <form class="{{ styles.form }}" data-selector="{{eventSelector}}">
          <div class="{{styles.register-form-input-wrapper}}">
            <FormInput 
                id="email"
                title="Почта" 
                name="email"
                type="email"
                validator="emailValidator" 
            ></FormInput> 
            <FormInput 
                id="nick"
                title="Ник нейм" 
                name="nick"
                type="text" 
            ></FormInput>
            <FormInput 
                id="name"
                title="Имя" 
                name="name"
                type="text"
                validator="initialsValidator" 
            ></FormInput>
            <FormInput 
                id="surname"
                title="Фамилия" 
                name="surname"
                type="text" 
                validator="initialsValidator"
            ></FormInput>
            <FormInput 
                id="phone"
                title="Телефон" 
                name="phone"
                type="text"
                validator="phoneValidator"
            ></FormInput>
            <FormInput 
                id="password"
                title="Пароль"
                name="password"
                type="password"
            ></FormInput>
            <FormInput 
                id="passwordRepeat"
                title="Пароль (Еще раз)"
                name="passwordRepeat"
                type="password"
            ></FormInput>
          </div>
          {{#if  showAlert}}
          <span class="{{ styles.alert }}">{{ alertText }}</span>
          {{else}}
          <span class="{{ styles.alert-none }}">{{ alertText }}</span>
          {{/if}}
          <button>{{button}}</button>  
        </form>
        {{link "Войти" href=link class="context"}}
    </div>
  </div>
  `;

export default class RegisterPage extends BaseComponent{
  constructor(props= {}) {
    const state = {
      title: 'Регистрация',
      button: 'Зарегестрироваться',
      link: '/auth/login',
      styles: styles,
    };

    const _props = {
      ...props,
      ...state,
      components: [FormInput],
      eventSelector: 'formSelector',
      alertText:'',
      showAlert: false,
      events: [
        {
          event: 'submit',
          handler: (event: any) => {
            this.validateForm(event)
          },
        },
      ]
    }

    super("RegisterPage", _props);
  }


  validateForm(event: any){
    event.preventDefault();
    const result = this.props.childrenComponents.filter((formField: Component) => formField.props.validations && formField.props.value)
    if (this.props.childrenComponents.length !== result.length){
      this.props.alertText = 'Форма не валидна';
      this.props.showAlert = true;
    }
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}
