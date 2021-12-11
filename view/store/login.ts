import React from "react";
import { makeAutoObservable, runInAction } from 'mobx';
import { observer } from "mobx-react-lite";
import request from './request';

export default class LoginStore {

    userId: string = '';
    accessToken: string = '';
    isLogin: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    submit = async () => {

        const url = 'http://localhost:5000/v1/signin';
        var body = JSON.stringify({
            account:"xianmiao@yahaha.com",
            password:"Hello1234",
            type:"EMAIL",
            deviceType:"Web",
            deviceId:"a9cefe26-ec93-4944-a32f-50cbfb705246",
            clientId:"service"
        });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-app-id', '02ce7c44feb04cdcb0c685e4f8ad26b0');
        var opts = {
            method: 'POST',
            headers,
           
            body
        };

        const res = await fetch(url, opts).then(res => res.json())
        
        return res;
    }
}
