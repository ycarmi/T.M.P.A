import { Component, OnInit } from '@angular/core';
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
  allData =[];
  numberOfPoints = this.allData.length;
  region = [];
  category = [];
  year = [2000,2001,2002,2003,2004,2005,2006,2007,
    2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];

  redPoints2017   : StreetPoints[] = [];
  orangePoints2017 : StreetPoints[] = [];
  yellowPoints2017 : StreetPoints[] = [];

  redPoints2016   : StreetPoints[] = [];
  orangePoints2016 : StreetPoints[] = [];
  yellowPoints2016 : StreetPoints[] = [];

  constructor(private _streetpointsservice:StreetPointsService ) { }

   subscribeToObs(jsonpoints) {
    jsonpoints.forEach(element => {
     var statuses = element.statusOverTime;
     var status = statuses[statuses.length-1].trafficStatus;
     if(status == 4){
       this.redPoints2017.push(element);
     }else if(status == 3){
       this.orangePoints2017.push(element);
     }else if(status == 2){
       this.yellowPoints2017.push(element);
     }
   });
  } 
  subscribeTo2016(jsonpoints) {
    jsonpoints.forEach(element => {
     var statuses = element.statusOverTime;
     var status = statuses[16].trafficStatus;
     if(status == 4){
       this.redPoints2016.push(element);
     }else if(status == 3){
       this.orangePoints2016.push(element);
     }else if(status == 2){
       this.yellowPoints2016.push(element);
     }
   });
  }
  async subscibeToService() {// insert streets data to a variable  
    let res = await this._streetpointsservice.getStreetPoints();
    console.log(res)
    this.subscribeToObs(res); 
    this.subscribe(res);
    this.subscribeTo2016(res)
  
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
    this.redPoints2017.forEach(redPoint =>{
      let region = redPoint.point.region;
      regionsMap.forEach(regionInMap =>{
        if(regionInMap.region === region )
          regionInMap.redCount ++;
      })

    })
    this.yellowPoints2017.forEach(yellowPoint =>{
      let region = yellowPoint.point.region;
      regionsMap.forEach(regionInMap =>{
        if(regionInMap.region === region )
          regionInMap.yellowCount ++;
      })
    })
    this.orangePoints2017.forEach(orangePoint =>{
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
  countPointsForCategory(){     
    let categoryMap= this.category.map(category =>{
     
     return {
       category : category,
       redCount : 0,
       yellowCount : 0,
       orangeCount : 0
      }
    })
   this.redPoints2017.forEach(redPoint =>{
     let category = redPoint.point.roadCategory;
     categoryMap.forEach(categoryInMap =>{
       if(categoryInMap.category === category )
       categoryInMap.redCount ++;
     })

   })
   this.yellowPoints2017.forEach(yellowPoint =>{
     let category = yellowPoint.point.roadCategory;
     categoryMap.forEach(categoryInMap =>{
       if(categoryInMap.category === category )
       categoryInMap.yellowCount ++;
     })
   })
   this.orangePoints2017.forEach(orangePoint =>{
     let category = orangePoint.point.roadCategory;
     categoryMap.forEach(categoryInMap =>{
       if(categoryInMap.category === category )
       categoryInMap.orangeCount ++;
     })
   })
   categoryMap.sort( function(a,b){
     return (b.redCount + b.orangeCount + b.yellowCount) -  (a.redCount+a.orangeCount +a.yellowCount) 
   });
   return categoryMap;
   
   
 }
     getRegions(){
     let  regions=  new Set();
     this.allData.forEach(element=> regions.add(element.point.region)); 
     this.region = Array.from(regions)

    }
    getCategory(){
      let  category=  new Set();
      this.allData.forEach(element=> category.add(element.point.roadCategory)); 
      this.category = Array.from(category)
      console.log(this.category)
 
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

   ngOnInit() {

      Promise.all([this.subscibeToService()])
     .then(()=>{       
       this.getRegions()
       this.getCategory()
       let regionsMap = this.countPointsForRegion();
       let categoryMap = this.countPointsForCategory()
       
       let regions = [];
       let redCount = [];
       let orangeCount = [];
       let yellowCount = [];

       let category = [];
       let categoryRedCount = [];
       let categoryOrangeCount = [];
       let categoryYellowCount = [];

        regionsMap.forEach(entry =>{
          regions.push(entry.region)
          redCount.push(entry.redCount)
          yellowCount.push(entry.yellowCount)
          orangeCount.push(entry.orangeCount)
        })
        categoryMap.forEach(entry =>{
          category.push(entry.category)
          categoryRedCount.push(entry.redCount)
          categoryYellowCount.push(entry.yellowCount)
          categoryOrangeCount.push(entry.orangeCount)
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
          title: {
						display: true,
						text: 'Traffic Capacity Average For Years'
					},
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
      this.chart = new Chart('pieChart2017', {
        type: 'pie',
        data: {
           labels: ['Red','Yellow','Orange'],
           datasets: [
            { 
              data: [
                this.redPoints2017.length,
                this.yellowPoints2017.length,
                this.orangePoints2017.length,
              ],
              backgroundColor:[
                'red','yellow','orange'
              ],
              borderColor: "#3cba9f",
              fill: false
            },
          ]
        },options:{
          title: {
						display: true,
						text: 'Number Of Points For Each Color on 2017'
					},
        }
      
      }); 
      this.chart = new Chart('pieChart2016', {
        type: 'pie',
        data: {
           labels: ['Red','Yellow','Orange'],
           datasets: [
            { 
              data: [
                this.redPoints2016.length,
                this.yellowPoints2016.length,
                this.orangePoints2016.length,

        
              ],
              backgroundColor:[
                'red','yellow','orange'
              ],
              borderColor: "#3cba9f",
              fill: false
            },
          ]
        },options:{
          title: {
						display: true,
						text: 'Number Of Points For Each Color on 2016'
					},
        }
      
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
              /* fill: false, */
              stack: 'Stack 0'
              
            }
           ,{
              label: 'Orange Points Region',
              data: orangeCount,
              backgroundColor: "orange",
              /* fill: false, */
              stack: 'Stack 0'
            }, { 
              label: 'Red Points Region',
              data: redCount,
              backgroundColor: "red",
              /* fill: false, */
              stack: 'Stack 0'
            }
            
          ]
        },
        options: {
          title: {
						display: true,
						text: 'Number Of Points For Each Region on 2017'
					},
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
      this.chart = new Chart('categoryBarChart', {
        type: 'bar',
        data: {
          labels: category,
          datasets: [
            {
              label: 'Yellow Points Region',
              data: categoryYellowCount,
              backgroundColor: "yellow",
              fill: false,
              stack: 'Stack 0'
              
            }
           ,{
              label: 'Orange Points Region',
              data: categoryOrangeCount,
              backgroundColor: "orange",
              fill: false,
              stack: 'Stack 0'
            }, { 
              label: 'Red Points Region',
              data: categoryRedCount,
              backgroundColor: "red",
              fill: false,
              stack: 'Stack 0'
            }
            
          ]
        },
        options: {
          title: {
						display: true,
						text: 'Number Of Points For Each Road Category on 2017'
					},
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


