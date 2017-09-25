import { Component, OnInit,ViewChild,Output,ElementRef,EventEmitter } from '@angular/core';
import {Map} from 'leaflet';
import { MapService } from './map.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ElevationComponent } from '../elevation/elevation.component';
import {Point} from "./point";
import {Parcours} from "./parcours";
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	
	@ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;
	@ViewChild(ElevationComponent) elevationComponent: ElevationComponent;

	private optionMap : any = {
		zoomControl: false,
		center: L.latLng(40.731253, -73.996139),
		zoom: 12,
		minZoom: 4,
		maxZoom: 19,
		layers: [this.mapService.baseMaps.OpenStreetMap]
	};	
	
	constructor(private mapService: MapService,private elRef: ElementRef) { 	} 
  
	ngOnInit() {
		// Initialise la map
		let map = L.map("map", this.optionMap);
		L.control.zoom({ position: "topright" }).addTo(map);
		L.control.layers(this.mapService.baseMaps).addTo(map);
		L.control.scale().addTo(map);

		// Affecte la map au service
		this.mapService.map = map;

		/* Obtenir la location courante */
		this.mapService.getCurrentLocation().subscribe(
				location => map.panTo([location.lat, location.lon]),
				err => console.error(err)
		);
	}

    ngAfterViewInit() {
       // this.toolbarComponent.Initialize();
		this.toolbarComponent.call(this.mapService.map);
    }
	
	/** fit bounds **/
	fitBound(pointEst,pointOuest){
		//	var bounds = L.bounds(pointOuest, pointEst);
		//	this.map.fitBounds(bounds);
	}


}
