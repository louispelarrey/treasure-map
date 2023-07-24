import { Point } from "../Point/Point.interface";

/**
 * Interface representing an adventurer with its attributes.
 *
 * @interface IAdventurer
 * @extends {Point} The `Point` interface provides x and y coordinate properties.
 */
export interface IAdventurer extends Point {
  /**
   * The name of the adventurer.
   *
   * @type {string}
   */
  name: string;

  /**
   * The direction the adventurer is facing.
   *
   * @type {string}
   */
  direction: string;

  /**
   * An array of movement instructions for the adventurer.
   *
   * @type {string[]}
   */
  moves: string[];

  /**
   * The number of treasures collected by the adventurer.
   *
   * @type {number}
   */
  treasures: number;
}
