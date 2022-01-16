import styles from "./layout.module.scss"
import BaseClass from "../shared/components/BaseClass";

export default class Layout extends BaseClass{
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
