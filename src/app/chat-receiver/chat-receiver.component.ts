import { Component, OnInit,ViewEncapsulation,Input} from '@angular/core';
import { WsService } from '../ws.service';
import { WsMessage } from '../ws-message';
import { FormsModule }   from '@angular/forms';
import { ChatData } from '../chat-data';
import {DataGridModule} from 'primeng/primeng';

@Component({
  selector: 'chat-receiver',
  templateUrl: './chat-receiver.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./chat-receiver.component.css']
})
export class ChatReceiverComponent implements OnInit {
  @Input() userName:string;
  @Input() chatMessage:string;
  // @Input() chatDate:string;

  constructor() {

  }

  ngOnInit() {
  }


}
