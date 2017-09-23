import { Component, OnInit, Input ,Output,ElementRef,EventEmitter} from '@angular/core';
import { MapService } from '../map/map.service';
import {Point} from "../map/point";
import {Parcours} from "../map/parcours";

@Component({
  selector: 'app-elevation',
  templateUrl: './elevation.component.html',
  styleUrls: ['./elevation.component.css']
})
export class ElevationComponent implements OnInit {

  	@Input() points:any = [];
    private pointHover:Point;
    private showChart = false;
 	  @Output() emitHover = new EventEmitter();

    constructor(private mapService:MapService ) {
      this.mapService.emitTrajet.subscribe(parcours => this.onChangeParcours(parcours));
    }

    ngOnInit() {
       this.mapService.disableMouseEvent("elevation-profile");
    }

    public lineChartOptions:any = {
      scaleShowVerticalLines: false,
      layout:{
        padding:10
      },
      responsive: true,
	  hover: { onHover: (event, active) => { this.chartHovered(event,active)} },
      // hover:{intersect:true
      //    // onHover: this.chartHovered
      //     // function(e:any,currentTarget:any) {
      //     // // this.chartHovered(e,currentTarget)
      //     // }
      // },
      //Enleve les points
      elements: {
          point: {
             radius: 0
          }
      },
      scales: {
          xAxes: [{
              // Enleve la grille
              gridLines: {
                 display:false
              },
              // Ajuste l'échelle
              ticks: {
                  autoSkip:false,
                  stepSize:2,
                  callback: function(tickValue, index, ticks) {
                        let step = ticks.length/10;
                        if(index===0){
                          return ;
                        }
                        else{
                          if(Number(ticks[index-1]).toFixed(0)!==Number(tickValue).toFixed(0)){
                              return Number(tickValue).toFixed(0);
                          }

                        }
                  },
              }
          }],
          yAxes: [{
              // Enleve la grille
              gridLines: {
                  display:false
              }
          }]
        }
    };

    // rgba(255, 218, 0, 0.8)
    public lineChartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(0, 151, 0, 0.11)',
        borderColor: 'rgba(0, 151, 0, 1)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 218, 0, 0.91)'
      }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';
    // lineChart DATA
    public lineChartData:Array<any> = [{data: [], label: ''},{data: [], label: ''}  ];
    public lineChartLabels:Array<any> = [];

    /**
     * Clicked
     */
    public chartClicked(e:any):void {
      // Attend que l'on clic sur un point du chart
      if(!e.active || !e.active[0] || !e.active[0]._index){
        console.log("return");
        return;
      }
      // get l'index du tableau lineChartData
      var index = e.active[0]._index;
      // get point associé
      if(this.mapService.points[index]){
        let point:Point = this.mapService.points[index];
        //Ajoute un marker
        this.mapService.addMarker({lat:point.lat,lon:point.lon},'current');
        // Supprime l'ancien Point courant
        this.mapService.removeMarker(this.pointHover);
        //Affecte le nouveau point courant
        this.pointHover = point;
      }
    }

    /**
     * Hovered
     */
    public chartHovered(e:any,currentTarget:any):void {
		console.log(e);
		console.log(currentTarget);
        // Attend que l'on clic sur un point du chart
        if(!currentTarget || !currentTarget[0] || !currentTarget[0]._index){
          console.log("return");
          return;
        }
        this.emitHover
        console.log(currentTarget);
        // get l'index du tableau lineChartData
        var index = currentTarget[0]._index;
        console.log(index);
        // get point associé
        let point = this.mapService.points[index];
        console.log(point);
        //Ajoute un marker
        this.mapService.addMarker({lat:point.lat,lon:point.lon},'current');
        // Supprime l'ancien Point courant
        this.mapService.removeMarker(this.pointHover);
        //Affecte le nouveau point courant
        this.pointHover = point;
    }

    public onChangeParcours(parcours:Parcours):void{
      // Afficher le Chart
      this.showChart = true;
      // Prepare data
      let points:Array<Point> = parcours.points;
      let elevation = new Array();
      let km = new Array();
      //clean chart
      this.lineChartData[0].data = [];
      this.lineChartData[0].label = [];
      this.lineChartLabels = [];
      // création des données
      points.forEach(function(point){
         // Création des données
         elevation.push(point.elevation);
         if(point.km){
            km.push(point.km.toFixed(0));
         }
      });
      // Affecte les données
      this.lineChartData[0].label = parcours.nom;
      this.lineChartData[0].data = elevation;
      this.lineChartLabels = km;
    }
}
