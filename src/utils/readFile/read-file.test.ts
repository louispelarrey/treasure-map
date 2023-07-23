import { readFile } from "./read-file";
import { describe, expect, test } from "@jest/globals";

class MockFile {
  content: string[];
  name: string;
  options: { type: string };

  constructor(content: string[], name: string, options: { type: string }) {
    this.content = content;
    this.name = name;
    this.options = options;
  }
}

global.File = MockFile as any;

// Mock the FileReader API since we cannot access it directly in the test environment
class MockFileReader {
  result: string | null = null;
  error: Error | null = null;
  onload: any = null;
  onerror: any = null;

  readAsText(file: File) {
    // If the file's name is "emptyFile.txt", return an empty string
    // Otherwise return a valid map
    this.result =
      file.name === "emptyFile.txt"
        ? ""
        : "C - 5 - 5\nM - 1 - 1\nT - 2 - 2 - 5\nA - Jon - 3 - 3 - N - AADA";
    this.onload({ target: this });
  }
}

// Replace the global FileReader with our mock class
Object.defineProperty(global, "FileReader", {
  value: MockFileReader,
  writable: true,
});

describe("readFile", () => {
  test("should parse file content correctly", async () => {
    const mockFile: File = new File(["dummy content"], "testFile.txt", {
      type: "text/plain",
    });

    const [map, mountains, treasures, adventurers] = await readFile(mockFile);

    expect(map).toEqual({ width: 5, height: 5 });
    expect(mountains).toEqual([{ x: 1, y: 1 }]);
    expect(treasures).toEqual([{ x: 2, y: 2, count: 5 }]);
    expect(adventurers).toEqual([
      {
        name: "Jon",
        x: 3,
        y: 3,
        direction: "N",
        moves: ["A", "A", "D", "A"],
        treasures: 0,
      },
    ]);
  });

  test("should reject with an error if no map found", async () => {
    // Prepare a mock File object without a map entry
    const mockFile: File = new File([""], "emptyFile.txt", {
      type: "text/plain",
    });

    await expect(readFile(mockFile)).rejects.toThrowError(
      "No map found in the input file."
    );
  });

  test("should handle comments and empty lines correctly", async () => {
    const mockFile: File = new File(
      ["# This is a comment", "\n"],
      "testFile.txt",
      {
        type: "text/plain",
      }
    );

    const [map, mountains, treasures, adventurers] = await readFile(mockFile);

    expect(map).toEqual({ width: 5, height: 5 });
    expect(mountains).toEqual([{ x: 1, y: 1 }]);
    expect(treasures).toEqual([{ x: 2, y: 2, count: 5 }]);
    expect(adventurers).toEqual([
      {
        name: "Jon",
        x: 3,
        y: 3,
        direction: "N",
        moves: ["A", "A", "D", "A"],
        treasures: 0,
      },
    ]);
  });
});
