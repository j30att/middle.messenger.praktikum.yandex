// @ts-ignore
import styles from "./layout.module.scss"
import BaseComponent from "../core/components/BaseComponent";
import { Props } from '../core/components/ComponentProps';

const template = `
  <div class="{{styles.auth-layout}}">  
    <router>
  </div>  
`;

export default class Layout extends BaseComponent{
  constructor(params: Props) {
    const state = {
      styles:styles
    }

    const props = {
      ...state,
      ...params
    }

    super('Layout', props);
  }

  render() {
    return this.compileTemplate(template, this.props.state);
  }
}
