import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
// import {InputTextModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import {ButtonModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {ChatReceiverComponent} from './chat-receiver/chat-receiver.component';
import {TabViewModule} from 'primeng/primeng';
import {ChatSenderComponent} from './chat-sender/chat-sender.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ChatReceiverComponent,
    ChatSenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    TabViewModule,
    InputTextareaModule,
    DataGridModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
