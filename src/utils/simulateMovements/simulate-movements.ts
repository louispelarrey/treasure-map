import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";

export const simulateMovements = (
  map: IMap,
  mountains: IMountain[],
  treasures: ITreasure[],
  adventurers: IAdventurer[]
): [IMountain[], ITreasure[], IAdventurer[]] => {
  const isOccupiedByMountain = (x: number, y: number) =>
    mountains.some((mountain) => mountain.x === x && mountain.y === y);

  const isOccupiedByAdventurer = (x: number, y: number) =>
    adventurers.some((adventurer) => adventurer.x === x && adventurer.y === y);

  const rotate = (direction: string, rotation: string) => {
    const directions = ["N", "E", "S", "W"];
    const newDirectionIndex =
      (directions.indexOf(direction) +
        (rotation === "D" ? 1 : -1) +
        directions.length) %
      directions.length;

    return directions[newDirectionIndex];
  };

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

  const pickTreasure = (adventurer: IAdventurer) => {
    const treasure = treasures.find(
      (treasure) => treasure.x === adventurer.x && treasure.y === adventurer.y
    );

    if (treasure && treasure.count > 0) {
      treasure.count -= 1;
      adventurer.treasures += 1;
    }
  };

  for (
    let i = 0;
    i < Math.max(...adventurers.map((adventurer) => adventurer.moves.length));
    i++
  ) {
    const newPositions: { adventurer: IAdventurer; x: number; y: number }[] =
      [];

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
