import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../shared-service/user.service';
import { StreetService} from '../shared-service/street.service';
import { StreetPointsService} from '../shared-service/street-points.service';
import { User} from '../user';
import { Street} from '../street';
import { StreetPoints } from '../street-points';

@Component({
  selector: 'app-navigation-bar-admin',
  templateUrl: './navigation-bar-admin.component.html',
  styleUrls: ['./navigation-bar-admin.component.scss']
})
export class NavigationBarAdminComponent implements OnInit {
  private users:User[];
  private streets:Street[];
  private streetpoints:StreetPoints[];
  constructor(private _userService:UserService,private _streetService:StreetService, private _router:Router) { }

  ngOnInit() {
   this._userService.getUsers().subscribe((GetAllUsers)=>{
      this.users=GetAllUsers;
    }, (error)=>{
      console.log(error);
    }) 
     this._streetService.getStreets().subscribe((Streets)=>{
      this.streets=Streets;
    }, (error)=>{
      console.log(error);
    }) 
  }
  NewUser(){
    let user = new User()
    this._userService.setter(user);
    this._router.navigate(['/op']);

  }
  NewStreet(){
    
    let street = new Street()
    this._streetService.setter(street);
    this._router.navigate(['/street-creation']);

  }
 

}
