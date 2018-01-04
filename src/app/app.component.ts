import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData, ClassData } from './interface';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public User: UserData;
    public server =  "http://school-artyr264.c9users.io:8081/";
    constructor(private router: Router, private appService: AppService) {

    }

    ngOnInit() {
        console.log("3", this.server)
        this.getUserStorage();
        this.appService.get('class').subscribe(data => {
            let classes = <ClassData>data.clases;
            this.saveClass(classes);
        });
    }

    public getUserStorage() {
        const user = localStorage.getItem('user');
        if (user !== "undefined" && user !== "null") {
            this.User = <UserData>JSON.parse(user);
            return JSON.parse(user);
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    public getClassStorage() {
        const classes = localStorage.getItem('class');
        if (classes !== "undefined" && classes !== "null") {
            return JSON.parse(classes);
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    public saveUser(data){
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    public saveClass(data){
        localStorage.setItem('class', JSON.stringify(data));
    }
    public changeUser(data){
        var user = this.getUserStorage();
        let three = Object.assign({}, user, data);
        localStorage.setItem('user', JSON.stringify(three));
    }
    public removeUser(){
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}
