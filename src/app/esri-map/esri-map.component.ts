import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
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

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { StreetPoints } from '../street-points';
import { StreetPointsService } from '../shared-service/street-points.service';
import axios from 'axios' 
import { constructDependencies } from '@angular/core/src/di/reflective_provider';


@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  // Private vars with default values
  private _zoom = 12;
  private _center = [-2.013236813, 52.57441986];
  private _basemap = 'streets';
  
  redPoints2   : StreetPoints[] = [];
  orangePoints2 : StreetPoints[] = [];
  yellowPoints2 : StreetPoints[] = [];      
  redMarkerSymbol = { type: "simple-marker", color: "red"};
  orangeMarkerSymbol = { type : "simple-marker", color : "orange"};
  yellowMarkerSymbol = { type : "simple-marker", color : "yellow"};
  redGraphics  = [];
  yellowGraphics  = [];
  orangeGraphics = [];
  
  async fillinTheGraphics(){
    await loadModules([
      'esri/Graphic',"dojo/domReady!"
    ])
      .then(([Graphic]) => {
        this.redPoints2.forEach(element => {
        let redPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
        let lineAtt = {CP: element.point.cp, region: element.point.region
                        ,localAuthority: element.point.localAuthority};
        let g = new Graphic( this.getGraphics(redPoint,this.redMarkerSymbol,lineAtt));
        this.redGraphics.push(g);
        });
   
        this.yellowPoints2.forEach(element => {
          let yellowPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority};
          let g = new Graphic( this.getGraphics(yellowPoint,this.yellowMarkerSymbol,lineAtt));
          this.yellowGraphics.push(g);
        })
        this.orangePoints2.forEach(element => {
          let orangePoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority};
          let g = new Graphic( this.getGraphics(orangePoint,this.orangeMarkerSymbol,lineAtt));
          this.orangeGraphics.push(g);
        })
      })
      .catch(err => {
        console.error(err);
      });


  }
   renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-line", // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.5],
      width: 0.75,
      style: "long-dash-dot-dot"
    }
  };
  

  
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
  

  constructor(private _streetpointsservice:StreetPointsService) { }

 
 async foo() {
  let res = await  this._streetpointsservice.getStreetPoints();
  this.subscribeToObs(res);
}
showAllPoints(){
  loadModules([
    'esri/Map',
    'esri/views/MapView',
    "esri/widgets/Search"])
    .then(([ EsriMap, EsriMapView,Search]) => { 
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
      let mapView: esri.MapView = new EsriMapView(mapViewProperties);   
          mapView.graphics.addMany(this.redGraphics);
          mapView.graphics.addMany(this.yellowGraphics);
          mapView.graphics.addMany(this.orangeGraphics);
          const searchWidget = new Search({
            view: mapView
            
          });
          
          mapView.ui.add(searchWidget,'top-right');
          
    })
}
showYellowPoints(){
  loadModules([
    'esri/Map',
    'esri/views/MapView',
    "esri/widgets/Search"])
    .then(([ EsriMap, EsriMapView,Search]) => { 
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
      let mapView: esri.MapView = new EsriMapView(mapViewProperties);   
          mapView.graphics.removeMany(this.redGraphics);
          mapView.graphics.removeMany(this.orangeGraphics);
          mapView.graphics.addMany(this.yellowGraphics);
          const searchWidget = new Search({
            view: mapView
            
          });
          
          mapView.ui.add(searchWidget,'top-right');
          
    })
}
showOrangePoints(){
  loadModules([
    'esri/Map',
    'esri/views/MapView',
    "esri/widgets/Search"])
    .then(([ EsriMap, EsriMapView,Search]) => { 
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
      let mapView: esri.MapView = new EsriMapView(mapViewProperties);   
          mapView.graphics.removeMany(this.redGraphics);
          mapView.graphics.removeMany(this.yellowGraphics);
          mapView.graphics.addMany(this.orangeGraphics);
          const searchWidget = new Search({
            view: mapView
            
          });
          
          mapView.ui.add(searchWidget,'top-right');
          
    })
}
showRedPoints(){
  loadModules([
    'esri/Map',
    'esri/views/MapView',
    "esri/widgets/Search"])
    .then(([ EsriMap, EsriMapView,Search]) => { 
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
      let mapView: esri.MapView = new EsriMapView(mapViewProperties);   
          mapView.graphics.removeMany(this.orangeGraphics);
          mapView.graphics.removeMany(this.yellowGraphics);

          mapView.graphics.addMany(this.redGraphics);
          const searchWidget = new Search({
            view: mapView
            
          });
          
          mapView.ui.add(searchWidget,'top-right');
          
    })
}



getGraphics(gGeometry , gSymbol,gAttributes){
  return  {
    geometry:gGeometry, symbol : gSymbol, attributes : gAttributes,
    popupTemplate: { title: "{Name}",content: [{
       type: "fields",
        fieldInfos: [
      {fieldName: "CP"},
      {fieldName: "region"},
      {fieldName: "localAuthority"}
      ]
    }]
          }
  }
}

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
 console.log(this.redPoints2);
}


  public ngOnInit() {
         // First create a line geometry (this is the Keystone pipeline)

    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/Graphic",
      "esri/widgets/Search",
      "dojo/domReady!"
     
    ])
      .then(([ EsriMap, EsriMapView, Graphic,Search]) => {

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
        

        let mapView: esri.MapView = new EsriMapView(mapViewProperties);
        const searchWidget = new Search({
          view: mapView
          
        });
               
        mapView.ui.add(searchWidget,'top-right'); 
        this.foo().then(() =>{   
        Promise.all([this.fillinTheGraphics()])
               .then(() =>{
                mapView.graphics
                .addMany(this.redGraphics);
                mapView.graphics
                .addMany(this.yellowGraphics);
                mapView.graphics
                .addMany(this.orangeGraphics);
                mapView.when(() => {
                 this.mapLoaded.emit(true);
               })  
              })
          });
          })
        }// ngOnInit 
     
      }

     
    
    
  

