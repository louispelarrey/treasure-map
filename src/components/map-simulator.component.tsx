import { FC } from "react";

interface MapSimulatorComponentProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOutputFileNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRun: () => void;
  inputFile: File | null;
  outputFileName: string;
}

export const MapSimulatorComponent : FC<MapSimulatorComponentProps> = ({
  handleFileChange,
  handleOutputFileNameChange,
  handleRun,
  inputFile,
  outputFileName,
}) => {
  return (
    <div className="app">
      <h1>Simulation de la chasse au trésor</h1>
      <label className="label-wrapper">
        Fichier d'entrée :
        <input type="file" onChange={handleFileChange} />
      </label>
      <label className="label-wrapper">
        Nom du fichier en sortie:
        <input
          type="text"
          value={outputFileName}
          onChange={handleOutputFileNameChange}
        />
      </label>
      <button onClick={handleRun} disabled={!inputFile || !outputFileName}>
        Lancer la simulation
      </button>
    </div>
  );
};
