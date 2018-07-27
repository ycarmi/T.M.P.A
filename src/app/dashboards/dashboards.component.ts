import { Component, OnInit } from '@angular/core';
import { StreetService} from '../shared-service/street.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { StreetPointsService } from '../shared-service/street-points.service';
import { StreetPoints } from '../street-points';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  chart= [];
  years1 =[];
  redPoints2   : StreetPoints[] = [];
  orangePoints2 : StreetPoints[] = [];
  yellowPoints2 : StreetPoints[] = [];

  constructor(private _streetService:StreetService, private _streetpointsservice:StreetPointsService ) { }
  
  /* subscribeToObs(jsonpoints) {
    jsonpoints.forEach(element => {
     var statuses = element.statusOverTime;
     var status = statuses[statuses.length-1].trafficStatus;
     if(status == 4){
       this.redPoints2.push(element);
     }else if(status == 3){
       this.orangePoints2.push(element);
     }else if(status == 2){
       this.yellowPoints2.push(element);
     }
   });
  } */
  async foo() {// insert streets data to a variable  
    let res = await this._streetpointsservice.getStreetPoints();
    /* this.subscribeToObs(res); */
    this.subscribe(res);
  }
  async subscribe(points){
    points.forEach(element=>{
      var year= element.statusOverTime;
       var years= this.years1.push(element);
    
    })
  }

   ngOnInit() {
/*       this.foo(); 
 */     Promise.all([this.foo()])
     .then(()=>{
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.years1,
          datasets: [
            { 
              data: this.years1,
              borderColor: "#3cba9f",
              fill: false
            },
            /* { 
              data: trafficCapacityRatio,
              borderColor: "#ffcc00",
              fill: false
            },  */
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      }); 

     })


      
    
    }
  }


