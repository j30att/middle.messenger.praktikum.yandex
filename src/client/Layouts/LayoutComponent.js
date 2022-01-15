import BaseComponent from "../shared/components/BaseComponent/BaseComponent";
import styles from "./LayoutComponent.module.scss"

export class LayoutComponent extends BaseComponent{
  _template = `
      <div class="{{styles.auth-layout}}">  
        <router>
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
