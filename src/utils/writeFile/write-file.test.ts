import { IMap, IMountain, ITreasure, IAdventurer } from "../../types";
import { writeOutputFile } from "./write-file";

describe("writeOutputFile", () => {
  const map: IMap = { width: 3, height: 3 };
  const mountains: IMountain[] = [{ x: 1, y: 1 }];
  const treasures: ITreasure[] = [{ x: 2, y: 2, count: 2 }];
  const adventurers: IAdventurer[] = [
    {
      name: "Jon",
      x: 0,
      y: 0,
      direction: "E",
      moves: ["A"],
      treasures: 0,
    },
  ];

  it("should write to a file with the correct format", () => {
    const fileName = "test.txt";

    const mockLink = {
      download: "",
      href: "",
      click: jest.fn(),
    };

    document.createElement = jest.fn(() => mockLink as any);
    URL.createObjectURL = jest.fn();

    writeOutputFile(fileName, map, mountains, treasures, adventurers);

    expect(mockLink.download).toBe(fileName);
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(mockLink.click).toHaveBeenCalled();
  });
});
