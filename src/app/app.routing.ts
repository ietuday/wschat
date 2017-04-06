import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ChatReceiverComponent } from './chat-receiver/chat-receiver.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent},
  { path: 'chat-receiver', component: ChatReceiverComponent},

];

export const routing = RouterModule.forRoot(routes);
