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
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import { NavigationBarProgramManagerComponent } from './navigation-bar-program-manager/navigation-bar-program-manager.component';
import { StreetsComponent } from './streets/streets.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserService } from './shared-service/user.service';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StreetCreationComponent } from './street-creation/street-creation.component';
import { StreetService } from './shared-service/street.service'; 
import { StreetPointsService } from './shared-service/street-points.service';
import { DataTablesModule } from 'angular-datatables';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { MatDialogModule} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"


const appRoutes: Routes =[
  {path: 'admin', component: AdminComponent},
  {path: '', component: HomepageComponent},
  {path: 'program-manager', component: ProgramManagerComponent},
  {path: 'streets', component: StreetsComponent},
  {path: 'street-creation', component: StreetCreationComponent},
  {path: 'users', component: UsersComponent},
  {path: 'op', component: UserCreationComponent},
  {path: 'esri-map', component: EsriMapComponent}

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
    NavigationBarAdminComponent,
    NavigationBarProgramManagerComponent,
    StreetsComponent,
    EsriMapComponent,
    UserCreationComponent,
    UsersComponent,
    StreetCreationComponent,
    ErrorPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    MatDialogModule,
    BrowserAnimationsModule

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserService , StreetService, StreetPointsService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorPopupComponent]
})
export class AppModule { }
