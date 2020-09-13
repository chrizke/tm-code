import "reflect-metadata";

/**
 * Meta data for CsvKey to property mappings
 */
export class CsvKeyMetaData {
  /**
   * 
   * @param targetModelConstructor Constructor of target type
   * @param propertyName Name of target property
   * @param csvKey Key in CSV file
   * @param propertyTypeName Name of the target type
   * @param targetPropertyConstructor Constructor of the target property type
   */
  constructor(
    readonly targetModelConstructor: Function,
    readonly propertyName: string,
    readonly csvKey: string,
    readonly propertyTypeName: string,
    readonly targetPropertyConstructor: Function,
  ) { }

  static create<T extends Object>(target: T, propertyName: string, csvKey: string): CsvKeyMetaData {
    const propertyType = Reflect.getMetadata("design:type", target, propertyName);

    return new CsvKeyMetaData(
      target.constructor,
      propertyName,
      csvKey,
      propertyType.name,
      propertyType
    )
  }
}

