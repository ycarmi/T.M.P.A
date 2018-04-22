import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StreetService} from '../shared-service/street.service';
import { Street} from '../street';
import { DataTablesModule } from 'angular-datatables';

import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.scss']
})
export class StreetsComponent implements OnInit {
  
  private streets:any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(private _streetService:StreetService, private _router:Router, private http: Http ) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
      this._streetService.getStreets().subscribe((Streets)=>{
      console.log(Streets);
      this.streets=Streets;
      this.dtTrigger.next();
    }, (error)=>{
      console.log(error);
    })
  }
  /* deletestreet(street){
    //if admin
      console.log("in Users : ");
      console.log(street);
    this._streetService.deleteStreet(street).subscribe((street)=>{
      console.log("in Users : ");
      console.log(street);
      this.streets.splice(this.streets.indexOf(street),1);
    },(error)=>{
      console.log(error)
    });
  }   */
  UpdateStreet(street){
    this._streetService.setter(street);
    this._router.navigate(['/street-creation']);
  }
  NewStreet(){
    let street = new Street()
    this._streetService.setter(street);
    this._router.navigate(['/street-creation']);

  }

}
