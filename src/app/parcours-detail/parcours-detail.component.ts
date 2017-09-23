import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-parcours-detail',
  templateUrl: './parcours-detail.component.html',
  styleUrls: ['./parcours-detail.component.css']
})
export class ParcoursDetailComponent implements OnInit {
	
  @Input() iClass : any;
  @Input() parcours : any ;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }
  
  /** 
  * Change le style du detail du parcours 
  * une fois sur dois on change la couleur
  **/
  setStyleParcours(i) {
    if(i % 2 === 0){
      return 'panel-grey';
    }
    else{
      return 'panel';
    }
  }
  
}
