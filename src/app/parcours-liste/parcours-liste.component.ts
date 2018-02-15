import { Component, OnInit,Input,Output  } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ParcoursService } from '../parcours/parcours.service';
import { Parcours } from "../map/parcours";
import { MapService } from '../map/map.service';
import { ElevationService } from '../elevation/elevation.service';

@Component({
  selector: 'app-parcours-liste',
  templateUrl: './parcours-liste.component.html',
  styleUrls: ['./parcours-liste.component.css']
})
export class ParcoursListeComponent implements OnInit {

  interval : any ;
  parcoursList: any = [];
  
  constructor(private router: Router,private parcoursService: ParcoursService,private mapService: MapService,private elevationService:ElevationService) { }

  ngOnInit() {
	this.interval = setInterval(() => { 
		// Retrieve posts from the API
		this.parcoursService.getAllParcours().subscribe(parcoursList => {
				this.parcoursList = parcoursList;
		});
	}, 5000);
  }

  /**
   * Event sur la selection du parcours
   **/
  onSelect(parcours){
    //this.mapService.addPoints(parcours.points);
    this.mapService.addPolylines(parcours);

    // MouseOver parcours
    // this.mapService.trajet.on('mouseover', function($event) {
    //     this.elevationService.lineChartLabels = [1,2];
    // });

    // Chargement du Chart
   // this.elevationService.lineChartLabels =[];
    
    //this.router.navigate(['/parcours-detail/', parcours._id]);
  }
}
