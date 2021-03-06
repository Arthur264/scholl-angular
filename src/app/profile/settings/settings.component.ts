import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ProfileComponent } from '../profile.component';
import { AppService } from '../../app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UserData, ClassData } from "../../interface";
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private appService: AppService,
    private profileComponent: ProfileComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  @ViewChild('imgAvatar') imageAvatar: ElementRef;
  public userData: UserData;
  public imageError = '';
  public serverUrl: string;
  public classes: Array < ClassData > ;
  public settings: FormGroup;
  public admin = false;
  ngOnInit() {
    this.classes = this.appComponent.getClassStorage();
    this.serverUrl = this.appComponent.server;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.CallUserData(params['id']);
    });
  }
  private CallUserData(id) {
    if (!id) {
      this.admin = true;
      this.userData = this.appComponent.getUserStorage();
      this.settings = new FormGroup({
        firstname: new FormControl(this.userData.firstname, Validators.required),
        lastname: new FormControl(this.userData.lastname, Validators.required),
        email: new FormControl(this.userData.email, CustomValidators.email),
        class: new FormControl(this.userData.class, Validators.required),
        age: new FormControl(this.userData.age || '', CustomValidators.range([1, 100]))
      });
    }
    else {
      this.appService.get("user/" + id).subscribe(res => {
        this.userData = res.data.user[0];
        console.log(this.userData)
      });
    }
  }
  public removeUser() {
    this.appService.delete("user").subscribe(res => {
      if (res.s) {
        this.appComponent.removeUser();
      }
    })
  }
  public changeAvatar(event) {
    this.imageError = '';
    let file = event.target.files[0];
    this.saveAvatar(file);
    event.target.val = "";
  }
  public sendMessage(id) {
    this.appService.post("chatroom", { id: id }).subscribe(res => {
      if (res.s) {
        this.router.navigateByUrl('/profile/messages');
      }
    })
  }
  public addToFriends(id) {
    this.profileComponent.addToFriends(id);
  }
  public updateUser(data) {
    if (this.settings.valid) {
      this.appService.put("user", data.value).subscribe(res => {
        if (res.s) {
          this.appComponent.changeUser(data.value);
        }
      })
    }

  }
  private saveAvatar(file) {
    if (this.isValidFile(file).length == 0) {
      var formData = new FormData();
      formData.append('avatar', file, file.name);
      this.appService.upload('user/avatar', formData).subscribe(res => {
        this.imageAvatar.nativeElement.src = this.appComponent.server + "avatar/" + res;
        this.appComponent.changeUser({ avatar: res });
        this.profileComponent.updateUser();
      })
    }
    else {
      this.imageError = this.isValidFile(file);
    }
  }
  private isValidFile(file) {
    let error = '';
    let maxsize = 2000000;
    let fileType = ['image/jpeg', 'image/png', 'image/jpg']
    if (file.length <= 0) {
      error = "Please, choose the file";
    }
    else if (fileType.indexOf(file.type) < 0) {
      error = "This type of fil is not support. Please choose jpeg, png, jpg types";
    }
    else if (file.size > maxsize) {
      error = "File to big";
    }
    return error;
  }
}
