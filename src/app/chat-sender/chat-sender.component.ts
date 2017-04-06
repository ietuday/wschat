import { Component, OnInit,ViewEncapsulation,Input} from '@angular/core';
import { WsService } from '../ws.service';
import { WsMessage } from '../ws-message';
import { FormsModule }   from '@angular/forms';
import { ChatData } from '../chat-data';
import {DataGridModule} from 'primeng/primeng';

@Component({
  selector: 'chat-sender',
  templateUrl: './chat-sender.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./chat-sender.component.css']
})
export class ChatSenderComponent implements OnInit {
  @Input() userName:string;
  @Input() chatMessage:string;
  // @Input() chatDate:string;

  constructor() {

  }

  ngOnInit() {
  }


}
