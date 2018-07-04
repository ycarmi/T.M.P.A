
/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { StreetPoints } from '../street-points';
import { StreetPointsService } from '../shared-service/street-points.service';
import axios from 'axios' 
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { resolve } from 'url';
import { Street } from '../street';
import { StreetService } from '../shared-service/street.service';
import { Router } from '@angular/router'
import { Point } from 'esri/geometry';


@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css'],
  
})

export class EsriMapComponent implements OnInit {
  // Private vars with default values
  data = this._streetservice.getData();//the data that is imported from the data-base server 
  private _zoom = 12;// a default zoom for the map 
  private _center = [-2.013236813, 52.57441986];// default latitude longitude to show the map 
  private _basemap = 'streets-navigation-vector';// map style
  
  redPoints2   : StreetPoints[] = [];// array for the red points data that show red counting points streets
  orangePoints2 : StreetPoints[] = [];// array for the orange points data that show orange counting points streets
  yellowPoints2 : StreetPoints[] = [];// array for the yellow points data that show yellow counting points streets    
  redRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
       type: "simple-marker",
       color: "red"
      }
  };
  orangeRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
       type: "simple-marker",
       color: "orange"
      }
  };
  yellowRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
       type: "simple-marker",
       color: "yellow"
      }
  };
  redGraphics  = [];// array of red points graphics
  yellowGraphics  = [];// array of yellow points graphics
  orangeGraphics = [];// array of orange points graphics
  
  async fillinTheGraphics(){//functiont to add the points graphics at the esri map 
    await loadModules([
      'esri/Graphic',"dojo/domReady!"
    ])
      .then(([Graphic]) => {
        let counter = 1;
        this.redPoints2.forEach(element => {// adding the red points graphics and data depend on longitude latitude of each point
        let redPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
        let x = 21
        let lineAtt = {//popup data at map on every point
          ObjectID : counter++,        
          CP: element.point.cp, 
                        region: element.point.region,
                        localAuthority: element.point.localAuthority,
                        linkLengthKm : element.point.linkLengthKm,
                        year2000 :element.statusOverTime[0].trafficCapacityRatio,
                        year2001 :element.statusOverTime[1].trafficCapacityRatio,
                        year2002 :element.statusOverTime[2].trafficCapacityRatio,
                        year2003 :element.statusOverTime[3].trafficCapacityRatio,
                        year2004 :element.statusOverTime[4].trafficCapacityRatio,
                        year2005 :element.statusOverTime[5].trafficCapacityRatio,
                        year2006 :element.statusOverTime[6].trafficCapacityRatio,
                        year2007 :element.statusOverTime[7].trafficCapacityRatio,
                        year2008 :element.statusOverTime[8].trafficCapacityRatio,
                        year2009 :element.statusOverTime[9].trafficCapacityRatio,
                        year2010 :element.statusOverTime[10].trafficCapacityRatio,
                        year2011 :element.statusOverTime[11].trafficCapacityRatio,
                        year2012 :element.statusOverTime[12].trafficCapacityRatio,
                        year2013 :element.statusOverTime[13].trafficCapacityRatio,
                        year2014 :element.statusOverTime[14].trafficCapacityRatio,
                        year2015 :element.statusOverTime[15].trafficCapacityRatio,
                        year2016 :element.statusOverTime[16].trafficCapacityRatio,
                        year2017 :element.statusOverTime[17].trafficCapacityRatio,
                      };
        let g = new Graphic( this.getGraphics(redPoint,lineAtt));
        this.redGraphics.push(g);
        });
        this.yellowPoints2.forEach(element => {// adding the yellow points graphics and data depend on longitude latitude of each point
          let yellowPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {//popup data at map on every point
            ObjectID : counter++,        
            CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority,
                          linkLengthKm : element.point.linkLengthKm,
                          year2000 :element.statusOverTime[0].trafficCapacityRatio,
                          year2001 :element.statusOverTime[1].trafficCapacityRatio,
                          year2002 :element.statusOverTime[2].trafficCapacityRatio,
                          year2003 :element.statusOverTime[3].trafficCapacityRatio,
                          year2004 :element.statusOverTime[4].trafficCapacityRatio,
                          year2005 :element.statusOverTime[5].trafficCapacityRatio,
                          year2006 :element.statusOverTime[6].trafficCapacityRatio,
                          year2007 :element.statusOverTime[7].trafficCapacityRatio,
                          year2008 :element.statusOverTime[8].trafficCapacityRatio,
                          year2009 :element.statusOverTime[9].trafficCapacityRatio,
                          year2010 :element.statusOverTime[10].trafficCapacityRatio,
                          year2011 :element.statusOverTime[11].trafficCapacityRatio,
                          year2012 :element.statusOverTime[12].trafficCapacityRatio,
                          year2013 :element.statusOverTime[13].trafficCapacityRatio,
                          year2014 :element.statusOverTime[14].trafficCapacityRatio,
                          year2015 :element.statusOverTime[15].trafficCapacityRatio,
                          year2016 :element.statusOverTime[16].trafficCapacityRatio,
                          year2017 :element.statusOverTime[17].trafficCapacityRatio,};
          let g = new Graphic( this.getGraphics(yellowPoint,lineAtt));
          this.yellowGraphics.push(g);
        })
        this.orangePoints2.forEach(element => {// adding the orange points graphics and data depend on longitude latitude of each point
          let orangePoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {//popup data at map on every point
            ObjectID : counter++,        
            CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority,
                          linkLengthKm : element.point.linkLengthKm,
                          year2000 :element.statusOverTime[0].trafficCapacityRatio,
                          year2001 :element.statusOverTime[1].trafficCapacityRatio,
                          year2002 :element.statusOverTime[2].trafficCapacityRatio,
                          year2003 :element.statusOverTime[3].trafficCapacityRatio,
                          year2004 :element.statusOverTime[4].trafficCapacityRatio,
                          year2005 :element.statusOverTime[5].trafficCapacityRatio,
                          year2006 :element.statusOverTime[6].trafficCapacityRatio,
                          year2007 :element.statusOverTime[7].trafficCapacityRatio,
                          year2008 :element.statusOverTime[8].trafficCapacityRatio,
                          year2009 :element.statusOverTime[9].trafficCapacityRatio,
                          year2010 :element.statusOverTime[10].trafficCapacityRatio,
                          year2011 :element.statusOverTime[11].trafficCapacityRatio,
                          year2012 :element.statusOverTime[12].trafficCapacityRatio,
                          year2013 :element.statusOverTime[13].trafficCapacityRatio,
                          year2014 :element.statusOverTime[14].trafficCapacityRatio,
                          year2015 :element.statusOverTime[15].trafficCapacityRatio,
                          year2016 :element.statusOverTime[16].trafficCapacityRatio,
                          year2017 :element.statusOverTime[17].trafficCapacityRatio,};
          let g = new Graphic( this.getGraphics(orangePoint,lineAtt));
          this.orangeGraphics.push(g);
        })
      })
      .catch(err => {
        console.error(err);
      });
  }
    @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: any[]) {
    this._center = center;
  }

  get center(): any[] {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  @Output() mapLoaded = new EventEmitter<boolean>();

  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  
// getting all the data that been needed to the component, from the data base using the service component
  constructor(private _streetpointsservice:StreetPointsService,private _streetservice : StreetService, private router : Router){
    //checking if their is a spasific latitude longitude to show on map, this condition is used when user 
    //choose a point from the table data at admin street page  
    if(this.data ){
      this._center=this.data;
      this._zoom=15; 
    } 
  }
 async foo() {// insert streets data to a variable  
  let res = await  this._streetpointsservice.getStreetPoints();
  this.subscribeToObs(res);
}
getGraphics(gGeometry ,gAttributes){// esri map API graphics imports
  return  {
    geometry:gGeometry, 
    attributes : gAttributes
  }
}

subscribeToObs(jsonpoints) {//sorting street data points depend on status number that we set in data base
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



getGraphicsFields(){// pop-up fields
  let fields =   [
    ({
      name: "ObjectID",
      alias: "ObjectID",
      type: "oid"
    }), ({
      name: "CP",
      alias: "CP",
      type: "string"
    }), ({
      name: "region",
      alias: "region",
      type: "string"
    }),
    ({
      name: "localAuthority",
      alias: "localAuthority",
      type: "string"
    }),({
      name : "linkLengthKm",
      alias : "linkLengthKm",
      type : "double"
    })
    
   ];
    return  fields.concat(this.getYearAttr())
 }
getYearAttr(){
  let arr = []
  for(let i =0;i<=9;i++){
    arr.push({
      name : "year200"+i,
      alias: "year200"+i,
      type :"int"
    })
  }
  for(let i =10;i<17;i++){
    arr.push({
      name : "year20"+i,
      alias: "year20"+i,
      type :"int"
    })
  }
  return arr;
}


getYearFields(){
  let arr = []
  for(let i =0;i<=9;i++)
    arr.push("year200"+i)
  
  for(let i =10;i<17;i++)
    arr.push("year20"+i)
  return arr;
}

getLayer(title,graphics,renderer ){// add API layers
  return ({
    title : title,
    source : graphics,
    fields: this.getGraphicsFields(),       
    objectIdField: "ObjectID",  // field name of the Object IDs
    geometryType: "point",
    popupTemplate: {
     content: [{
       type: "fields",
       fieldInfos: [
         {fieldName: "CP"},
         {fieldName: "region"},
         {fieldName: "localAuthority"},
         {fieldName :"linkLengthKm" }

       ]
    },{
    type: "media",
    mediaInfos: [{
      title: "<b>Status Chart</b>",
      type: "line-chart",
      value: {
        fields : this.getYearFields(),
      }
    }]
  }]
   },
   renderer :renderer
  });
}

  public ngOnInit() {// the page start here all the other function help the page to start 
    //load modules from esri API 
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/layers/FeatureLayer",
      "esri/widgets/LayerList",
      "dojo/domReady!"
     
    ])
      .then(([ EsriMap, EsriMapView, Graphic,Search,FeatureLayer,LayerList]) => {

        // Set type for Map constructor properties
        const mapProperties: esri.MapProperties = {
          basemap: this._basemap
        };

        let map: esri.Map = new EsriMap(mapProperties);

        // Set type for MapView constructor properties
       
        const mapViewProperties: esri.MapViewProperties = {
          container: this.mapViewEl.nativeElement,
          center: this._center,
          zoom: this._zoom,
          map: map
        };
        //Adding the engine at the map  
        let mapView: esri.MapView = new EsriMapView(mapViewProperties);
        const searchWidget = new Search({
          view: mapView
        });    
        mapView.ui.add(searchWidget,'top-right'); 
        this.foo().then(() =>{   
        Promise.all([this.fillinTheGraphics()])
               .then(() =>{
                let redLayer = new FeatureLayer(this.getLayer("redLayer",this.redGraphics,this.redRenderer));
                let orangeLayer = new FeatureLayer(this.getLayer("orangeLayer",this.orangeGraphics,this.orangeRenderer));
                let yellowLayer = new FeatureLayer(this.getLayer("yellowLayer",this.yellowGraphics,this.yellowRenderer));
                map.addMany([redLayer,orangeLayer,yellowLayer]);      
                /* var createChart = function(data){
                  console.log("Hey!!!")
                  return "data"
                } */
/*                 redLayer.popupTemplate.content = "{CP:createChart}";     
 */                let layerList = new LayerList({
                  view: mapView
                });
                mapView.ui.add(layerList, "bottom-right");
                mapView.when(() => {
                 this.mapLoaded.emit(true);
               })
              })
            });
          })
        }// ngOnInit 
}

     
    
    
  

