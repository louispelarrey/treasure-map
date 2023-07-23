import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";

export const writeOutputFile = (
  fileName: string,
  map: IMap,
  mountains: IMountain[],
  treasures: ITreasure[],
  adventurers: IAdventurer[]
): void => {
  let fileContent = `C - ${map.width} - ${map.height}\n`;
  
  mountains.forEach((mountain) => {
    fileContent += `M - ${mountain.x} - ${mountain.y}\n`;
  });
  
  treasures.forEach((treasure) => {
    if (treasure.count > 0) {
      fileContent += `T - ${treasure.x} - ${treasure.y} - ${treasure.count}\n`;
    }
  });
  
  adventurers.forEach((adventurer) => {
    fileContent += `A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.direction} - ${adventurer.treasures}\n`;
  });

  const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};
