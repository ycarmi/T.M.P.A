import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../user';
import {Street} from '../street';
import {StreetPoints} from '../street-points';

@Injectable()
export class StreetPointsService {

  private baseUrl: string='http://localhost:8080/Status';
  private headers = new Headers ({'Content-Type':'application/json'});
  private options = new RequestOptions ({headers:this.headers});
  private streetpoints: StreetPoints;

  constructor(private _http:Http) { }

  getStreetPoints(){
    return this._http.get(this.baseUrl , this.options)
    .map((response:Response)=>response.json()).catch(this.errorHandler);
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
