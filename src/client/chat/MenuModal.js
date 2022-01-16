import styles from "./menuModal.module.scss"
import BaseClass from "../shared/components/BaseClass";

export default class MenuModalComponent extends BaseClass{
  _template = `
      <div class="MENUAA">  
        CHAT MODAL COMPONENT
      </div>  
  `;

  _context = {
    styles:styles
  };

  constructor() {
    super();
    this._renderTemplate = this.render();
  }
}
