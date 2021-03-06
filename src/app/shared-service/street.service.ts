import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { StreetPoints } from '../street-points';
import { Router } from '@angular/router';

@Injectable()
export class StreetService {
  private baseUrl: string='http://localhost:8080/Status';
  private headers = new Headers ({'Content-Type':'application/json'});
  private options = new RequestOptions ({headers:this.headers});
  private streetPoints: StreetPoints;

  constructor(private _http:Http,private _httpp:HttpClient, private router:Router) { }

  private data;
  
  setData(data)
  {
    this.data=data;
  }
  getData()
  {
    let temp= this.data;
    /* this.clearData(); */
    return temp;
  }
  clearData()
  {
    this.data=undefined;
  }
  getstreets(){
      return this._httpp.get(this.baseUrl)
        .map(result => result);
    
  }

  getStreets(){
    return this._http.get(this.baseUrl , this.options)
    .map((response:Response)=>response.json()).catch(this.errorHandler);
  }
  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");

  }
   setter(street:StreetPoints){
    this.streetPoints=street;
  }
  getter(){
    return this.streetPoints;
  } 
}
