// @ts-ignore
import styles from "./profile.module.scss";
import BaseComponent from "../core/components/BaseComponent";

const template = `  
        <div class="{{styles.profileWrapper}}">
          <div class="{{styles.backWrapper}}">
            <a href="/chat" class="{{styles.backButton}}">
                &larr;
            </a>
          </div>
          <div class="{{styles.avatar}}">{{profile.avatar}}</div>
          <div class="{{styles.name}}">{{profile.name}}</div>
          {{#if router}}
            <router>
          {{else}}
            <form action="" class="{{styles.form}}">
              {{#each profile.inputs}}
                <div class="{{../styles.control}}">
                  <label for="email" class="{{../styles.label}}">{{this.label}}</label>
                  <input type="text" class="{{../styles.input}}" id="{{this.type}}" value="{{this.value}}" placeholder="Почта">
                </div>
              {{/each}}
                <button type="submit" class="{{styles.submit}}" style="display: none" >Сохранить</button>
            </form>
            <div class="{{styles.controls}}">
              <div class="{{styles.footerControl}}">
                  <div class="{{styles.link}}">Изменить данные</div>
              </div>
              <div class="{{styles.footerControl}}" routerLink="profile/password">
                  <div class="{{styles.link}}">Изменить пароль</div>
              </div>
              <div class="{{styles.footerControl}}">
                  <div class="{{styles.exit}}">Выйти</div>
              </div>
            </div>
          {{/if}}  
        </div>
  `;

export default class Profile extends BaseComponent {
  constructor(props = {}) {
    const state = {
      styles: styles,
    }


    // @ts-ignore
    const _profileService = window['locator'].get('profileService');
    // @ts-ignore
    const _routerService = window['locator'].get('router');

    const _props = {
      ...props,
      ...state,
      profile: _profileService.getProfile(),
      router: _routerService._path.length > 1,
      selector: 'ProfileHandler',
      // events: [
      //   {
      //     click: event => {
      //       this.changeState()
      //     },
      //   }
      // ]
    }

    super('Profile', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }

  changeState(){
    // const elem = document.querySelector(`.${styles.submit}`);
    // if (elem){
    //   const controls = document.querySelector(`.${styles.controls}`);
    //   if (elem.style.display === 'none') {
    //     elem.style.display = 'block';
    //     controls.style.display = 'none';
    //   } else {
    //     elem.style.display = 'none'
    //     controls.style.display = 'block';
    //   }
    // }
  }
}
