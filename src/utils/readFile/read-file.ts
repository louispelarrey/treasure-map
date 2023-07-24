import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";

/**
 * Read and parse the content of a file.
 *
 * @param {File} file - The file to read and parse.
 * @returns {Promise<[IMap, IMountain[], ITreasure[], IAdventurer[]]>} A Promise that resolves with an array containing the parsed data: map, mountains, treasures, and adventurers.
 * @throws {Error} If the file content is not a string or if the input file contains an invalid line.
 */
export const readFile = (
  file: File
): Promise<[IMap, IMountain[], ITreasure[], IAdventurer[]]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result;

      if (typeof fileContent !== "string") {
        return reject(new Error("File content must be a string."));
      }

      let map: IMap | undefined;
      const mountains: IMountain[] = [];
      const treasures: ITreasure[] = [];
      const adventurers: IAdventurer[] = [];

      const lines = fileContent.split("\n");

      for (const line of lines) {
        if (line.startsWith("#") || line.trim() === "") continue;

        const parts = line.split(" - ");

        switch (parts[0]) {
          case "C":
            map = {
              width: parseInt(parts[1]),
              height: parseInt(parts[2]),
            };
            break;
          case "M":
            mountains.push({
              x: parseInt(parts[1]),
              y: parseInt(parts[2]),
            });
            break;
          case "T":
            treasures.push({
              x: parseInt(parts[1]),
              y: parseInt(parts[2]),
              count: parseInt(parts[3]),
            });
            break;
          case "A":
            adventurers.push({
              name: parts[1],
              x: parseInt(parts[2]),
              y: parseInt(parts[3]),
              direction: parts[4],
              moves: parts[5].split(""),
              treasures: 0,
            });
            break;
          default:
            return reject(new Error("Invalid line in input file."));
        }
      }

      if (!map) return reject(new Error("No map found in the input file."));

      return resolve([map, mountains, treasures, adventurers]);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
};
