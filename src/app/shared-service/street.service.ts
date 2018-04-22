import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../user';
import {Street} from '../street';

@Injectable()
export class StreetService {
  private baseUrl: string='http://localhost:8080/Streets';
  private headers = new Headers ({'Content-Type':'application/json'});
  private options = new RequestOptions ({headers:this.headers});
  private street: Street;

  constructor(private _http:Http) { }

  getStreets(){
    return this._http.get(this.baseUrl , this.options)
    .map((response:Response)=>response.json()).catch(this.errorHandler);
  }
  
  /* getUser(id: Number){
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
      return this._http.delete(this.baseUrl+'/DeleteManger/' + user.id , this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
  } */
  /* deleteUserProgramManager(id:Number){
    return this._http.delete('http://localhost:8080/ProgramManger/' + id , this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);

  } */
  createStreet( street:Street){
    console.log(street);
    return this._http.post(this.baseUrl+ 'Upload/SaveDetails', JSON.stringify(street), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
    //lazem nzabeet hada el eshi kaman 
  updateStreet( street: Street){
    
    return this._http.put(this.baseUrl+ '/UpdateAdmin', JSON.stringify(street), this.options).map((response:Response)=> response.json())
    .catch(this.errorHandler);
    }
  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");

  }
  setter(street:Street){
    this.street=street;
  }
  getter(){
    return this.street;
  }
}
