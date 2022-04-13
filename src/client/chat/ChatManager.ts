// @ts-ignore
import styles from "./chatManager.module.scss"
import BaseComponent from "../core/components/BaseComponent";
import Search from '../core/components/chat/search/search';
import ChatCard from '../core/components/chat/card/Chat';


const template = `
    <div class="{{styles.chat}}">
      <div class="{{styles.contacts}}">
        <div class="{{styles.control_wrapper}}">
          <a class="{{styles.profile}}" href="/profile">профиль &rarr;</a>
          <Search placeholder="Поиск"></Search>
        </div>
        <div class="{{styles.cards_wrapper}}">
          {{#each chats}}
            <ChatCard
             id="{{this.id}}"
             avatar="{{this.avatar}}"
             name="{{this.name}}"
             lastMessage="{{this.lastMessage}}"
             unreadMessage="{{unreadMessage}}"
             createdAt="{{this.createdAt}}"
            ></ChatCard>
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
      styles:styles,
      hello: 'Выберите чат чтобы отправить сообщение',
      showHello: routerService._path.length === 1,
      chats: chatService.getChats(),
      components:[Search, ChatCard]
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


