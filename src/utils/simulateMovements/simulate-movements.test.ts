import { simulateMovements } from "./simulate-movements"; // Adjust this import according to your file structure.
import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";
import { describe, it, expect } from "@jest/globals";

describe("simulateMovements", () => {
  it("should correctly simulate movements", () => {
    const map: IMap = { width: 3, height: 3 };
    const mountains: IMountain[] = [{ x: 1, y: 1 }];
    const treasures: ITreasure[] = [{ x: 2, y: 2, count: 1 }];
    const adventurers: IAdventurer[] = [
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "E",
        moves: ["A", "A", "D", "A", "A", "A", "G", "A"],
        treasures: 0,
      },
    ];

    const [updatedMountains, updatedTreasures, updatedAdventurers] =
      simulateMovements(map, mountains, treasures, adventurers);

    expect(updatedMountains).toEqual(mountains);
    expect(updatedTreasures).toEqual([{ x: 2, y: 2, count: 0 }]);
    expect(updatedAdventurers).toEqual([
      {
        name: "Jon",
        x: 2,
        y: 2,
        direction: "E",
        moves: ["A", "A", "D", "A", "A", "Ignored", "G", "Ignored"],
        treasures: 1,
      },
    ]);
  });

  test("should stop the adventurer when encountering a mountain", () => {
    const map: IMap = { width: 3, height: 3 };
    const mountains: IMountain[] = [{ x: 2, y: 0 }];
    const treasures: ITreasure[] = [];
    const adventurers: IAdventurer[] = [
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "E",
        moves: ["A", "A"],
        treasures: 0,
      },
    ];

    const [_, __, updatedAdventurers] = simulateMovements(
      map,
      mountains,
      treasures,
      adventurers
    );

    expect(updatedAdventurers).toEqual([
      {
        name: "Jon",
        x: 1,
        y: 0,
        direction: "E",
        moves: ["A", "Ignored"],
        treasures: 0,
      },
    ]);
  });

  test("should ignore moves beyond map boundaries", () => {
    const map: IMap = { width: 3, height: 3 };
    const mountains: IMountain[] = [];
    const treasures: ITreasure[] = [];
    const adventurers: IAdventurer[] = [
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "W",
        moves: ["A"],
        treasures: 0,
      },
    ];

    const [_, __, updatedAdventurers] = simulateMovements(
      map,
      mountains,
      treasures,
      adventurers
    );

    expect(updatedAdventurers).toEqual([
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "W",
        moves: ["Ignored"],
        treasures: 0,
      },
    ]);
  });

  test("should not allow two adventurers to occupy the same space", () => {
    const map: IMap = { width: 3, height: 3 };
    const mountains: IMountain[] = [];
    const treasures: ITreasure[] = [];
    const adventurers: IAdventurer[] = [
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "E",
        moves: ["A"],
        treasures: 0,
      },
      {
        name: "Jane",
        x: 1,
        y: 0,
        direction: "W",
        moves: ["A"],
        treasures: 0,
      },
    ];

    const [_, __, updatedAdventurers] = simulateMovements(
      map,
      mountains,
      treasures,
      adventurers
    );

    expect(updatedAdventurers).toEqual([
      {
        name: "Jon",
        x: 0,
        y: 0,
        direction: "E",
        moves: ["Ignored"],
        treasures: 0,
      },
      {
        name: "Jane",
        x: 1,
        y: 0,
        direction: "W",
        moves: ["Ignored"],
        treasures: 0,
      },
    ]);
  });

  test("should rotate the adventurer correctly", () => {
    const map: IMap = { width: 3, height: 3 };
    const mountains: IMountain[] = [];
    const treasures: ITreasure[] = [];
    const adventurers: IAdventurer[] = [
      {
        name: "Jon",
        x: 1,
        y: 1,
        direction: "N",
        moves: ["D", "D", "G", "G"],
        treasures: 0,
      },
    ];

    const [_, __, updatedAdventurers] = simulateMovements(
      map,
      mountains,
      treasures,
      adventurers
    );

    expect(updatedAdventurers).toEqual([
      {
        name: "Jon",
        x: 1,
        y: 1,
        direction: "N",
        moves: ["D", "D", "G", "G"],
        treasures: 0,
      },
    ]);
  });
});
