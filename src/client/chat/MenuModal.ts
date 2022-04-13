// @ts-ignore
import styles from "./menuModal.module.scss"
import BaseComponent from "../core/components/BaseComponent";

const template = `
      <div class="MENUAA">  
        CHAT MODAL COMPONENT
      </div>  
  `;

export default class MenuModalComponent extends BaseComponent{
  constructor(props= {}) {
    const state = {
      styles:styles
    };

    const _props = {
      ...props, ...state
    }
    super('MenuModal', _props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }
}
