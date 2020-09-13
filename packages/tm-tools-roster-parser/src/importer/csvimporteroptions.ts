/**
 * Configuration options for CsvParser
 */
export class CsvImporterOptions {

  /**
   * Text encoding of file
   */
  encoding: "utf-8" = "utf-8";

  /**
   * CSV delimiter
   */
  delimiter: string = ',';

  /**
   * Defines how many lines are considered offset 
   * before actual csv part begins
   */
  lineOffset: 0 | 1 = 1;
};