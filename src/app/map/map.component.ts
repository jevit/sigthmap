import { Component, OnInit,ViewChild } from '@angular/core';
import {Map} from 'leaflet';
import { MapService } from './map.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	
	@ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;
	private markerCount : number = 0;
	private optionMap : any = {
		zoomControl: false,
		center: L.latLng(40.731253, -73.996139),
		zoom: 12,
		minZoom: 4,
		maxZoom: 19,
		layers: [this.mapService.baseMaps.OpenStreetMap]
	}
	
	constructor(private mapService: MapService) { } 
  
	ngOnInit() {
	    let map = L.map("map", this.optionMap);
        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
		this.mapService.getCurrentLocation()
			.subscribe(
				location => map.panTo([location.lat, location.lon]),
				err => console.error(err)
		);
	}

    ngAfterViewInit() {
       // this.toolbarComponent.Initialize();
		this.toolbarComponent.call(this.mapService.map);
    }
	
}
