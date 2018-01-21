"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.hostname = 'http://school-artyr264.c9users.io:8081/';
        this.token = JSON.parse(localStorage.getItem('token')) || '';
    }
    AppService.prototype.get = function (url, params) {
        if (params === void 0) { params = {}; }
        var headers = new http_1.Headers({ 'x-access-token': this.token });
        var options = new http_1.RequestOptions({ headers: headers, params: params });
        return this.http.get(this.hostname + url, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.post = function (url, data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.hostname + url, data, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.delete = function (url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.hostname + url, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.put = function (url, data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.hostname + url, data, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.upload = function (url, data) {
        var headers = new http_1.Headers({ 'x-access-token': this.token, 'Accept': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.hostname + url, data, options)
            .map(function (res) { return res.json(); });
    };
    AppService = __decorate([
        core_1.Injectable()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
