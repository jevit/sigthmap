import { Component, OnInit,Input,Output } from '@angular/core';
import { PointService } from './point.service';
import { Point } from "../map/point";
import { ActivatedRoute, Params, Router} from '@angular/router';
import { MapService } from '../map/map.service';
import {} from "angular2/core";

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
  points: any = [];
  
  constructor(private router: Router,private pointService: PointService,private mapService: MapService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.pointService.getAllPoint().subscribe(points => {
		this.points = points;
    });
  }

  onSelect(point){
	console.log(point);
	this.mapService.addPoint(point);
	//this.router.navigate(['/point-detail/', point._id]);
  }
}
