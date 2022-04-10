// @ts-ignore
import styles from './input.module.scss';
import BaseComponent from '../../BaseComponent';
import { Props } from '../../Types';

const template = `
  <div class="{{ styles.control }}">
  {{#if  showAlert}}
    <span class="{{ styles.alert }}">{{ alertText }}</span>
    {{else}}
    <span class="{{ styles.alert-none }}">{{ alertText }}</span>
  {{/if}}
    <input
        autocomplete="false"
        data-events
        type="{{type}}"
        value="{{value}}"
        name="{{name}}"
        id="{{name}}"
        placeholder=" "
        data-selector="{{eventSelector}}"
        class="{{ styles.input-control }}"
    >
    <label for="{{name}}" class="{{styles.label-control}}">{{ title }}</label>
  </div>
  `;

export default class FormInput extends BaseComponent {
  constructor(params: Props) {
    const state = {
      styles: styles,
      showAlert: false,
      alertText: '',
      value: null,
      validations: true
    };

    const {validator} = params;
    let props = {
      ...state,
      ...params,
      eventSelector: 'inputSelector',
      events: [{
        event: 'keyup',
        handler: (event: EventTarget) => {
          this.getValue(event);
        },
      }]
    }


    if (validator) {
      // @ts-ignore
      const validatorService = window['locator'].get('validatorService');
      props = {
        ...props,
        events: [...props.events,
          {
            event: 'blur',
            handler: (event: EventTarget) => {
                this.validate(event, validatorService[validator])
              },
          },
          //todo падает ошибка пока не понимаю как исправить.
          // {
          //   event: 'focus',
          //   handler: event => {
          //     this.validate(event, validatorService[validator]);
          //   },
          // },
        ]
      }
    }

    // @ts-ignore
    super('FormInput', props);
  }

  render() {
    return this.compileTemplate(template, this.props);
  }

  validate(event: EventTarget, validator: Function) {
    const validate = validator(event);
    if (validate.result && validate.message === this.props.alertText) return true;
    this.toggleAlert(!validate.result, validate.message);
  }

  getValue(event: any) {
    console.log(event);
    this.props.value = event.currentTarget.value
  }

  toggleAlert(flag: boolean, text: string){
    this.props.alertText = text;
    this.props.showAlert = flag;
    this.props.validations = !flag;
  }
}
