export type Props = {
  [key: string] : any,
  events?: Array<EventProps>,
  components?: Array<Object>
}

export type EventProps = {
  event: any,
  handler: EventListener,
}

export type ComponentMeta = {
  id: string,
  tagName: string
}

export class Component {
  props: Props
  _meta: ComponentMeta
  _element: Element
  render: Function
}
