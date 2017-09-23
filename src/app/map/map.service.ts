import { Injectable,EventEmitter,Output } from '@angular/core';
import {Http, Headers, Response } from "@angular/http";
import {Point} from "./point";
import {Parcours} from "./parcours";
import {Map} from 'leaflet';
import * as L from 'leaflet';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class MapService {
 	@Output() emitTrajet = new EventEmitter();

	// Public
	public map: any;
	public trajet: any;
    public baseMaps: any;
	public points: Array<Point> = [];
	public markers: Array<any> = [];
	// Private
    private http: Http;
    private vtLayer: any;
	private latlngs: any = [[52.6, -1.1], [52.605, -1.1], [52.606, -1.105], [52.697, -1.109]];
	private optionSegment: any = {color: 'green'};

	// Constructor
	constructor(http: Http,) {
        this.http = http;

		// Layers
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
	
	
    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);
        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

	/**
	 * Obtenir sa location courante
	 */
	getCurrentLocation() {
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

	/**
	 *  Ajouter un Marker 
	 **/
	addMarker(point,type){
		// Prepare les données
		let offset:any = [];
		if(type === 'red'){
			//offset = L.point(12, 6);
			offset = L.point(6, 6);
		}
		else if (type === 'km'){
			offset = L.point(6, 6);
		}
		offset = L.point(12, 6);

		// Ajuste la vue
		this.map.setView(L.latLng(point.lat, point.lon),12);

		// Ajout du marker dans la map
		let marker = L.marker( L.latLng(point.lat, point.lon), {
			icon: this.createIcon(type),
			draggable: false
		})
		.bindPopup(point.nom, {
			offset: offset
		});
		marker.addTo(this.map);

		// Markers ajout dans la liste de markers
		this.markers.push(marker);
	}
	
	/** 
	 * Ajouter une liste de Markers 
	 **/
	addMarkers(points){
		for (let point of points) {
			if(point.lat !== undefined && point.lon !== undefined){
				this.addMarker(point,'bleue');
			}
		}
	}

	/**
	 * Enlever un Marker
	 */
	removeMarker(point){
		if(!point){
			console.log('removeMarker: point undefined');
			return;
		}
		// Recherche le markers 
		this.markers.forEach((marker,index) => {
			// Si LatLng ==
			if( marker._latlng.lat === point.lat && marker._latlng.lng === point.lon){
				// Supprime le Marker sur la carte
				this.map.removeLayer(marker);
				// Supprime le markers de la liste
				this.markers.splice(index, 1);
			}
		});
	}

	/**
	 * Enlever un Point
	 */
	removePoint(point:Point){
		if(!point){
			console.log('removePoint: point undefined');
			return;
		}
		// Suppression du Point
		this.points.forEach((pointTmp,index) => {
			if(point.equals(pointTmp)){
				this.points.splice(index, 1);
			}
		});
	}

	/** 
	 * Ajouter un parcours 
	 **/
	addPolylines(parcours){
		let points = parcours.points;
		// Efface le dernier trajet de la map
		this.clearTrajet();
		this.clearMarkers(this.markers);

		// Initialise la liste des points (latlng)
		this.latlngs = [];
		for(let point of points){
			let latlng = [point.lat, point.lon];
			this.latlngs.push(latlng);
		}

		// Création du trajet et ajout sur la map
		var trajet = L.polyline(this.latlngs,{color: 'green'}).addTo(this.map);

		// Ajoute un marker pour le Point d'arrivé
		this.addMarker(points[points.length-1],'red');

		// Ajoute un marker pour le Point de départ
		this.addMarker(points[0],'bleue');
		//this.fitBound(points[0],points[points.length-1]);
		
		// Ajoute un marker pour le point de départ
		for(let point of points){
			if(Number(point.nom)){
				this.addMarker(point,'km');
			}
		}

		// Affecte les données
		this.trajet = trajet;
		this.points = points;

		// Emit value
    	this.emitTrajet.emit(parcours);
		
		return this.trajet;
	}
	
	/** 
	 * Creation d'une icone pour marker 
	 **/
	createIcon(type){
		let iconUrl = '';
		let iconSize:any = [];
		let iconAnchor:any = []; // size of the icon
		// Initialise l'icone
		if(type === 'red'){
			iconUrl = "assets/marker-icon-red-r.png";
			iconSize = [16, 27]; 	//iconSize = [25, 41]; 
			iconAnchor = [8, 13];	//iconAnchor = [12.5, 40];
		}
		else if (type === 'bleue'){
			iconUrl = "assets/marker-icon-bleue-r.png";
			iconSize = [16, 27]; 
			iconAnchor = [8, 13];
		}
		else if (type === 'km'){
			iconUrl = "assets/green-marker-icon-r.png";
			iconSize = [12, 20]; // size of the icon
			iconAnchor = [6, 10];
		}
		else if (type === 'current'){
			iconUrl = "assets/marker-icon.png";
			iconSize = [25, 41]; 
			iconAnchor = [12.5, 40];
		}
		// Création de l'icone
		let icon = L.icon({
			iconUrl: iconUrl,
			iconSize: iconSize, // size of the icon
			iconAnchor: iconAnchor // point of the icon which will correspond to marker's location
		})
		return icon;
	}
	
	/**
	 * Supprime une liste de Point
	 */
	clearPoints(points:Array<Point>){
		for (let point of points) {
			this.clearPoint(point);
		}
	}

	/**
	 * Supprime un Point
	 */
	clearPoint(point:Point){
		// Convert to marker
		let marker = this.getMarkerFromPoint(point);
		// Supprime le markers
		this.map.removeLayer(marker);
	}

	/**
	 * Supprime un Marker
	 */
	clearMarkers(markers:any){
		// Supprime les markers
		for (let marker of markers) {
			this.map.removeLayer(marker);
		}
		markers = [];
	}

	/**
	 * Supprime un trajet (Polyline)
	 */
	 clearTrajet(){
		// S'il le trajet a été initialisé une premiere fois 
		if(this.trajet !== undefined){
			// Suppression du trajet
   	 		this.map.removeLayer(this.trajet);
			this.trajet = [];
	 	}
	 }

	/**
	 * Transforme les points en marker
	 */
	getMarkerFromPoint(point:Point){
		let marker = L.marker( L.latLng(point.lat, point.lon));
		return marker;
	}
}
