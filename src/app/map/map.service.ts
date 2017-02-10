import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Point} from "./point";
import {Parcours} from "./parcours";
import {Map} from 'leaflet';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class MapService {
	public map:any;
	public markerCount:number=0;
    public baseMaps: any;
    private vtLayer: any;
    http: Http;
	  
	constructor(http: Http) {
        this.http = http;
		
		this.baseMaps = {
			OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
			}),
			Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
				attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
			}),
			CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
			})
		};
	}
	
	getCurrentLocation() {
			console.log('getCurrentLocation');
        return this.http
            .get("http://ipv4.myexternalip.com/json")
            .map(res => res.json().ip)
            .flatMap(ip => this.http.get("http://freegeoip.net/json/" + ip))
            .map((res: Response) => res.json())
            .map(result => {
				console.log(result);
                let location = new Point();
                location.nom = result.city + ", " + result.region_code + " " + result.zip_code + ", " + result.country_code;
                location.lat = result.latitude;
                location.lon = result.longitude;
                return location;
            });
    }
	
	addPoint(point){
		console.log('addPoint');
		this.map.setView(L.latLng(point.lat, point.lon),10);
		let marker = L.marker( L.latLng(point.lat, point.lon), {
			icon: L.icon({
				iconUrl: "assets/marker-icon.png",
				shadowUrl: "assets/marker-shadow.png"
			}),
			draggable: true
		})
		.bindPopup("Marker #" + (this.markerCount++).toString(), {
			offset: L.point(12, 6)
		})
		.addTo(this.map)
		.openPopup();
	}
	
	addPoints(points){
		for (let point of points) {
			if(point.lat !== undefined && point.lon !== undefined){
				this.addPoint(point);
			}
		}
	}
}
