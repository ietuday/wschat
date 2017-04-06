import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { WsService } from '../ws.service';
import { WsMessage } from '../ws-message';
import { FormsModule }   from '@angular/forms';
import { ChatData } from '../chat-data';
import {DataGridModule} from 'primeng/primeng';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private onlineUsers={};
  // selected:boolean= false;
  public receiver:string='';
  private userName:string='';
  private chatData:ChatData = new ChatData();
  private chatHistory:ChatData[];
  private chatDate:Date ;
  private sender:string='';
  private message:string = '';
  private wsMessage:WsMessage = new WsMessage();

  constructor() {
    this.userName = sessionStorage.getItem("userName")
    WsService.getInstance().onlineUsersBehaviorSubject.subscribe(data => this.showOnlineUsers(data));
    WsService.getInstance().chatHistoryBehaviorSubject.subscribe(data => this.showChatHistory(data));
  }

  ngOnInit() {
  }

  getChatHistory(receiver){
    this.receiver=receiver;
    console.log("receiver is",this.receiver);
    this.chatData.sender = this.userName;
    this.chatData.receiver = this.receiver;
    this.wsMessage.message = JSON.stringify(this.chatData);
    this.wsMessage.action = 'chatHistory';
    WsService.getInstance().send(JSON.stringify(this.wsMessage));
  }

  logout(){
    WsService.getInstance().disConnect(this.userName);
  }

  showChatHistory(data){
    console.log("ChatComponent: showChatUsers", data);
    this.chatHistory = data;
  }

  showOnlineUsers(data) {
    console.log("ChatComponent: showOnlineUsers", data);
    this.onlineUsers=data;
    console.log(data);
  }

  sendChat(){
    console.log("Send Message occured",this.message);
    console.log("receiver is",this.receiver);
    this.chatData.sender = this.userName;
    this.chatData.receiver = this.receiver;
    this.chatData.chatDate = new Date();
    this.chatData.message = this.message;
    this.wsMessage.message = JSON.stringify(this.chatData);
    this.wsMessage.action = 'chat';
    WsService.getInstance().send(JSON.stringify(this.wsMessage));
  }

}
