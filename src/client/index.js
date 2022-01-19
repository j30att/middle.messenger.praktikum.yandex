import styles from "./shared/style/common.module.scss"
import { routes } from "./routes/Routes"
import RouterService from "./services/RouterService";
import RenderService from "./services/RenderService";
import RouterLink from "./shared/directives/RouterLink";
import ServiceLocator from "./services/ServiceLocator";
import ChatService from "./services/ChatService";
import ProfileService from "./services/ProfileService";

const root = document.querySelector('#root');
document.body.className = styles.clear;

const locator = new ServiceLocator();
const router = new RouterService(routes);
const chatService = new ChatService();
const profileService = new ProfileService();
const renderService = new RenderService(router);

locator.addInstance('router', router);
locator.addInstance('chatService', chatService);
locator.addInstance('profileService', profileService);
window.locator = locator;


let html = renderService.render();



const render = (callback) => {
  root.innerHTML = html;
  callback();
}

render(()=>{
  const directive = new RouterLink();
  renderService.addHandlers();
});




