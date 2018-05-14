import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../user';

@Injectable()
export class UserService {
  private baseUrl: string='http://localhost:8080/Admin';
  private headers = new Headers ({'Content-Type':'application/json'});
  private options = new RequestOptions ({headers:this.headers});
  private user: User;

  constructor(private _http:Http) { }

  getUsers(){
    return this._http.get(this.baseUrl+ '/GetAllUsers' , this.options)
    .map((response:Response)=>response.json()).catch(this.errorHandler);

  }
  getUser(id: Number){
    return this._http.get(this.baseUrl+ '/' + id , this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);

  }
  deleteUsers(user:User){
    if(user.type=="Admin")
    {
      
     return this._http.delete(this.baseUrl+'/DeleteAdmin/' +user.id , this.options).map((response:Response)=> response.json())
     .catch(this.errorHandler);
    }
    else
    {
      return this._http.delete(this.baseUrl+'/DeleteManager/' + user.id , this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
  }
  /* deleteUserProgramManager(id:Number){
    return this._http.delete('http://localhost:8080/ProgramManger/' + id , this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);

  } */
  createUser( user:User){
    console.log(user);
    if(this.user.type=="Admin")
    {
    return this._http.post(this.baseUrl+ '/SaveAdmin', JSON.stringify(user), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
    else
    {
      return this._http.post(this.baseUrl+ '/SaveManager', JSON.stringify(user), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
  } 
  updateUser( user:User){
    if(this.user.type=="Admin")
    {
    return this._http.put(this.baseUrl+ '/UpdateAdmin', JSON.stringify(user), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
    else
    {
      return this._http.put(this.baseUrl+ '/UpdateManager', JSON.stringify(user), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }

  }
  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");

  }
  setter(user:User){
    this.user=user;
  }
  getter(){
    return this.user;
  }
}
