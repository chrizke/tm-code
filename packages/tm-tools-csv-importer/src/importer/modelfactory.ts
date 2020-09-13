import { getMetadataStore, IMetadataStore, CsvKeyMetaData, ImportFormatterMetadata } from '../metadata';

import { MembershipCsvModel, ClubOfficersCsvModel, DistrictCouncilCsvModel } from '../model';

declare type CsvObjType = { [id: string]: string };

export interface IModelFactory<T> {
  createFromObject(csvObj: CsvObjType): T;
}

export class ModelFactory<T> implements IModelFactory<T> {
  constructor(
    private readonly metadataStore: IMetadataStore,
    private readonly modelConstructor: new (...args: any[]) => T
  ) {}


  createFromObject(csvObj: CsvObjType): T {
    const newModelObject = new this.modelConstructor();

    Object.keys(csvObj).forEach(key => {
      if (!csvObj.hasOwnProperty(key)) return; // Return means: Continue with loop here

      const keyMetaData = this.metadataStore.getCsvKeyMetadata(newModelObject, key);
      if (!keyMetaData) return; // Maybe also log here

      const importFormatter = this.metadataStore.getImportFormatterMetadata(newModelObject, keyMetaData.propertyName);
      this.setPropertyValue(newModelObject, csvObj, keyMetaData, importFormatter);
    });

    return newModelObject;
  }


  private convertToBoolean(value: string): boolean {
    return value === '0' || value.toLowerCase() === 'false' ? false : true;
  }


  private setPropertyValue(
    newModelObject: T, 
    csvObj: CsvObjType, 
    keyMetaData: CsvKeyMetaData, 
    importFormatter: ImportFormatterMetadata | undefined
  ): void {
    const setProperty = (value: any) => newModelObject[keyMetaData.propertyName] = value;

    const csvValue = csvObj[keyMetaData.csvKey];

    if (importFormatter) {
      setProperty(importFormatter.importFormatter(csvValue));
    } else if (keyMetaData.propertyTypeName === 'Boolean') {
      setProperty(this.convertToBoolean(csvValue));
    } else if (['String', 'Number'].includes(keyMetaData.propertyTypeName)) {
      setProperty(keyMetaData.targetPropertyConstructor(csvValue));
    } else {
      const targetConstructor = keyMetaData.targetPropertyConstructor as new (...args: any[]) => T;
      setProperty(new targetConstructor(csvValue));
    }
  }
}

function modelFactory<T>(modelConstructor: new (...args: any[]) => T): IModelFactory<T> {
  return new ModelFactory<T>(getMetadataStore(), modelConstructor);
}


/**
 * Creates a model factory for membership files
 */
export function MembershipModelFactory(): IModelFactory<MembershipCsvModel> {
  return modelFactory(MembershipCsvModel);
}


/**
 * Creates a model factory for Club Officer files
 */
export function ClubOfficerModelFactory(): IModelFactory<ClubOfficersCsvModel> {
  return modelFactory(ClubOfficersCsvModel);
}


/**
 * Creates a model factory for District Council files
 */
export function DistrictCouncilModelFactory(): IModelFactory<DistrictCouncilCsvModel> {
  return modelFactory(DistrictCouncilCsvModel);
}