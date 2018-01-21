import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProfileComponent } from '../profile.component';
@Component({
    selector: 'app-message-room-item',
    templateUrl: './message-room-host.html',
    styleUrls: ['./message-room.component.css'],
    inputs: ["avatar", "mes"]
})
export class MessageRoomItemComponent implements OnInit {

    constructor(private profileComponent: ProfileComponent) {}
    public user;
    public position: string = "right";
    public avatar: string = "";
    public mes: any;

    ngOnInit() {
        this.user = this.profileComponent.user;
    }

}
