import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatData } from './chat-data';
import { LoginData } from './login-data';

import 'rxjs/add/operator/share';

@Injectable()
export class WsService {

    private ws: WebSocket;
    private message: string = "";
    private static _instance: WsService = new WsService();

    private onlineUsers: LoginData[] = [];
    public onlineUsersBehaviorSubject: BehaviorSubject<LoginData[]> = new BehaviorSubject(this.onlineUsers);

    private chatHistory: ChatData[] = [];
    public chatHistoryBehaviorSubject: BehaviorSubject<ChatData[]> = new BehaviorSubject(this.chatHistory);

    constructor() {
        if (WsService._instance) {
            throw new Error("Error for instance");
        }
        WsService._instance = this;
    }

    public static getInstance(): WsService {
        return WsService._instance;
    }

    submit() {
        console.log('submit clicked');
        this.ws.send(this.message);
    }

    public connect() {
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.onopen = (con) => {
            console.log("on Open", con);
        }

        this.ws.onerror = (con) => {
            console.log("on Error", con);
        }

        this.ws.onclose = (con) => {
            console.log("on Close", con);
            this.connect();
        }

        this.ws.onmessage = (evt) => {
            console.log("on Message", evt.data);
            var wsMessage = JSON.parse(evt.data);
            switch (wsMessage["action"]) {
                case 'login':
                    let ou: LoginData[] = wsMessage['message'];
                    this.onlineUsersBehaviorSubject.next(ou);
                    break;
                case 'chatHistory':
                    let ch: ChatData[] = wsMessage['message'];
                    this.chatHistoryBehaviorSubject.next(ch);
                    break;
                default:
            }
        }
    }

    public disConnect(evt) {
        console.log(evt)
        this.ws.close();
    }

    public send(message) {
        this.ws.send(message);
    }

}
