import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ClassData, UserData } from '../interface';
import { AppService } from '../app.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private appComponent: AppComponent, private appService: AppService) {

    }
    public serverUrl: string;
    public user = this.appComponent.getUserStorage();
    public friends: UserData[] = [];
    public classes = this.appComponent.getClassStorage();
    ngOnInit() {
        this.serverUrl = this.appComponent.server;
        this.requestFriends();
    }
    public updateUser() {
        this.user = this.appComponent.getUserStorage();
    }
    public requestFriends() {
        this.appService.get("friends", { reqfriends: true }).subscribe(res => {
            console.log(res)
            this.friends = res;
        })
    }
    public LogOut() {
        this.appComponent.removeUser();
    }

}
