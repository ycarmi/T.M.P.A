import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  serverurl:string = "http://localhost:8080/";
  name:string = '';
  pass:string = '';
  found:boolean;
  radio:string = '';
  
  constructor(private httpClient:HttpClient ,private router:Router){  }
  ngOnInit(){}
  setUserName(event:any){
    this.name = event.target.value;
    this.found = false;
  }
  setPass(event:any){
    this.pass = event.target.value;
  }
  radioChangeHandler(event:any){
    this.radio= event.target.value;
  }
  
  logIn(){ 
    if(this.radio =="Admin"){

          this.httpClient.post(this.serverurl+`Admin/Login`,
          {
          name:this.name,
          password: this.pass
          
          }).subscribe((data:any) => { 
              if(data == 1 ){
                this.router.navigate(['admin']);
              }else {
                // return error massage to the user.
              }
          }
        )
    }
    
    else if (this.radio = "ProgramManger"){
      this.httpClient.post(this.serverurl+`ProgramManger/Login`,
      {
      name:this.name,
      password: this.pass
      
      }).subscribe((data:any) => { 
          if(data == 1 ){
            this.router.navigate(['program-manager']);
          }else {
            // return error massage to the user.
          }
      }
    )

    }
    
  }
  /* loginUser(e){
    e.preventDefault();
    var radio = e.target.value;
    if(radio='admin'){
      this.router.navigate(['admin']);
    } */
  
 /*  MoveToHomePage(){
    if(this.radio="Admin"){
      RouterLink= "/admin";
    }

  } */
  
}


