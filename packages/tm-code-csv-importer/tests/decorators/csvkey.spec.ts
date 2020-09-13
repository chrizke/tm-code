import { expect } from 'chai';

import { CsvKey, CsvKeyOptions } from '../../src/decorators/csvkey';
import { MetadataStore } from '../../src/metadata/metadatastore';

import "reflect-metadata";
import { CsvKeyMetaData } from '../../src/metadata';

describe('CsvKey decorator', () => {
  let options: CsvKeyOptions;


  beforeEach(() => {
    options = new CsvKeyOptions();
    options.metadataStore = new MetadataStore();
  });

  it('should register a new csvkey', () => {
    class TestModel {
      @CsvKey('Property A', options)
      propertyA!: string;
    };

    expect(options.metadataStore.getCsvKeyMetadata(new TestModel(), 'Property A')).to.exist;
  });

  it('should throw if two CSV keys are registered for one property', () => {
    expect(() => {
      class TestModel {
        @CsvKey('Property A', options)
        @CsvKey('Property B', options)
        propertyA!: string;
      };
    }).to.throw();
  });

  it('should throw if a CSV key is registered twice', () => {
    const sameCsvKey = 'Property A';
    expect(() => {
      class TestModel {
        @CsvKey(sameCsvKey, options)
        propertyA!: string;
        
        @CsvKey(sameCsvKey, options)
        propertyB!: string;
      };
    }).to.throw();
  });

  it('should register metadata correctly', () => {
    class TestModel {
      @CsvKey('Property A', options)
      propertyA!: string;
    }

    const testModel = new TestModel();

    const metadata = options.metadataStore.getCsvKeyMetadata(testModel, 'Property A');
    expect(metadata).to.deep.equal(new CsvKeyMetaData(testModel.constructor, 'propertyA', 'Property A', 'String', String));
  })
});