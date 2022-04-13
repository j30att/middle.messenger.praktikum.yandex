// @ts-ignore
import styles from './search.module.scss'
import BaseComponent from '../../BaseComponent';


const template = `
    <div class="{{styles.search}}">
        <input type="text"
           placeholder="Поиск"
           data-selector="{{eventSelector}}"
           class="{{styles.search-input}}">
    </div>
`;

export default class Search extends BaseComponent {
  constructor(props = {}) {
    const state = {
      styles: styles,
      placeholder: 'Поиск',
      eventSelector: 'searchSelector'
    }

    const _props = {
      ...props,
      ...state,
      events: [{
        event: 'keyup',
        handler: (event: KeyboardEvent) => {
          this.getValue(event);
        },
      }]
    }

    super('Search', _props)
  }

  render() {
    return this.compileTemplate(template, this.props);
  }

  getValue(event: any) {
    console.log(event);
    this.props.value = event.currentTarget.value
  }

}
