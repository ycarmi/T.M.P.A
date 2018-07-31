import { Component, OnInit } from '@angular/core';
import { StreetService} from '../shared-service/street.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { StreetPointsService } from '../shared-service/street-points.service';
import { StreetPoints } from '../street-points';
import { element } from '../../../node_modules/protractor';



@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  chart= [];
  allData =[];
  numberOfPoints = this.allData.length;
  /* region = ['Yorkshire and The Humbe','East Midlands','London','West Midlands','South West','South East','East of England',
  'Yorkshire & the Humber','North East','North West','Wales','Merseyside','Scotland']; */
  region = [];
  year = [2000,2001,2002,2003,2004,2005,2006,2007,
    2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
  redPoints2   : StreetPoints[] = [];
  orangePoints2 : StreetPoints[] = [];
  yellowPoints2 : StreetPoints[] = [];

  constructor(private _streetpointsservice:StreetPointsService ) { }
   subscribeToObs(jsonpoints) {
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
  } 
  async subscibeToService() {// insert streets data to a variable  
    let res = await this._streetpointsservice.getStreetPoints();
    console.log(res)
    this.subscribeToObs(res); 
    this.subscribe(res);
  
    }
  async subscribe(points){
    points.forEach(element=>{
       this.allData.push(element);
    
    })
  }
  countPointsForRegion(){     
     let regionsMap= this.region.map(region =>{
      
      return {
        region : region,
        redCount : 0,
        yellowCount : 0,
        orangeCount : 0
       }
     })
    this.redPoints2.forEach(redPoint =>{
      let region = redPoint.point.region;
      regionsMap.forEach(regionInMap =>{
        if(regionInMap.region === region )
          regionInMap.redCount ++;
      })

    })
    this.yellowPoints2.forEach(yellowPoint =>{
      let region = yellowPoint.point.region;
      regionsMap.forEach(regionInMap =>{
        if(regionInMap.region === region )
          regionInMap.yellowCount ++;
      })
    })
    this.orangePoints2.forEach(orangePoint =>{
      let region = orangePoint.point.region;
      regionsMap.forEach(regionInMap =>{
        if(regionInMap.region === region )
          regionInMap.orangeCount ++;
      })
    })
    regionsMap.sort( function(a,b){
      return (b.redCount + b.orangeCount + b.yellowCount) -  (a.redCount+a.orangeCount +a.yellowCount) 
    });
    return regionsMap;
    
    
  }
     getRegions(){
     let  regions=  new Set();
     this.allData.forEach(element=> regions.add(element.point.region)); 
     this.region = Array.from(regions)

    }
   


  trafficCapacityPerYear(){
    let yearsSum= [];
   
    // Filling in zeros for summing.
    for(let i = 0;i<18;i++)
     yearsSum[i] = 0;
    /**
     * For each year we add to it each point's traffic capacity ratio
     */
    this.allData.forEach(dataPoint =>{
     let status = dataPoint.statusOverTime;
     for(let i =0;i<status.length;i++){
       yearsSum[i] +=status[i].trafficCapacityRatio;
     }
   })
   let numberOfPoints = this.allData.length
   let yearsAverage = [];
   // Getting the average for each year
   yearsSum.forEach(year =>{
     yearsAverage.push(year/numberOfPoints)
   })

   // Rounding the averages for 3 decimal points 
   yearsAverage = yearsAverage.map(average => average.toFixed(3));
   return yearsAverage
  }
 /*  redPointsPercentage(){
    let redPointsLength = this.redPoints2.length;
    return(2775/redPointsLength);

  }
  yellowPointsPercentage(){
    let yellowPointsLength = this.yellowPoints2.length;
    return (2775/yellowPointsLength);

 
  }
  orangePointsPercentage(){
    let orangePointsLength = this.orangePoints2.length;
     let orangePercentage = (2775/orangePointsLength); 
    return orangePercentage;
  } */
   ngOnInit() {

      Promise.all([this.subscibeToService()])
     .then(()=>{       
       this.getRegions()
       let regionsMap = this.countPointsForRegion();
       
       let regions = [];
       let redCount = [];
       let orangeCount = [];
       let yellowCount = [];
        regionsMap.forEach(entry =>{
          regions.push(entry.region)
          redCount.push(entry.redCount)
          yellowCount.push(entry.yellowCount)
          orangeCount.push(entry.orangeCount)
        })
      let yearsAverage = this.trafficCapacityPerYear();
      this.countPointsForRegion()

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
      this.chart = new Chart('pieChart', {
        type: 'pie',
        data: {
           labels: ['Red','Yellow','Orange'],
           datasets: [
            { 
              data: [
                this.redPoints2.length,
                this.yellowPoints2.length,
                this.orangePoints2.length,

        
              ],
              backgroundColor:[
                'red','yellow','orange'
              ],
              borderColor: "#3cba9f",
              fill: false
            },
          ]
        },
      
      }); 
      this.chart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: regions,
          datasets: [
            {
              label: 'Yellow Points Region',
              data: yellowCount,
              backgroundColor: "yellow",
              fill: false,
              stack: 'Stack 0'
              
            }
           ,{
              label: 'Orange Points Region',
              data: orangeCount,
              backgroundColor: "orange",
              fill: false,
              stack: 'Stack 0'
            }, { 
              label: 'Red Points Region',
              data: redCount,
              backgroundColor: "red",
              fill: false,
              stack: 'Stack 0'
            }
            
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


