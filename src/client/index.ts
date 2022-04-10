// @ts-ignore
import styles from "./core/style/common.module.scss"
import { routes } from "./routes/Routes"
import RouterService from "./services/RouterService";
import RenderService from "./services/RenderService";
import RouterLink from "./core/directives/RouterLink";
import ServiceLocator from "./services/ServiceLocator";
import ChatService from "./services/ChatService";
import ProfileService from "./services/ProfileService";
import ValidatorService from './services/ValidatorService';
import HttpService from './services/HttpService';

const root = document.querySelector('#root');
document.body.className = styles.clear;

const locator = new ServiceLocator();
const router = new RouterService(routes);
const chatService = new ChatService();
const profileService = new ProfileService();
const renderService = new RenderService(router);
const validatorService = new ValidatorService();
const httpService = new HttpService()

locator.addInstance('router', router);
locator.addInstance('chatService', chatService);
locator.addInstance('profileService', profileService);
locator.addInstance('validatorService', validatorService);
locator.addInstance('httpService', httpService);

window.locator = locator;

let html = renderService.render();

const render = (callback) => {
  root.appendChild(html);
  callback();
}

render(()=>{
  const directive = new RouterLink();
});
