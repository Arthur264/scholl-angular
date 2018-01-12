import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {FormControl, Validators, FormGroup, FormBuilder, NgForm} from '@angular/forms';
import  {AppComponent} from '../app.component';
import {Router} from '@angular/router';
import { CustomValidators } from 'ng2-validation';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AppService]
})
export class LoginComponent implements OnInit {
    public login: FormGroup;
    public errorMessage: string = "";

    constructor(private appService: AppService, private appComponent: AppComponent, private router: Router) {
        this.login = new FormGroup({
            email:  new FormControl('', CustomValidators.email),
            password:  new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
    }

    Login(data) {
        if(this.login.valid){
            this.appService.post('auth/login', data.value).subscribe(res => {
                if (res.s) {
                   this.appComponent.saveUser(res);
                   this.router.navigateByUrl('/profile/');
                }else{
                    this.errorMessage = res.m;
                }
            });
        }else{
            return false;
        }
    }
}
