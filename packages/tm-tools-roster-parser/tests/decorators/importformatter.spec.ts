import { expect } from 'chai';

import { ImportFormatter, ImportFormatterOptions } from '../../src/decorators/importformatter';
import { MetadataStore } from '../../src/metadata/metadatastore';

describe('ImportFormatter decorator', () => {
  let options: ImportFormatterOptions;
  const testFormatter = (s: string) => s.toUpperCase();

  beforeEach(() => {
    options = new ImportFormatterOptions();
    options.metadataStore = new MetadataStore();
  });

  it('should register a new formatter', () => {
    class TestModel {
      @ImportFormatter(testFormatter, options)
      propertyA!: string;
    };

    expect(options.metadataStore.getImportFormatterMetadata(new TestModel(), 'propertyA')).to.exist;
  });

  it('should register the correct formatter', () => {
    class TestModel {
      @ImportFormatter(testFormatter, options)
      propertyA!: string;
    };

    const sut = options.metadataStore.getImportFormatterMetadata(new TestModel(), 'propertyA');

    // Would've used optional chaining ?. here but mocha didn't compile this
    expect(sut && sut.importFormatter).to.equal(testFormatter);
  });

  it('should register correct formatter when called manually', () => {
    const testModel = new class TestModel {
      propertyA!: string;
    }();
    
    const sut = ImportFormatter(testFormatter, options);

    sut(testModel, 'propertyA');
    
    const abc = options.metadataStore.getImportFormatterMetadata(testModel, 'propertyA');
    expect(abc && abc.importFormatter).to.equal(testFormatter);
  });


  it('should throw if it is being called twice on the same attribute', () => {
    const testModel = new class TestModel {
      propertyA!: string;
    }();

    const sut = ImportFormatter(testFormatter, options);
    sut(testModel, 'propertyA');
    
    expect(() => sut(testModel, 'propertyA')).to.throw();
  });
});