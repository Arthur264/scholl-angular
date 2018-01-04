import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AppComponent} from '../../app.component';
import {ProfileComponent} from '../profile.component';
import {AppService} from '../../app.service';
import { CustomValidators } from 'ng2-validation';
import {UserData, ClassData} from "../../interface";
import {FormControl, Validators, FormGroup, FormBuilder, NgForm} from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private appComponent: AppComponent, private appService: AppService, private profileComponent: ProfileComponent ) { 
  }
  @ViewChild('imgAvatar') imageAvatar:ElementRef;
  public userData: UserData;
  public imageError = '';
  public serverUrl: string;
  public classes: Array<ClassData>;
  public settings: FormGroup;
  private admin: false;
  ngOnInit() {
    this.classes = this.appComponent.getClassStorage();
    this.serverUrl = this.appComponent.server;
    if(this.admin){
      this.userData =  this.appComponent.getUserStorage();
      this.settings = new FormGroup({
        firstname:  new FormControl(this.userData.firstname, Validators.required),
        lastname: new FormControl(this.userData.lastname, Validators.required),
        email:  new FormControl(this.userData.email, CustomValidators.email),
        class: new FormControl(this.userData.class, Validators.required),
        age: new FormControl(this.userData.age || '', CustomValidators.range([1, 100]))
      });
    }else{
      
    }
  
  }
  public changeAvatar(event){
    this.imageError = '';
    let file = event.target.files[0]; 
    this.saveAvatar(file);
    event.target.val = "";
  }
  public updateUser(data){
    if(this.settings.valid){
      this.appService.put("user", data.value).subscribe(res => {
        if(res.s){
         this.appComponent.changeUser(data.value);
        }
      })
    }
    
  }
  private saveAvatar(file){
    if (this.isValidFile(file).length == 0) {
          var formData = new FormData();
          formData.append('avatar', file, file.name);
          this.appService.upload('user/avatar', formData).subscribe(res=>{
            this.imageAvatar.nativeElement.src = this.appComponent.server + "avatar/" + res;
            this.appComponent.changeUser({avatar: res});
            this.profileComponent.updateUser();
          })
    } else{
        this.imageError = this.isValidFile(file);
    }
  }
  private isValidFile(file){
     let error = '';
     let maxsize = 2000000;
     let fileType = ['image/jpeg', 'image/png', 'image/jpg']
     if(file.length <= 0){
        error = "Please, choose the file";
     }else if (fileType.indexOf(file.type) < 0){
       error = "This type of fil is not support. Please choose jpeg, png, jpg types";
     }else if(file.size > maxsize){
       error = "File to big";
     }
     return error;
  }
}
