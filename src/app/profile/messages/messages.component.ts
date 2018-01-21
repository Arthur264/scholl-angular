import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ProfileComponent } from '../profile.component';
import { ChatRoomData } from '../../interface';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private appService: AppService,
    private profileComponent: ProfileComponent
  ) {}
  public id: any = "";
  public roomAvatar: any = "";
  public chatRoom: ChatRoomData[] = [];
  public serverUrl: string;
  ngOnInit() {
    this.loadRooms();
    this.serverUrl = this.profileComponent.serverUrl;
  }
  public loadRooms() {
    this.appService.get("chatroom").subscribe(res => {
      this.chatRoom = res.data;
    });
  }
  public showDialog(room) {
    this.id = room["_id"];
    this.roomAvatar = room.user.avatar;

  }
  public sendMessage() {

  }
}
