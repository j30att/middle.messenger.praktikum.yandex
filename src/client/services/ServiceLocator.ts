export default class ServiceLocator {
  _store = {};

  public addInstance(name, service) {
    this._store[name] = service;
  }

  public get(name) {
    return this._store[name];
  }
}
