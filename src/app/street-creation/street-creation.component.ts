import { Component, OnInit } from '@angular/core';
import {Street} from '../street';
import {Router} from '@angular/router';
import {StreetService} from '../shared-service/street.service';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-street-creation',
  templateUrl: './street-creation.component.html',
  styleUrls: ['./street-creation.component.scss']
})
export class StreetCreationComponent implements OnInit {
  private street:Street;

  constructor(private _streetService: StreetService , private _router: Router) { }

  ngOnInit() {
    this.street=this._streetService.getter()

  }

   ProcessForm(){
     if(this.street.road==undefined){
       this._streetService.createStreet(this.street).subscribe((street)=>{
         console.log(street);
         this._router.navigate(['/streets']);
       },(error)=>{
         console.log(error);
       });
     }else{
      this._streetService.updateStreet(this.street).subscribe((street)=>{
        console.log(street);
        this._router.navigate(['/streets']);
      },(error)=>{
        console.log(error);
      });
     }
   }
}
