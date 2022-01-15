
export default class RouterService {

  constructor(routeList) {
    this._tree = routeList;
    this._path = this.generatePath();
    console.log('PATH: ', this._path);
  }

  currentUrl() {
    return new URL(document.URL);
  }

  getPath(){
    return this._path;
  }

  generatePath() {
    const URL = this.currentUrl();
    const splitPath = URL.pathname.replace(/\/$/, '').split('/').slice(1);
    if (!splitPath.length){
      const filter = this._tree.children.filter(item => item.default)[0];
      if (filter){
        window.location.href = filter.path;
      }
    }
    return this.bfs(this._tree.children, splitPath);
  }


  bfs(child, path) {
    if (!path.length){
      return [];
    }
    let acc = [];
    let param = '';
    let find = child.find(item => path[0] === item.path);
    if (!find) {
      find = child.find(item => /^:[0-9a-zA-Z-_]/.test(item.path) && !!path[0]);
      if (find){
        param = path[0];
      }
    }

    if (find) {
      acc.push({...find, param: param});
      if (find.children && path.length) {
        acc.push(...this.bfs(find.children, path.slice(1)));
      }
      if (!find.children && path.length > 1) {
        acc.push({path: '404'})
      }
    } else {
      acc.push({path: '404'})
    }
    return acc;
  }

}
