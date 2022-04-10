import ServiceLocator from '../../services/ServiceLocator';

export {};

declare global {
  interface Window {
    locator: ServiceLocator;
  }
}
