import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";
@Injectable()
export class SocketService {
    private host: string = "http://school-artyr264.c9users.io:8082";
    private socket: any;
    constructor() {
        this.socket = io(this.host);
    }
    public requestToFriend(id) {
        this.socket.emit('new-friend', id);
    }
}
