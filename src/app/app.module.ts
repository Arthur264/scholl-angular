import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, LoadChildren } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
}
from '@angular/material';
import { AppService } from "./app.service";
import { SocketService } from "./socket.service";
import { ValidationDirective } from './validation.directive';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

@NgModule({
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    declarations: [ValidationDirective, NotFoundComponentComponent]
})
export class AllMaterial {}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AllMaterial,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CustomFormsModule,
        RouterModule.forRoot([{
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            }, {
                path: 'profile',
                loadChildren: 'app/profile/profile.module#ProfileModule'
            }, {
                path: 'login',
                component: LoginComponent
            }, {
                path: 'register',
                component: RegisterComponent
            }
            // ,{
            //     path: '404', 
            //     component: NotFoundComponentComponent
            // }
            // ,{
            //     path: '**',
            //     redirectTo: '/404'
            // }

        ])
    ],
    providers: [AppService, SocketService],
    bootstrap: [AppComponent]
})
export class AppModule {}
