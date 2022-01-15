export default class ServiceLocator {
  _store = {};

  addInstance(name, service){
    this._store[name] = service;
  }

  get(name){
    return this._store[name];
  }
}
