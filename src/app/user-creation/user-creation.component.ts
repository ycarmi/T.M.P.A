import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Router} from '@angular/router';
import {UserService} from '../shared-service/user.service';
import { IfStmt } from '@angular/compiler';
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
   ProcessForm(){
     if(this.user.id==undefined){
       this._userService.createUser(this.user).subscribe((user)=>{
         console.log(user);
         this._router.navigate(['/']);
       },(error)=>{
         console.log(error);
       });
     }else{
      this._userService.updateUser(this.user).subscribe((user)=>{
        console.log(user);
        this._router.navigate(['/']);
      },(error)=>{
        console.log(error);
      });
     }
   }


}
