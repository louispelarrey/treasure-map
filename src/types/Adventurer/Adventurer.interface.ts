import { Point } from "../Point/Point.interface";

export interface IAdventurer extends Point {
  name: string;
  direction: string;
  moves: string[];
  treasures: number;
}
