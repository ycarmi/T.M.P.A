import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../user';
import {Street} from '../street';
import {StreetPoints} from '../street-points';
import { Router } from '@angular/router';

@Injectable()
export class StreetPointsService {

  private baseUrl: string='http://localhost:8080/Status';//set data base URL 
  private headers = new Headers ({'Content-Type':'application/json'});
  private options = new RequestOptions ({headers:this.headers});
  private streetpoints: StreetPoints;

  constructor(private _http:Http) { }
  
  

  async getStreetPoints() {//get street points an add them to variable
    try{
       let response = await this._http.get(this.baseUrl , this.options)
    .toPromise()
    return response.json();
    }catch(error){
      await this.errorHandler(error);
    }
  }
  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");

  }
 
  setter(streetpoints:StreetPoints){
    this.streetpoints= streetpoints;
  }
  getter(){
    return this.streetpoints;
  }

}
