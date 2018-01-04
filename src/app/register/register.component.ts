import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {FormControl, Validators, FormGroup, FormBuilder, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {ClassData} from '../interface';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [AppService]

})
export class RegisterComponent implements OnInit {
    register: FormGroup;
    constructor(private appService: AppService, private router: Router, private appComponent: AppComponent) {
        let password = new FormControl('', Validators.required);
        let confirmpassword = new FormControl('', CustomValidators.equalTo(password));
        
        this.register = new FormGroup({
            firstname:  new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            email:  new FormControl('', CustomValidators.email),
            password:  password,
            confirmpassword: confirmpassword,
            class: new FormControl('', Validators.required)
        });
    };
    public classes = {};

    ngOnInit() {
        this.classes = this.appComponent.getClassStorage();
    }
    public Register(data) {
        this.appService.post('auth/register', data.value).subscribe(res => {
            this.appComponent.saveUser(res);
            this.router.navigateByUrl('/profile');
        });
    }

}
