import { Component, OnInit } from '@angular/core';
import {Street} from '../street';
import {Router} from '@angular/router';
import {StreetService} from '../shared-service/street.service';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-streets-creation',
  templateUrl: './streets-creation.component.html',
  styleUrls: ['./streets-creation.component.scss']
})
export class StreetsCreationComponent implements OnInit {
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
