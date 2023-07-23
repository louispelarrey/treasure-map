import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";

/**
 * Write the output data to a file and trigger a download of the file in the browser.
 *
 * @param {string} fileName - The name of the output file to be downloaded.
 * @param {IMap} map - The map object containing width and height information.
 * @param {IMountain[]} mountains - An array of mountain objects, each with x and y coordinates.
 * @param {ITreasure[]} treasures - An array of treasure objects, each with x, y coordinates, and a count of treasures.
 * @param {IAdventurer[]} adventurers - An array of adventurer objects, each with name, x and y coordinates, direction, and treasures count.
 */
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

  // Create a Blob with the file content
  const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;

  // Trigger the download
  link.click();
};
