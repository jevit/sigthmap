import {Point} from "./point";
export class Parcours {
  _id: number;
  nom: string;
  dateMaj: Date;
  description: string;
  lag: number;
  lon: number;
  km:number;
  points: Array<Point>;

  equals(point:Point ){
    this._id = point._id;
  }
}
