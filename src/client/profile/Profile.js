import BaseClass from "../shared/components/BaseClass";
import styles from "./profile.module.scss";

export default class Profile extends BaseClass {

  _template = `  
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
                <button type="submit" class="{{styles.submit}}" style="display: none" {{selector}}="sendData">Сохранить</button>
            </form>
            <div class="{{styles.controls}}">
              <div class="{{styles.footerControl}}">
                  <div class="{{styles.link}}" {{selector}}="changeState">Изменить данные</div>
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


  _context = {
    styles: styles,
  };

  _profileService
  _routerService

  sendData(event){
    event.preventDefault();
    this.changeState();
  }

  changeState(){
    const elem = document.querySelector(`.${styles.submit}`);
    const controls = document.querySelector(`.${styles.controls}`);
    console.log(elem.style.display);
    if (elem.style.display === 'none') {
      elem.style.display = 'block';
      controls.style.display = 'none';
    } else {
      elem.style.display = 'none'
      controls.style.display = 'block';
    }
  }


  constructor() {
    super();
    this._profileService = window.locator.get('profileService');
    this._routerService = window.locator.get('router');
    this._context.profile = this._profileService.getProfile();
    this._context.router = this._routerService._path.length > 1;
    this._selector = `${this.constructor.name}Handler`;
    this._context.selector = this._selector;
    this._renderTemplate = this.render();
  }


}
