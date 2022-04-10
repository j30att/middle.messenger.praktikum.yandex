// @ts-ignore
import styles from "./chatManager.module.scss"
import BaseComponent from "../core/components/BaseComponent";

const template = `
    <div class="{{styles.chat}}">
      <div class="{{styles.contacts}}">
        <div class="{{styles.control_wrapper}}">
          <a class="{{styles.profile}}" href="/profile">профиль &rarr;</a>
          <div class="{{styles.search}}">
              <input type="text"
                     placeholder="Поиск"
                     class="{{styles.search-input}}">            
          </div>
        </div>
        <div class="{{styles.cards_wrapper}}">
          {{#each chats}} 
          <div class="{{../styles.card}}" routerLink="/chat/{{this.id}}">
              <div class="{{../styles.card_wrapper}}">
                <div class="{{../styles.avatar}}">{{this.avatar}}</div>
                <div class="{{../styles.text}}">
                    <div class="{{../styles.name}}">{{this.name}}</div>
                    <div class="{{../styles.last-message}}">{{this.lastMessage}}</div>
                </div>
              </div>
              <div class="{{../styles.info}}">
                  <div class="{{../styles.time}}">{{this.createdAt}}</div>
                  {{#if this.unreadMessage}}
                  <div class="{{../styles.unread-message}}">{{this.unreadMessage}}</div>
                  {{/if}}
              </div>
          </div>
          {{/each}}
        </div>
      </div>
      <div class="{{styles.messages}}">
      {{#if showHello}}
          <div class="{{styles.hello_message}}">
            {{hello}}
         </div>
      {{else}}
         <router></router>
      {{/if}}
      </div>
    </div>  
  `;

export default class ChatManager extends BaseComponent{
  constructor(props= {}) {
    const chatService = window['locator'].get('chatService');
    const routerService = window['locator'].get('router');

    const state = {
      hello: 'Выберите чат чтобы отправить сообщение',
      showHello: routerService._path.length === 1,
      styles:styles,
      chats: chatService.getChats()
    };

    const _props = {
      ...props,
      ...state,
    }
    super("ChatManager", _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}


