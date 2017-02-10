import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PointService } from '../point/point.service';
import { Point } from "../map/point";

@Component({
  selector: 'app-point-detail',
  templateUrl: './point-detail.component.html',
  styleUrls: ['./point-detail.component.css']
})
export class PointDetailComponent implements OnInit {
  @Input() point: Point;
  @Output() close = new EventEmitter();
  
  constructor(
    private pointService: PointService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
	  this.route.params.forEach((params: Params) => {
		let id = params['id'];
        this.pointService.getPoint(params['id']).subscribe(point => {
		    this.point = point;
		});
    });
  }

  goBack(){
	  
  }
}
