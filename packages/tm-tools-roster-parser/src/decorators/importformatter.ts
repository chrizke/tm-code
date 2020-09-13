import { getMetadataStore, ImportFormatterMetadata } from '../metadata';
import 'reflect-metadata';


export class ImportFormatterOptions {
  metadataStore = getMetadataStore()
}

export function ImportFormatter(
  formatter: (originalValue: string) => any,
  options = new ImportFormatterOptions()
) {
  return function (target: Object, propertyName: string) {
    if (options.metadataStore.getImportFormatterMetadata(target, propertyName)) {
      throw new Error('ImportFormatter must not be registered more than once!');
    }

    options.metadataStore.addImportFormatterMetadata(new ImportFormatterMetadata(target.constructor, propertyName, formatter));
  }
}