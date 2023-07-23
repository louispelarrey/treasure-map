import { Point } from "../Point/Point.interface";

/**
 * Interface representing a treasure with its position and count.
 *
 * @interface ITreasure
 * @extends {Point} The `Point` interface provides x and y coordinate properties.
 */
export interface ITreasure extends Point {
  /**
   * The number of treasures at the specified position.
   *
   * @type {number}
   */
  count: number;
}
