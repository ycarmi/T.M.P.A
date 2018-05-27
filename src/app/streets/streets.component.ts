import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StreetService} from '../shared-service/street.service';
import { StreetPoints} from '../street-points';
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
  
  GoToMap(street){
    let latitude= street.point.latitude;
    let longitude=street.point.longitude;
    let data = [longitude,latitude];
    this._streetService.setData(data)
    this._router.navigate(['/esri-map']);

  }
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
  
  

}
