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

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})

export class EsriMapComponent implements OnInit {

  // Private vars with default values
  private _zoom = 3;
  private _center = [-80, 35];
  private _basemap = 'hybrid';
  

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

  constructor() { }

getPoints(): Number[][]{
  return [[-4.270159054,55.85186829],[-71.2643,42.0909]];
}

  public ngOnInit() {
         // First create a line geometry (this is the Keystone pipeline)



    loadModules([
      'esri/Map',
      'esri/views/MapView',
      "esri/Graphic",
      "dojo/domReady!"
     
    ])
      .then(([    
        EsriMap, EsriMapView, Graphic
     //   Locator, SimpleMarkerSymbol, FeatureLayer,webMercatorUtils,
       //  Point, Legend, esriRequest,Multipoint
        ]) => {

/*         function getData() {

          // data downloaded from the USGS at http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/ on 4/4/16
          // month.geojson represents recorded earthquakes between 03/04/2016 and 04/04/2016
          // week.geojson represents recorded earthquakes betwen 03/28/2016 and 04/04/2016
  
          var url = "https://localhost:8080/Status";
  
          return esriRequest(url, {
            responseType: "json"
          });
        } */
/*         function createGraphics() {
          // raw GeoJSON data
          
  
          // Create an array of Graphics from each GeoJSON feature
          
            return {
              geometry: new Point({
                x: -6.317072964,
                y:49.91502292 
              }),
              // select only the attributes you care about
              attributes: {
                
                cp: 51,
                region: 31
              }
            };
          
        }

        var locatorTask = new Locator({
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
       }); */

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
        var points = {
          type: "multipoint",
          points : this.getPoints()
        }

        // Create a symbol for drawing the point
        var markerSymbol = {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          color: "red"
        };
        var lineAtt = {
          Name: "Keystone Pipeline",  // The name of the pipeline
          Owner: "TransCanada",  // The owner of the pipeline
          Length: "3,456 km"  // The length of the pipeline
        };

        // Create a graphic and add the geometry and symbol to it
        var pointsGraphic = new Graphic({
          geometry:points,
          symbol : markerSymbol,
          attributes : lineAtt,
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
        mapView.graphics.addMany([pointsGraphic]);


/*         mapView.graphics.add(g);
 */
        mapView.when(() => {
          this.mapLoaded.emit(true);
          // All the resources in the MapView and the map have loaded. Now execute additional processes
   /*        
          mapView.on("click", function(event) {
            event.stopPropagation();
            
            // Get the coordinates of the click on the view
            // around the decimals to 3 decimals
            var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
            var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
        
            mapView.popup.open({
                // Set the popup's title to the coordinates of the clicked location
                title: "Reverse geocode: [" + lon + ", " + lat + "]",
                location: event.mapPoint // Set the location of the popup to the clicked location
            });
            locatorTask.locationToAddress(event.mapPoint).then(function(response) {
              // If an address is successfully found, show it in the popup's content
              mapView.popup.content = response.address;
            }).catch(function(err) {
              // If the promise fails and no result is found, show a generic message
              mapView.popup.content = "No address was found for this location";
            }); */
   /*         console.log(map.allLayers)
            var points = {   
              "points": [[-6.317072964,49.91502292],[-122.56,45.51],[-122.56,45.55],[-122.62,45.00],[-122.59,45.53]]
            };  
            var mp = Multipoint(points);  
            var wm_mp = webMercatorUtils.geographicToWebMercator(mp);  
            var sms = new SimpleMarkerSymbol();  
            var graphic = new Graphic(wm_mp, sms, '', ''); 
            
        });*/
                   
           
   /*******************************************
   * Create a new graphic and add the geometry,
   * symbol, and attributes to it. You may also
   * add a simple PopupTemplate to the graphic.
   * This allows users to view the graphic's
   * attributes when it is clicked.
   ******************************************/


        }, err => {
          console.error(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
      

  } // ngOnInit
}
