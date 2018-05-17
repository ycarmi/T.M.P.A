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
  private pointsCorrdinates = [];

   redPointsCorrdinates=[];
   yellowPointsCorrdinates=[];
   orangePointsCorrdinates=[];
   redPoints = { type: "multipoint", points :this.redPointsCorrdinates};
   orangePoints ={ type : "multipoint", points : this.orangePointsCorrdinates};
   yellowPoints ={ type : "multipoint", points : this.yellowPointsCorrdinates};
   redMarkerSymbol = { type: "simple-marker", color: "red"};
   orangeMarketSymbol = { type : "simple-marker", color : "orange"};
   yellowMarkerSymbol = { type : "simple-marker", color : "yellow"};
   lineAtt = { Name: "Keystone Pipeline",Owner: "TransCanada",Length: "3,456 km" };

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

  separatePointsColors(){

    this._streetpointsservice.getStreetPoints().subscribe((jsonpoints)=>{
           
      jsonpoints.forEach(element => {
        var pointCorrdinate = [];
        var statuses = element.statusOverTime;
                     
        var status = statuses[statuses.length-1].trafficStatus;
        
          pointCorrdinate.push(element.point.longitude);
          pointCorrdinate.push(element.point.latitude);
        
        if(status == 4){
          this.redPointsCorrdinates.push(pointCorrdinate);
        }else if(status == 3){
          this.orangePointsCorrdinates.push(pointCorrdinate);
        }else if(status == 2){
          this.yellowPointsCorrdinates.push(pointCorrdinate);
        }
       
      });
       console.log(this.redPointsCorrdinates)
      console.log(this.orangePointsCorrdinates)
      console.log(this.yellowPointsCorrdinates) 
  }, err => {
    console.error(err);
  });
}
  public ngOnInit() {
         // First create a line geometry (this is the Keystone pipeline)

    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/layers/MapImageLayer",
      "dojo/on",
      "dojo/domReady!"
     
    ])
      .then(([ EsriMap, EsriMapView, Graphic,Search, MapImageLayer,on]) => {

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
        
        this.separatePointsColors();

        let mapView: esri.MapView = new EsriMapView(mapViewProperties);
      
                  // Create a graphic and add the geometry and symbol to it
            var redPointsGraphic = new Graphic({
              geometry:this.redPoints,
              symbol : this.redMarkerSymbol,
              attributes : this.lineAtt,
              popupTemplate: {
                title: "{Name}",
                content: [{
                  type: "fields",
                  fieldInfos: [{
                    fieldName: "Name"
                  }, {
                    fieldName: "Owner"
                  }, {
                    fieldName: "Length"
                  }]
                }]
              }
            })
            var orangePointsGraphic = new Graphic({
              geometry:this.orangePoints,
              symbol : this.orangeMarketSymbol,
              attributes : this.lineAtt,
              popupTemplate: {
                title: "{Name}",
                content: [{
                  type: "fields",
                  fieldInfos: [{
                    fieldName: "Name"
                  }, {
                    fieldName: "Owner"
                  }, {
                    fieldName: "Length"
                  }]
                }]
              }
            })
            var yellowPointsGraphic = new Graphic({
              geometry:this.yellowPoints,
              symbol : this.yellowMarkerSymbol,
              attributes : this.lineAtt,
              popupTemplate: {
                title: "{Name}",
                content: [{
                  type: "fields",
                  fieldInfos: [{
                    fieldName: "Name"
                  }, {
                    fieldName: "Owner"
                  }, {
                    fieldName: "Length"
                  }]
                }]
              }
            })

            mapView.graphics.addMany([redPointsGraphic,orangePointsGraphic,yellowPointsGraphic]);
            const searchWidget = new Search({
              view: mapView
              
              });
              mapView.ui.add(searchWidget,'top-right'); 

            mapView.when(() => {
              this.mapLoaded.emit(true);
              
            })
          })
        }
      }

     
    
    
  

