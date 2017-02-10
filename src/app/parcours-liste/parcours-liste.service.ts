import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class ParcoursListeService {

  constructor(private http: Http) { }
  
 // Get all parcourss from the API
  getAllParcours() {
    return this.http.get('/api/parcours')
      .map(res => res.json());
  }
  
  // Get parcours from the API
  getParcours(id:string) {
    return this.http.get('/api/parcours/'+ id)
      .map(res => res.json());
  }
  
  createParcours(parcours) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(parcours);
    return this.http.post('/api/parcours/', body, headers).map((res: Response) => res.json());
  }
  
  updateParcours(parcours) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(parcours);
    return this.http.put('/api/parcours/' + parcours._id, body, headers).map((res: Response) => res.json());
  }
  
  deleteParcours(id) {
    return this.http.delete('/api/parcours/' + id);
  }
}
