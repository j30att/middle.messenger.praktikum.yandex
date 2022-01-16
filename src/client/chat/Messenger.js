import styles from "./messenger.module.scss";
import { attach } from "../shared/icon/attach.svg";
import { dotsSvg } from "../shared/icon/dots.svg"
import { imgSvg } from "../shared/icon/img.svg"
import { fileSvg } from "../shared/icon/file.svg"
import { pointSvg } from "../shared/icon/point.svg"
import MenuModalComponent from "./MenuModal";
import BaseClass from "../shared/components/BaseClass";


export default class Messenger extends BaseClass {
  _template = `
      <div class="{{styles.messengerWrapper}}">
        <div class="{{styles.header}}">
          <div class="{{styles.companion}}">
              <div class="{{styles.avatar}}">{{opponent.avatar}}</div>
              <div class="{{styles.title}}">{{opponent.name}}</div>
          </div>
          <MenuModalComponent row="headerMenu">
          <input type="checkbox" class="{{styles.checkBoxMenu}}" id="user-toggle">
          <label for="user-toggle" class="{{styles.navButton}}">
            <div class="{{styles.menu}}">
                {{{svg.menu}}}
            </div>
          </label>
          <div class="{{styles.modalMenu}} {{styles.modalMenuUser}}">
            <div class="{{styles.attachItem}}">{{{svg.img}}} <span>Добавить пользователя</span></div>
            <div class="{{styles.attachItem}}">{{{svg.file}}} <span>Удалить пользователя</span></div>
          </div>
        </div>
        <div class="{{styles.history}}">
            <div class="{{styles.date}}">{{date}}</div>
            <div class="{{styles.leftMessage}}">
                <div class="{{styles.text}}">
                {{messageL.text}}
                </div>
                <div class="{{styles.time}}">{{messageL.time}}</div>    
            </div>
            <div class="{{styles.leftMessageImage}}">
                <div class="{{styles.img}}">
                    <img src="/images/krakra.jpg">
                    <div class="{{styles.time}}">{{messageL.time}}</div>    
                </div>
            </div>
            <div class="{{styles.rightMessage}}">
                <div class="{{styles.rightMessageWrapper}}">
                    <div class="{{styles.text}}">{{messageR.text}}</div>
                    <div class="{{styles.check}}">{{{messageR.check}}}</div>
                    <div class="{{styles.time}}">{{messageR.time}}</div>
                </div>
            </div>
        </div>
        <div class="{{styles.footer}}">
          <form class="{{styles.formMessenger}}">
              <input type="checkbox" class="{{styles.checkBoxAttach}}" id="attach-toggle">
              <label for="attach-toggle" class="{{styles.navButton}}">
                <span>{{{svg.attach}}}</span>
              </label>
              <div class="{{styles.modalMenu}} {{styles.modalMenuAttach}}">
                  <div class="{{styles.attachItem}}">{{{svg.img}}} <span>Фото или видео</span></div>
                  <div class="{{styles.attachItem}}">{{{svg.file}}} <span>Файл</span></div>
                  <div class="{{styles.attachItem}}">{{{svg.point}}}<span>Локация</span></div>
              </div>
              <input type="text" class="{{styles.editor}}" placeholder="Сообщение">
              <button type="submit" class="{{styles.submit}}">&rarr;</button>
          </form>
        </div>
      </div>  
  `;

  _context = {
    svg: {
      attach: attach,
      menu: dotsSvg,
      img: imgSvg,
      file: fileSvg,
      point: pointSvg
    },
    styles: styles,
    date: '19 июня',
    opponent: {
      name: 'Kolban Butilkin',
      avatar: 'K',
    },
    messageL: {
      text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории
        — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов
        на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову
        говоря, все тушки этих камер все еще находятся на поверхности Луны,
        так как астронавты с собой забрали только кассеты с пленкой.`,
      date: '19 июня',
      time: '11:56',
    },
    messageR: {
      text: 'Круто!',
      check: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>`,
      date: '19 июня',
      time: '12:00',
    },
    headerMenu: [
      {
        title: 'Добавить пользователя'
      },
      {
        title: 'Удалить пользователя'
      }
    ]
  };

  components = [
    MenuModalComponent
  ]

  constructor(param) {
    super();
    this.preRender();
    this._renderTemplate = this.render();
  }

  preRender(){
    const domParser = new DOMParser();
    const dom = domParser.parseFromString(this._template, "text/html")
    const elem = dom.querySelector('MenuModalComponent');
    const attr = elem.attributes
    console.log('elem: ', elem);
    console.log('elem: ', elem.attributes);

    // this.components.forEach((item) => {
    //   console.log('item: ', item);
    // })
  }
}
