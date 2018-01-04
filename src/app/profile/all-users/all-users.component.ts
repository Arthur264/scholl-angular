import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {UserData} from '../../interface';
import {AppComponent} from '../../app.component';
import {ProfileComponent} from '../profile.component';
@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

    constructor(private appService: AppService, appComponent: AppComponent, private profileComponent: ProfileComponent) {
    }
    public serverUrl: string;
    public friends: true;
    public Users: UserData[] = [];

    ngOnInit() {
        this.serverUrl = this.profileComponent.serverUrl;
        this.GetAllUser();
    }

    private GetAllUser() {
        this.appService.get('user').subscribe(res => {
            this.Users = res;
        });
    }
    public scroll(data){
        console.log(data)
    }
    public viewUserProfile(user){
        console.log("ProfileComponent", ProfileComponent())
    }
    public addToFriends(id){
        this.appService.post("user/friends", {id: id}).subscribe(res => {
            this.friends = false;
        });
    }
}
