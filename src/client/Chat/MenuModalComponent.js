import BaseComponent from "../shared/components/BaseComponent/BaseComponent";
import styles from "./MenuModalComponent.module.scss"

export class MenuModalComponent extends BaseComponent{
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
