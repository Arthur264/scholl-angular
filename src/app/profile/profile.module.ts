import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AllMaterial} from '../app.module';
import {AppService} from "../app.service";
import { AllUsersComponent } from './all-users/all-users.component';
import { AllClasesComponent } from './all-clases/all-clases.component';
import { SettingsComponent } from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        AllMaterial,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        RouterModule.forChild([{
            path: '',
            pathMatch: 'file',
            component: ProfileComponent,
            children: [{
                path: '', 
                redirectTo: 'users', 
                pathMatch: 'full',
            },{
                path: 'users',
                component: AllUsersComponent,
            },{
                path: 'class',
                component: AllClasesComponent,
            },{
                path: 'settings',
                component: SettingsComponent,
            }]
        }])
    ],
    providers: [AppService],
    declarations: [ProfileComponent, AllUsersComponent, AllClasesComponent, SettingsComponent]
})
export class ProfileModule {
}
