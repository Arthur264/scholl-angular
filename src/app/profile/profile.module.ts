import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AllMaterial } from '../app.module';
import { AppService } from "../app.service";
import { AllUsersComponent } from './all-users/all-users.component';
import { AllClasesComponent } from './all-clases/all-clases.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ScrollBottomDirective } from './scroll-bottom.directive';
import { MessagesComponent } from './messages/messages.component';

import { MessageRoomComponent } from './message-room/message-room.component';
import { MessageRoomItemComponent } from './message-room/message-room-host.component';
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
                    path: 'users',
                    component: AllUsersComponent,
                }, {
                    path: 'class',
                    component: AllClasesComponent,
                },
                {
                    path: 'messages',
                    component: MessagesComponent,
                    data: { preload: true, delay: true },
                },
                {
                    path: ':id',
                    component: SettingsComponent,
                },
                {
                    path: '',
                    component: SettingsComponent,
                }
            ]
        }])
    ],
    providers: [AppService],
    declarations: [ProfileComponent, AllUsersComponent, AllClasesComponent, SettingsComponent, ScrollBottomDirective, MessagesComponent, MessageRoomComponent, MessageRoomItemComponent]
})
export class ProfileModule {}
