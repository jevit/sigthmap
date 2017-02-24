import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-elevation',
  templateUrl: './elevation.component.html',
  styleUrls: ['./elevation.component.css']
})
export class ElevationComponent implements OnInit {
	@Input() points:any = [];
    constructor() {
        
    }
	
	ngOnInit() {
		
	}
	 // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 400,100,55,80,10], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public lineChartOptions:any = {
	layout:{
		padding:10
	},
	gridLines:{
		display:false
	},
    responsive: false
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
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 1000) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
	onChange(e:any):void{
		console.log('test') ;
	}
}