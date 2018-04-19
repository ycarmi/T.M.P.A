import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../shared-service/user.service';
import { User} from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users:User[];
  constructor(private _userService:UserService, private _router:Router ) { }

  ngOnInit() {
      this._userService.getUsers().subscribe((GetAllUsers)=>{
      console.log(GetAllUsers);
      this.users=GetAllUsers;
    }, (error)=>{
      console.log(error);
    })
  }
  deleteUser(user){
    //if admin
      console.log("in Users : ");
      console.log(user);
    this._userService.deleteUsers(user).subscribe((user)=>{
      console.log("in Users : ");
      console.log(user);
      this.users.splice(this.users.indexOf(user),1);

    });
  }  


  UpdateUser(user){
    this._userService.setter(user);
    this._router.navigate(['/op']);

  }
  NewUser(){
    let user = new User()
    this._userService.setter(user);
    this._router.navigate(['/op']);

  }

}
