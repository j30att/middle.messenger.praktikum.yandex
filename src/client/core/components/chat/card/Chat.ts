// @ts-ignore
import styles from './Chat.module.scss'
import BaseComponent from '../../BaseComponent';
import { ChatCardProps } from '../../../types/Types';

const template = `
<div class="{{styles.card}}" routerLink="/chat/{{this.id}}">
  <div class="{{styles.card_wrapper}}">
    <div class="{{styles.avatar}}">{{avatar}}</div>
    <div class="{{styles.text}}">
        <div class="{{styles.name}}">{{name}}</div>
        <div class="{{styles.last-message}}">{{lastmessage}}</div>
    </div>
  </div>
  <div class="{{styles.info}}">
      <div class="{{styles.time}}">{{createdat}}</div>
      {{#if unreadmessage}}
      <div class="{{styles.unread-message}}">{{unreadmessage}}</div>
      {{/if}}
  </div>
</div>
`;

export default class ChatCard extends BaseComponent {
  constructor(props: ChatCardProps) {
    const state = {
      styles: styles,
    }
    const _props = {
      ...state,
      ...props
    }
    console.log('_props: ', _props);

   super('ChatCard', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}


