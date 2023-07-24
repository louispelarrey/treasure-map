import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";

/**
 * Simulate movements of adventurers on the map, considering mountains, treasures, and collisions.
 *
 * @param {IMap} map - The map object containing width and height information.
 * @param {IMountain[]} mountains - An array of mountain objects, each with x and y coordinates.
 * @param {ITreasure[]} treasures - An array of treasure objects, each with x, y coordinates, and a count of treasures.
 * @param {IAdventurer[]} adventurers - An array of adventurer objects, each with name, x and y coordinates, direction, moves, and treasures count.
 * @returns {[IMountain[], ITreasure[], IAdventurer[]]} An array containing the updated mountains, treasures, and adventurers after the movements simulation.
 */
export const simulateMovements = (
  map: IMap,
  mountains: IMountain[],
  treasures: ITreasure[],
  adventurers: IAdventurer[]
): [IMountain[], ITreasure[], IAdventurer[]] => {
  // Helper function to check if a position is occupied by a mountain
  const isOccupiedByMountain = (x: number, y: number) =>
    mountains.some((mountain) => mountain.x === x && mountain.y === y);

  // Helper function to check if a position is occupied by an adventurer
  const isOccupiedByAdventurer = (x: number, y: number) =>
    adventurers.some((adventurer) => adventurer.x === x && adventurer.y === y);

  // Helper function to rotate the direction of an adventurer
  const rotate = (direction: string, rotation: string) => {
    const directions = ["N", "E", "S", "W"];
    const newDirectionIndex =
      (directions.indexOf(direction) +
        (rotation === "D" ? 1 : -1) +
        directions.length) %
      directions.length;

    return directions[newDirectionIndex];
  };

  // Helper function to move an adventurer to a new position
  const move = (adventurer: IAdventurer, newX: number, newY: number) => {
    if (
      newX < 0 ||
      newY < 0 ||
      newX >= map.width ||
      newY >= map.height ||
      isOccupiedByMountain(newX, newY)
    ) {
      return false;
    }
    adventurer.x = newX;
    adventurer.y = newY;
    return true;
  };

  // Helper function to let an adventurer pick up a treasure if available at their position
  const pickTreasure = (adventurer: IAdventurer) => {
    const treasure = treasures.find(
      (treasure) => treasure.x === adventurer.x && treasure.y === adventurer.y
    );

    if (treasure && treasure.count > 0) {
      treasure.count -= 1;
      adventurer.treasures += 1;
    }
  };

  // Main movement simulation loop
  for (
    let i = 0;
    i < Math.max(...adventurers.map((adventurer) => adventurer.moves.length));
    i++
  ) {
    const newPositions: { adventurer: IAdventurer; x: number; y: number }[] = [];

    adventurers.forEach((adventurer) => {
      const moveType = adventurer.moves[i];

      if (moveType === undefined) {
        return;
      }

      switch (moveType) {
        case "A":
          let newX = adventurer.x;
          let newY = adventurer.y;

          switch (adventurer.direction) {
            case "N":
              newY -= 1;
              break;
            case "E":
              newX += 1;
              break;
            case "S":
              newY += 1;
              break;
            case "W":
              newX -= 1;
              break;
          }

          newPositions.push({ adventurer, x: newX, y: newY });
          break;

        case "D":
        case "G":
          adventurer.direction = rotate(adventurer.direction, moveType);
          break;
      }
    });

    // Handle collisions and update positions
    newPositions.forEach(({ adventurer, x, y }) => {
      if (
        !newPositions.some(
          (pos) => pos.adventurer !== adventurer && pos.x === x && pos.y === y
        ) &&
        !isOccupiedByAdventurer(x, y) &&
        move(adventurer, x, y)
      ) {
        pickTreasure(adventurer);
      } else {
        const moveIndex = adventurer.moves.indexOf("A", i);
        if (moveIndex !== -1) {
          adventurer.moves[moveIndex] = "Ignored";
        }
      }
    });
  }

  return [mountains, treasures, adventurers];
};
