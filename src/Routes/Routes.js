import { LogInComponent } from "../Auth/LogInComponent";
import { RegisterComponent } from "../Auth/RegisterComponent";
import { LayoutComponent } from "../Layouts/LayoutComponent";
import { ChatManagerComponent } from "../Chat/ChatManagerComponent";
import { MessengerComponent } from "../Chat/MessengerComponent";
import ProfileComponent from "../Profile/ProfileComponent";
import ChangePasswordComponent from "../Profile/ChangePasswordComponent";

export const routes =
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: ChatManagerComponent,
        default: true,
        children: [
          {
            path: ':id',
            component: MessengerComponent,
          },
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'password',
            component: ChangePasswordComponent,
          },
        ]
      },
      {
        path: 'auth',
        component: LayoutComponent,
        children: [
          {
            path: 'login',
            component: LogInComponent,
          },
          {
            path: 'register',
            component: RegisterComponent
          },
        ]
      }
    ],
  };
