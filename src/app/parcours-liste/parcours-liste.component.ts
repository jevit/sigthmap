import { Component, OnInit,Input,Output } from '@angular/core';
import { ParcoursListeService } from './parcours-liste.service';
import { Parcours } from "../map/parcours";
import { ActivatedRoute, Params, Router} from '@angular/router';
import { MapService } from '../map/map.service';
import {} from "angular2/core";

@Component({
  selector: 'app-parcours-liste',
  templateUrl: './parcours-liste.component.html',
  styleUrls: ['./parcours-liste.component.css']
})
export class ParcoursListeComponent implements OnInit {

  parcoursList: any = [];
  
  constructor(private router: Router,private parcoursService: ParcoursListeService,private mapService: MapService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.parcoursService.getAllParcours().subscribe(parcoursList => {
		this.parcoursList = parcoursList;
    });
  }

  onSelect(parcours){
	this.mapService.addPoints(parcours.points);
	//this.router.navigate(['/parcours-detail/', parcours._id]);
  }
}
