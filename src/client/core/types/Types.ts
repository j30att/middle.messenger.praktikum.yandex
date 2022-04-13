export type EventProps = {
  event: any,
  handler: EventListener,
}

export type ComponentMeta = {
  id: string,
  tagName: string
}

export interface Properties {
  [key: string]: any
}

export interface ComponentProps extends Properties{
  styles?: Object;
  events?: Array<EventProps>,
  childrenComponents?: Array<Object>
  components?: Array<Object>
}

export interface FormInputProps extends ComponentProps{
  id:string
  value: string,
  type:string,
  name:string,
  showAlert: boolean,
  alertText: string,
  validations: boolean,
  validator?: string,
  eventSelector: string,
}

export interface ChatCardProps  extends ComponentProps {
  avatar: string,
  name:string,
  createdAt: string,
  lastMessage: string,
  unreadMessage: string,
  eventSelector: string,
}

export interface SearchProps extends ComponentProps{
  placeholder: 'Поиск',
  eventSelector: 'searchSelector'
}

export default interface IBaseComponent {
  _element: Element | null,
  _render: Function,
  props: ComponentProps,
  dispatchOnInit: Function,
  dispatchOnChange: Function,
  dispatchOnDestroy: Function,
  registerEvents: Function,
  render: Function,
  getChild: Function,
  removeHandlers: Function,
  addHandlers: Function
}
