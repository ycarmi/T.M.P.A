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
import { resolve } from 'url';


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
  redGraphics  = [];
  yellowGraphics  = [];
  orangeGraphics = [];
  
  async fillinTheGraphics(){
    await loadModules([
      'esri/Graphic',"dojo/domReady!"
    ])
      .then(([Graphic]) => {
        let counter = 1;
        this.redPoints2.forEach(element => {
        let redPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
        let lineAtt = {
          ObjectID : counter++,        
          CP: element.point.cp, 
                        region: element.point.region,
                        localAuthority: element.point.localAuthority};
        let g = new Graphic( this.getGraphics(redPoint,lineAtt));
        this.redGraphics.push(g);
        });
        this.yellowPoints2.forEach(element => {
          let yellowPoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {
            ObjectID : counter++,        
            CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority};
          let g = new Graphic( this.getGraphics(yellowPoint,lineAtt));
          this.yellowGraphics.push(g);
        })
        this.orangePoints2.forEach(element => {
          let orangePoint = {type: "point",longitude :element.point.longitude, latitude : element.point.latitude}
          let lineAtt = {
            ObjectID : counter++,        
            CP: element.point.cp, region: element.point.region
                          ,localAuthority: element.point.localAuthority};
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



getGraphics(gGeometry ,gAttributes){
  return  {
    geometry:gGeometry, 
    attributes : gAttributes
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
}



getGraphicsFields(){
  return  [
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
    })
   ];
}

getLayer(title,graphics,renderer ){
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
         {fieldName: "localAuthority"}
       ]
    }]
   },
   renderer :renderer
  });
}

  public ngOnInit() {
         // First create a line geometry (this is the Keystone pipeline)

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
                
                new Promise(resolve =>{
                  map.addMany([redLayer,orangeLayer,yellowLayer]);
                }).then()
                let rendererInfos;
                let currentInfo;
                
                  var layerList = new LayerList({
                    view: mapView,
                    // Assign a function to the LayerList widget
                    // that fires each time the relevant layer views are
                    // updated. This function must return a two-dimensional
                    // collection of action objects
                    listItemCreatedFunction: createLayerListActions
                  });
                  mapView.ui.add(layerList, "bottom-right");
                  // When any action in the LayerList is clicked,
                  // the trigger-action event fires and the toggleRenderer()
                  // callback executes
                  layerList.on("trigger-action", toggleRenderer);
                

                // This function must return a two-dimensional array of
                // action objects. This is done for the layer kept when the app
                // originally loaded.
                // One action is created for each rendererInfo object. The action title
                // will match the title of the rendererInfo object (and the associated
                // layer in the web map). The ID identifies the type of action executed
                // and the className points to an icon font included in the API. This icon
                // font is used to visually identify the action in the UI.

                function createLayerListActions(event) {
                  console.log("Im here!")
                  var listItem = event.item;
/*                   if (listItem.title === map.title) {
 */                 listItem.actionsOpen = true;
                    listItem.actionsSections = [rendererInfos.map(function(
                      rendererInfo) {
                      return {
                        title: rendererInfo.title,
                        className: "esri-icon-maps",
                        id: "change-renderer"
                      };
                    }).toArray()];
/*                   }
 */                }

                function toggleRenderer(event) {
                  if (event.action.id === "change-renderer") {
                    var matchingInfo = rendererInfos.find(function(info) {
                      return info.title === event.action.title;
                    });
                    // don't attempt to change the renderer if
                    // the selection is the same as the current renderer
                    if (matchingInfo.title === currentInfo.title) {
                      return;
                    } else {
                      currentInfo = matchingInfo;
                    }
                    // set the new renderer on the layer
                    var renderer = matchingInfo.renderer;
                    var layer = mapView.map.layers.getItemAt(0);
/*                     layer.renderer = renderer;
 */                  }
                }

                
                
                mapView.when(() => {
                 this.mapLoaded.emit(true);
                 
               })  
              })
          });
          })
        }// ngOnInit 
     
      }

     
    
    
  

