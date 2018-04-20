import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { ProgramManagerComponent } from './program-manager/program-manager.component';
import { RouterModule, Routes} from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import { NavigationBarProgramManagerComponent } from './navigation-bar-program-manager/navigation-bar-program-manager.component';
import { StreetsComponent } from './streets/streets.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserService } from './shared-service/user.service';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StreetsCreationComponent } from './streets-creation/streets-creation.component';
import { StreetService } from './shared-service/street.service'; 

const appRoutes: Routes =[
  {path: 'admin', component: AdminComponent},
  {path: '', component: HomepageComponent},
  {path: 'program-manager', component: ProgramManagerComponent},
  {path: 'streets', component: StreetsComponent},
  {path: 'street-creation', component: StreetsCreationComponent},
  {path: 'users', component: UsersComponent},
  {path: 'op', component: UserCreationComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CarouselsComponent,
    RadioButtonsComponent,
    AdminComponent,
    ProgramManagerComponent,
    NavigationBarComponent,
    HomepageComponent,
    LoginComponent,
    NavigationBarAdminComponent,
    NavigationBarProgramManagerComponent,
    StreetsComponent,
    EsriMapComponent,
    UserCreationComponent,
    UsersComponent,
    StreetsCreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserService , StreetService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
