export class Point {
  _id: number;
  nom: string;
  description: string;
  lat: number;
  lon: number;
  elevation: number;
  km:number;

  equals(point:Point ){
    this._id = point._id;
  }
}