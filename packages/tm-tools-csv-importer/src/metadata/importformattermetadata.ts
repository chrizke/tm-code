/**
 * Meta data for ImportFormatter to property mappings
 */
export class ImportFormatterMetadata {
  /**
   * 
   * @param targetModelConstructor Constructor of target type
   * @param propertyName Name of target property
   * @param importFormatter Import Formatter to be stored 
   */
  constructor(
    readonly targetModelConstructor: Function,    
    readonly propertyName: string,
    readonly importFormatter: (value: string) => any
) { }
}