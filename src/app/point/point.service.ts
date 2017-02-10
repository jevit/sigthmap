import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class PointService {

  constructor(private http: Http) { }
  
 // Get all points from the API
  getAllPoint() {
    return this.http.get('/api/point')
      .map(res => res.json());
  }
  
  // Get point from the API
  getPoint(id:string) {
    return this.http.get('/api/point/'+ id)
      .map(res => res.json());
  }
  
  createPoint(point) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(point);
    return this.http.post('/api/point/', body, headers).map((res: Response) => res.json());
  }
  
  updatePoint(point) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(point);
    return this.http.put('/api/point/' + point._id, body, headers).map((res: Response) => res.json());
  }
  
  deletePoint(id) {
    return this.http.delete('/api/point/' + id);
  }
}
