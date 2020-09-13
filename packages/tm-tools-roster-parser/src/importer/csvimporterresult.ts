/**
 * Result object of CsvParser parsing functionality.
 */
export class CsvImporterResult<T> {
  /**
   * List of entries from CSV file.
   */
  entries: T[] = [];

  /**
   * File creation date possibly defined in 1st line.
   */
  fileCreationDate?: Date;
}