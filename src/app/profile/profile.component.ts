import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {ClassData, UserData} from '../interface';
import{AppService} from '../app.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private appComponent: AppComponent, private appService: AppService){
        
    }
    public serverUrl: string;
    public user =  this.appComponent.getUserStorage();
    public classes =  this.appComponent.getClassStorage();
    ngOnInit() {
         this.serverUrl = this.appComponent.server;
    }
    public updateUser(){
        this.user =  this.appComponent.getUserStorage();
    }
    public LogOut(){
        this.appComponent.removeUser();
    }

}
