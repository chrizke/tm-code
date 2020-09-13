import { getMetadataStore, CsvKeyMetaData } from '../metadata';

export class CsvKeyOptions {
  metadataStore = getMetadataStore();
}

export function CsvKey(
  csvKey: string,
  options = new CsvKeyOptions()
) {
  return function (target: Object, propertyName: string) {
    const allMetadata = options.metadataStore.getCsvKeyMetadataForObject(target);
    
    if (allMetadata.find(m => m.propertyName === propertyName)) {
      throw new Error('A property can only have one CsvKey.');
    }

    if (allMetadata.find(m => m.csvKey === csvKey)) {
      throw new Error('A CSV key can only be used once.');
    }

    options.metadataStore.addCsvKey(CsvKeyMetaData.create(target, propertyName, csvKey));
  }
}