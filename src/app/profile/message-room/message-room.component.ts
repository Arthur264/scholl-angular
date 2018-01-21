import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { ProfileComponent } from '../profile.component';
import { MessagesComponent } from '../messages/messages.component';
@Component({
  selector: 'app-message-room',
  templateUrl: './message-room.component.html',
  styleUrls: ['./message-room.component.css']
})
export class MessageRoomComponent implements OnInit, OnChanges {

  constructor(
    private socketService: SocketService,
    private appService: AppService,
    private messagesComponent: MessagesComponent,
    private profileComponent: ProfileComponent) {}

  public user;
  public message: string;
  public serverUrl: string;
  public messages: any[] = [];
  public mesUser: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes.id) {
      this.socketService.newRoom(this.id);
      this.getAllMessage(this.id);
    }
  }
  ngOnInit() {
    this.serverUrl = this.profileComponent.serverUrl;
    this.user = this.profileComponent.user;
    this.socketService.getMessage().subscribe((message: any) => {
      message.data.message = [message.data.message];
      this.messages.push(message.data);
      console.log("1", message)
    });
  }

  @Input() id: string;
  @Input() avatar: string;
  public getAllMessage(id) {
    this.appService.get('chatmessage', { id: id }).subscribe(res => {
      console.log(res.data)
      this.messages = this.sortMessage(res.data.reverse());
    })
  }
  private sortMessage(mesData) {
    let result = [];
    mesData.forEach(function(item, index) {
      item.message = [item.message]
      if (index == 0) {
        result.push(item)
      }
      else {
        if (result[result.length - 1].creator_id == item.creator_id) {
          result[result.length - 1].message.push(item.message);
        }
        else {
          result.push(item)
        }
      }
    });
    console.log(result)
    return result;

  }
  public sendMessage() {
    if (this.message) {
      this.socketService.newMessage(this.id, this.message, this.user['_id']);
      this.message = '';
    }
  }
}
