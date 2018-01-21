import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";
@Injectable()
export class SocketService {
    private host: string = "http://school-artyr264.c9users.io:8081";
    private socket: any;
    constructor() {
        this.socket = io(this.host);
    }
    public getMessage() {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
    public requestToFriend(id) {
        return this.socket.emit('new-friend', id);
    }
    public newMessage(idroom, mes, id) {
        return this.socket.emit('new-message', idroom, mes, id);

    }
    public newRoom(idroom) {
        return this.socket.emit('new-room', idroom);

    }
}
