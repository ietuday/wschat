import { Component, OnInit } from '@angular/core';
import { WsService } from '../ws.service';
import { WsMessage } from '../ws-message';
import { LoginData } from '../login-data';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    private userName: string = '';
    private wsMessage: WsMessage = new WsMessage();
    private loginData: LoginData;
    constructor() { }

    ngOnInit() {
    }

    public login() {
        console.log("Clicked", this.userName);
        sessionStorage.setItem("userName", this.userName);
        this.loginData = new LoginData();
        this.loginData.name = this.userName;
        this.wsMessage.message = JSON.stringify(this.loginData);
        this.wsMessage.action = 'login';
        WsService.getInstance().send(JSON.stringify(this.wsMessage));
    }
}
