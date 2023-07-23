import { readFile, simulateMovements, writeOutputFile } from "../utils";
import { render, fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { MapSimulatorContainer } from "./map-simulator.container";
import { IMap, IMountain, ITreasure, IAdventurer } from "../types";

jest.mock("../utils", () => ({
  readFile: jest.fn(),
  simulateMovements: jest.fn(),
  writeOutputFile: jest.fn(),
}));

type MockedUtils = {
  readFile: jest.MockedFunction<typeof readFile>;
  simulateMovements: jest.MockedFunction<typeof simulateMovements>;
  writeOutputFile: jest.MockedFunction<typeof writeOutputFile>;
};

// Define expected data for the map, mountains, treasures, and adventurers
const expectedMap: IMap = { width: 3, height: 4 };
const expectedMountains: IMountain[] = [
  { x: 1, y: 0 },
  { x: 2, y: 1 },
];
const expectedTreasures: ITreasure[] = [
  { x: 0, y: 3, count: 2 },
  { x: 1, y: 3, count: 3 },
];
const expectedAdventurers: IAdventurer[] = [
  {
    name: "Lara",
    x: 1,
    y: 1,
    direction: "S",
    moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
    treasures: 0,
  },
];

// Define expected data for the simulation results
const expectedUpdatedMountains: IMountain[] = [
  { x: 1, y: 0 },
  { x: 2, y: 1 },
];
const expectedUpdatedTreasures: ITreasure[] = [
  { x: 0, y: 3, count: 2 },
  { x: 1, y: 3, count: 1 },
];
const expectedUpdatedAdventurers: IAdventurer[] = [
  {
    name: "Lara",
    x: 0,
    y: 3,
    direction: "S",
    moves: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
    treasures: 3,
  },
];

describe("MapSimulatorContainer", () => {
  let utils: MockedUtils;

  beforeEach(() => {
    utils = require("../utils");
  });

  it("should handle file change", () => {
    const { getByLabelText } = render(<MapSimulatorContainer />);
    const fileInput = getByLabelText(/Fichier d'entrée/) as HTMLInputElement; // Cast to HTMLInputElement

    fireEvent.change(fileInput, {
      target: {
        files: [new File([""], "filename.txt", { type: "text/plain" })],
      },
    });

    expect(fileInput.files?.[0]?.name).toEqual("filename.txt"); // Check the file name
  });

  it("should handle output file name change", () => {
    const { getByLabelText } = render(<MapSimulatorContainer />);
    const outputFileNameInput = getByLabelText(
      /Nom du fichier en sortie/
    ) as HTMLInputElement; // Cast to HTMLInputElement

    fireEvent.change(outputFileNameInput, {
      target: { value: "newOutput" },
    });

    expect(outputFileNameInput.value).toEqual("newOutput"); // Check the input value
  });

  it("should run the simulation when button is clicked", async () => {
    utils.readFile.mockResolvedValue([
      expectedMap,
      expectedMountains,
      expectedTreasures,
      expectedAdventurers,
    ]);
    utils.simulateMovements.mockReturnValue([
      expectedUpdatedMountains,
      expectedUpdatedTreasures,
      expectedUpdatedAdventurers,
    ]);

    const { getByText, getByLabelText } = render(<MapSimulatorContainer />);

    // Set up a valid state
    fireEvent.change(getByLabelText(/Fichier d'entrée/), {
      target: {
        files: [new File([""], "filename.txt", { type: "text/plain" })],
      },
    });
    fireEvent.change(getByLabelText(/Nom du fichier en sortie/), {
      target: { value: "output" },
    });

    // Click the button to run the simulation
    fireEvent.click(getByText(/Lancer la simulation/));

    // Check that the utils were called
    await waitFor(() => {
      expect(utils.readFile).toHaveBeenCalled();
      expect(utils.simulateMovements).toHaveBeenCalled();
      expect(utils.writeOutputFile).toHaveBeenCalled();
    });
  });
});
