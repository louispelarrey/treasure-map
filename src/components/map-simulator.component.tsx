import { FC } from "react";

/**
 * Props interface for the MapSimulatorComponent.
 */
interface MapSimulatorComponentProps {
  /**
   * Event handler for the change event when a new input file is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event containing the selected file.
   */
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Event handler for the change event when the output file name is entered or changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event containing the new output file name.
   */
  handleOutputFileNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Event handler for the simulation run when the "Run" button is clicked.
   */
  handleRun: () => void;

  /**
   * The selected input file for the simulation.
   */
  inputFile: File | null;

  /**
   * The output file name entered by the user.
   */
  outputFileName: string;
}

/**
 * The Map Simulator component for displaying the input fields and run button.
 *
 * @param {MapSimulatorComponentProps} props - The component props containing event handlers and state.
 * @returns {JSX.Element} The JSX representation of the MapSimulatorComponent.
 */
export const MapSimulatorComponent: FC<MapSimulatorComponentProps> = ({
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
