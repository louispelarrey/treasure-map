import { render, fireEvent, screen } from "@testing-library/react";
import { MapSimulatorComponent } from "./map-simulator.component";
import '@testing-library/jest-dom';

describe("MapSimulatorComponent", () => {
  let handleFileChange: jest.Mock;
  let handleOutputFileNameChange: jest.Mock;
  let handleRun: jest.Mock;

  beforeEach(() => {
    handleFileChange = jest.fn();
    handleOutputFileNameChange = jest.fn();
    handleRun = jest.fn();
  });

  it("should handle file change", () => {
    render(
      <MapSimulatorComponent
        handleFileChange={handleFileChange}
        handleOutputFileNameChange={handleOutputFileNameChange}
        handleRun={handleRun}
        inputFile={null}
        outputFileName="output"
      />
    );

    fireEvent.change(screen.getByLabelText(/Fichier d'entrée/), { target: { files: ['file.jpg'] } });
    expect(handleFileChange).toHaveBeenCalled();
  });

  it("should handle output file name change", () => {
    render(
      <MapSimulatorComponent
        handleFileChange={handleFileChange}
        handleOutputFileNameChange={handleOutputFileNameChange}
        handleRun={handleRun}
        inputFile={new File([''], 'filename.txt', { type: 'text/plain' })}
        outputFileName="output"
      />
    );

    fireEvent.change(screen.getByLabelText(/Nom du fichier en sortie/), { target: { value: 'newOutput' } });
    expect(handleOutputFileNameChange).toHaveBeenCalled();
  });

  it("should run the simulation when button is clicked", () => {
    render(
      <MapSimulatorComponent
        handleFileChange={handleFileChange}
        handleOutputFileNameChange={handleOutputFileNameChange}
        handleRun={handleRun}
        inputFile={new File([''], 'filename.txt', { type: 'text/plain' })}
        outputFileName="output"
      />
    );

    fireEvent.click(screen.getByText(/Lancer la simulation/));
    expect(handleRun).toHaveBeenCalled();
  });

  it("should disable the run button if inputFile is null or outputFileName is empty", () => {
    const { rerender } = render(
      <MapSimulatorComponent
        handleFileChange={handleFileChange}
        handleOutputFileNameChange={handleOutputFileNameChange}
        handleRun={handleRun}
        inputFile={null}
        outputFileName="output"
      />
    );

    expect(screen.getByText(/Lancer la simulation/)).toBeDisabled();

    rerender(
      <MapSimulatorComponent
        handleFileChange={handleFileChange}
        handleOutputFileNameChange={handleOutputFileNameChange}
        handleRun={handleRun}
        inputFile={new File([''], 'filename.txt', { type: 'text/plain' })}
        outputFileName=""
      />
    );

    expect(screen.getByText(/Lancer la simulation/)).toBeDisabled();
  });
});
