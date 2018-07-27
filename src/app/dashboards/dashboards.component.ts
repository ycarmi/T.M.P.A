import { Component, OnInit } from '@angular/core';
import { StreetService} from '../shared-service/street.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { StreetPointsService } from '../shared-service/street-points.service';
import { StreetPoints } from '../street-points';
import { stat } from 'fs';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  chart= [];
  allData =[];
  year = [2000,2001,2002,2003,2004,2005,2006,2007,
    2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
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
       this.allData.push(element);
    
    })
  }
  trafficCapacityPerYear(){
    let yearsSum= [];
    for(let i = 0;i<18;i++)
     yearsSum[i] = 0;

    this.allData.forEach(dataPoint =>{
     let status = dataPoint.statusOverTime;
     for(let i =0;i<status.length;i++){
       yearsSum[i] +=status[i].trafficCapacityRatio;
     }

   })
   let numberOfPoints = this.allData.length
   let yearsAverage = [];
   yearsSum.forEach(year =>{
     yearsAverage.push(year/numberOfPoints)
   })
   yearsAverage = yearsAverage.map(average => average.toFixed(3));
   return yearsAverage
  }

   ngOnInit() {
/*       this.foo(); 
 */     Promise.all([this.foo()])
     .then(()=>{       
       
      let yearsAverage = this.trafficCapacityPerYear();

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.year,
          datasets: [
            { 
              data: yearsAverage,
              borderColor: "#3cba9f",
              fill: false
            },
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


