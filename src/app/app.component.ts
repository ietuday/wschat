import { Component } from '@angular/core';
import { WsService } from './ws.service';
import {WsMessage} from './ws-message';
import {ButtonModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login Form';

  constructor() {
    WsService.getInstance().connect();
  }

}
