import styles from "../src/Shared/css/Common.module.scss"
import { routes } from "./Routes/Routes"
import RouterService from "./Services/RouterService";
import RenderService from "./Services/RenderService";
import RouterLinkDirective from "./Shared/Directives/RouterLinkDirective";
import ServiceLocator from "./Services/ServiceLocator";
import ChatService from "./Services/ChatService";
import ProfileService from "./Services/ProfileService";

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
  const directive = new RouterLinkDirective();
  renderService.addHandlers();
});




