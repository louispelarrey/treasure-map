import { ChangeEvent, useCallback, useState } from "react";
import { MapSimulatorComponent } from "../components/map-simulator.component";
import { readFile, simulateMovements, writeOutputFile } from "../utils";

export const MapSimulatorContainer = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>("");

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      setInputFile(event.target.files[0]);
    },
    []
  );

  const handleOutputFileNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setOutputFileName(event.target.value);
    },
    []
  );

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
