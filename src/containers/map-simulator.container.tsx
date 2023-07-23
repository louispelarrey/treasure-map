import { ChangeEvent, useCallback, useState } from "react";
import { MapSimulatorComponent } from "../components/map-simulator.component";
import { readFile, simulateMovements, writeOutputFile } from "../utils";

/**
 * Container component for the Map Simulator functionality.
 *
 * This component manages the state for the input file, output file name, and handles the simulation run.
 * It renders the `MapSimulatorComponent` with the necessary props.
 *
 * @returns {JSX.Element} The JSX representation of the MapSimulatorContainer component.
 */
export const MapSimulatorContainer = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>("");

  /**
   * Handle the change event when a new input file is selected.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event containing the selected file.
   */
  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      setInputFile(event.target.files[0]);
    },
    []
  );

  /**
   * Handle the change event when the output file name is entered or changed.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event containing the new output file name.
   */
  const handleOutputFileNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setOutputFileName(event.target.value);
    },
    []
  );

  /**
   * Handle the simulation run when the "Run" button is clicked.
   *
   * This function reads the input file, simulates the movements, and writes the output file.
   * It uses the `readFile` and `writeOutputFile` functions from the utils module, and the `simulateMovements` function from the same module.
   */
  const handleRun = useCallback(async () => {
    if (!inputFile || !outputFileName) return;
    const [map, mountains, treasures, adventurers] = await readFile(inputFile);
    const [updatedMountains, updatedTreasures, updatedAdventurers] =
      simulateMovements(map, mountains, treasures, adventurers);
    writeOutputFile(
      outputFileName,
      map,
      updatedMountains,
      updatedTreasures,
      updatedAdventurers
    );
  }, [inputFile, outputFileName]);

  return (
    <MapSimulatorComponent
      handleFileChange={handleFileChange}
      handleOutputFileNameChange={handleOutputFileNameChange}
      handleRun={handleRun}
      inputFile={inputFile}
      outputFileName={outputFileName}
    />
  );
};
