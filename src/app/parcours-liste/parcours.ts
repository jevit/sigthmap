export class Parcours {
  _id: number;
  nom: string;
  dateMaj: date;
  description: string;
  lag: number;
  lon: number;
  elevation: number;
  points: Array<Point>;
}
