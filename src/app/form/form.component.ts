import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  serverurl:string = "http://localhost:8080/";//get the basic data base URL
  name:string = '';
  pass:string = '';
  isProgramManager  = false;
  isAdmin =false;
  found:boolean;
  radio:string = '';
  
  constructor(private httpClient:HttpClient ,private router:Router){  }
  ngOnInit(){}
  setUserName(event:any){// set user name that been insert at the form 
    this.name = event.target.value;
    this.found = false;
  }
  setPass(event:any){// set the password that been insert at the form 
    this.pass = event.target.value;
  }
  radioChangeHandler(event:any){//set the choosen radio button
    this.radio= event.target.value;
  }
  
  logIn(){ // route the user to his page if he is admin or program-manager
    if(this.radio =="Admin"){

          this.httpClient.post(this.serverurl+`Admin/Login`,
          {
          name:this.name,
          password: this.pass
          
          }).subscribe((data:any) => { 
            console.log(data)
              if(data > 0 ){
                this.router.navigate(['admin']);
              }else {
                // return error massage to the user.
              }
          }
        )
    }
    else if (this.radio = "ProgramManager"){
      this.httpClient.post(this.serverurl+`ProgramManager/Login`,
      {
      name:this.name,
      password: this.pass
      
      }).subscribe((data:any) => { 
        console.log(data)

          if(data > 0 ){
            this.router.navigate(['program-manager']);
          }else {
            // return error massage to the user.
          }
      }
    )
    }
  }
  getUser(){// get users from data-base and set them at a variable
    var users = this.httpClient.get(this.serverurl+"/GetAllUsers");
  }
}


