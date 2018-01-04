import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {AppComponent} from '../../app.component';
import {ProfileComponent} from "../profile.component";
import {ClassData, UserData} from '../../interface';
@Component({
    selector: 'app-all-clases',
    templateUrl: './all-clases.component.html',
    styleUrls: ['./all-clases.component.css']
})
export class AllClasesComponent implements OnInit {
    console = console;
    public classes: ClassData;
    public usersClass: Array<UserData>;
    constructor(private appService: AppService, private profileComponent: ProfileComponent, private appComponent: AppComponent) {
    }
    public serverUrl: string;
    ngOnInit() {
        this.getAllClases();
        this.serverUrl = this.appComponent.server;
    }
    private getAllClases() {
        this.appService.get('class').subscribe(data => {
            this.classes = <ClassData>data.clases;
            this.getUserByClassId(this.classes[0]["_id"]);
        });
    }

    public getUserByClassId(id) {
        console.log("jdgb")
        let param: string = 'class/' + id;
        this.appService.get(param).subscribe(res => {
            this.usersClass = res.userClass;
            console.log(this.usersClass)
        });
    }

}
