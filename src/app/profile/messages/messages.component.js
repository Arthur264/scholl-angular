"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MessagesComponent = (function () {
    function MessagesComponent(appService, profileComponent) {
        this.appService = appService;
        this.profileComponent = profileComponent;
        this.chatRoom = [];
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.loadRooms();
        this.serverUrl = this.profileComponent.serverUrl;
    };
    MessagesComponent.prototype.loadRooms = function () {
        var _this = this;
        this.appService.get("chatroom").subscribe(function (res) {
            _this.chatRoom = res.data;
            console.log(_this.cha);
        });
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'app-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.css']
        })
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
