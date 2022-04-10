import LogInPage from "../auth/LogInPage";
import RegisterPage from "../auth/RegisterPage";
import Layout from "../layouts/Layout";
import ChatManager from "../chat/ChatManager";
import Messenger from "../chat/Messenger";
import Profile from "../profile/Profile";
import ChangePassword from "../profile/ChangePassword";
import InternalServerError from "../errors/500"

export const routes =
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: ChatManager,
        default: true,
        children: [
          {
            path: ':id',
            component: Messenger,
          },
        ]
      },
      {
        path: 'profile',
        component: Profile,
        children: [
          {
            path: 'password',
            component: ChangePassword,
          },
        ]
      },
      {
        path: 'auth',
        component: Layout,
        children: [
          {
            path: 'login',
            component: LogInPage,
          },
          {
            path: 'register',
            component: RegisterPage
          },
        ]
      },
      {
        path: '500',
        component: InternalServerError,
      }
    ],
  };
