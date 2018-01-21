import {Component, OnInit, HostListener} from '@angular/core';
import {AppService} from '../../app.service';
import {SocketService} from '../../socket.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserData} from '../../interface';
import {AppComponent} from '../../app.component';
import {ProfileComponent} from '../profile.component';
@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
   
    constructor(
        private appService: AppService,
        private appComponent: AppComponent,
        private socketService: SocketService,
        private profileComponent: ProfileComponent,
        private router: Router) {
    }
    public serverUrl: string;
    public role: string = "user";
    public friends: boolean = true;
    public Users: UserData[] = [];

    ngOnInit() {
        this.serverUrl = this.profileComponent.serverUrl;
    }
    public GetAllUser(name) {
        this.appService.get(name).subscribe(res => {
            this.Users = [];
            this.role = name;
            console.log("res",res,"user", this.Users)
        });
    }
    public viewUserProfile(id){
        this.router.navigate(['/profile',  id]);
    }
    public addToFriends(id){
        this.appService.post("friends", {id: id}).subscribe(res => {
            console.log(res);
        });
        // this.socketService.requestToFriend(id);
    }
}
