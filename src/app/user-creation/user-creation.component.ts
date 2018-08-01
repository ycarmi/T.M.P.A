import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Router} from '@angular/router';
import {UserService} from '../shared-service/user.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {
  private user:User;

  constructor(private _userService: UserService , private _router: Router) { }

  ngOnInit() {
    this.user=this._userService.getter()
  }
   ProcessForm(){// this function navigate to two kinds form, update data user form or creat new user depend on the call for the function 
     if(this.user.id==undefined){
       this._userService.createUser(this.user).subscribe((user)=>{//create new user 
         console.log(user);
         this._router.navigate(['/users']);
       },(error)=>{
         console.log(error);
       });
     }else{
      this._userService.updateUser(this.user).subscribe((user)=>{//update exist user 
        console.log(user);
        this._router.navigate(['/users']);
      },(error)=>{
        console.log(error);
      });
     }
   }


}
