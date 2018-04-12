import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { ProgramManagerComponent } from './program-manager/program-manager.component';
import{ RouterModule, Routes} from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const appRoutes: Routes =[
  {path: 'admin', component: AdminComponent},
  {path: '', component: HomepageComponent},
  {path: 'program-manager', component: ProgramManagerComponent}
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
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
