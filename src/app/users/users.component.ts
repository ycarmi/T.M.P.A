import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../shared-service/user.service';
import { User} from '../user';
import { DataTablesModule } from 'angular-datatables';

import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users:any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private _userService:UserService, private _router:Router, private http: Http  ) { }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
      this._userService.getUsers().subscribe((GetAllUsers)=>{
      console.log(GetAllUsers);
      this.users=GetAllUsers;
      this.dtTrigger.next();
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
    },(error)=>{
      console.log(error)
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
