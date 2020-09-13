import { CsvKeyMetaData } from './csvkeymetadata';
import { ImportFormatterMetadata } from './importformattermetadata';

export interface IMetadataStore {

  /**
   * Add a new CsvKeyMetaData object to the store.
   * @param csvKeyMetadata Object to add
   */
  addCsvKey(csvKeyMetadata: CsvKeyMetaData): void;


  /**
   * Retrieve CsvKeyMetaData object from store. 
   * @param target Target model constructor 
   * @param csvKey Key from CSV files.
   */
  getCsvKeyMetadata<T extends Object>(target: T, csvKey: string): CsvKeyMetaData | undefined;


  /**
   * Returns all CsvKeyMetaData objects for the specified target.
   * @param target Target model constructor
   */
  getCsvKeyMetadataForObject<T extends Object>(target: T): CsvKeyMetaData[];


  /**
   * Add metadata for another import formatter.
   * @param importFormatterMetadata 
   */
  addImportFormatterMetadata(importFormatterMetadata: ImportFormatterMetadata): void;


  /**
   * Retrieve the corresponding import formatter metadata for a property.
   * @param target Target model constructor
   * @param propertyName Name of the addressed property
   */
  getImportFormatterMetadata<T extends Object>(target: T, propertyName: string): ImportFormatterMetadata | undefined;


  /**
   * Returns all ImportFormatterMetadata objects for the specified target.
   * @param target Target model constructor
   */
  getImportFormatterMetadataForObject<T extends Object>(target: T): ImportFormatterMetadata[];
}

export class MetadataStore implements IMetadataStore {
  private csvKeys: CsvKeyMetaData[] = [];
  private importFormatters: ImportFormatterMetadata[] = [];

  addCsvKey(csvKeyMetadata: CsvKeyMetaData) {
    this.csvKeys.push(csvKeyMetadata);
  }

  getCsvKeyMetadata<T extends Object>(target: T, csvKey: string) {
    return this.csvKeys.find(k => k.targetModelConstructor === target.constructor && k.csvKey === csvKey);
  }

  getCsvKeyMetadataForObject<T extends Object>(target: T): CsvKeyMetaData[] {
    return this.csvKeys.filter(metadata => metadata.targetModelConstructor === target.constructor );
  }

  addImportFormatterMetadata(importFormatterMetadata: ImportFormatterMetadata) {
    this.importFormatters.push(importFormatterMetadata);
  }

  getImportFormatterMetadata<T extends Object>(target: T, propertyName: string) {
    return this.importFormatters.find(m => m.targetModelConstructor === target.constructor && m.propertyName === propertyName);
  }

  getImportFormatterMetadataForObject<T extends Object>(target: T): ImportFormatterMetadata[] {
    return this.importFormatters.filter(metadata => metadata.targetModelConstructor === target.constructor);
  }
}

// Unique symbol for globalThis registration
const META_DATA_STORE = Symbol('MetadataStore');


/**
 * Returns a singleton IMetadataStore object
 */
export function getMetadataStore(): IMetadataStore {
  if (!globalThis[META_DATA_STORE]) {
    globalThis[META_DATA_STORE] = new MetadataStore();
  }

  return globalThis[META_DATA_STORE];
}