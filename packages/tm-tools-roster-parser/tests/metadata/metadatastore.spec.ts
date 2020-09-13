import { expect } from 'chai';

import { getMetadataStore, MetadataStore } from '../../src/metadata/metadatastore';
import { CsvKeyMetaData } from '../../src/metadata/csvkeymetadata';
import { ImportFormatterMetadata } from '../../src/metadata/importformattermetadata';

class TestModel {
  propertyA!: string;
  propertyB!: string;
}

describe('getMetadataStore', () => {
  it('should return an object', () => {
    expect(getMetadataStore()).to.exist;
  })
  
  it('should return a singleton', () => {
    expect(getMetadataStore()).to.equal(getMetadataStore());
  })
});

describe('MetadataStore', () => {
  describe('getCsvKeyMetadata', () => {
    let sut: MetadataStore;
    let metadata: CsvKeyMetaData;

    let testModel = new TestModel();
    const testProperty = 'Property A';
    
    beforeEach(() => {
      sut = new MetadataStore();

      metadata = new CsvKeyMetaData(
        testModel.constructor,
        'propertyA',
        testProperty,
        'String',
        String
      );
    });

    it('should find metadata object', () => {
      sut.addCsvKey(metadata);

      expect(sut.getCsvKeyMetadata(testModel, testProperty)).to.equal(metadata);
    });

    it('should return undefined if no metadata was added', () => {
      expect(sut.getCsvKeyMetadata(testModel, testProperty)).to.not.exist;
    });

    it('should return undefined if unregistered property is requested', () => {
      sut.addCsvKey(metadata);

      expect(sut.getCsvKeyMetadata(testModel, 'Other Property')).to.not.exist;
    });

    it('should return undefined if unregistered model is requested', () => {
      class OtherModel {
        propertyC: string = '';
      };

      sut.addCsvKey(metadata);
      expect(sut.getCsvKeyMetadata(new OtherModel(), testProperty)).to.not.exist;
    });
  });

  describe('getCsvKeyMetadataForObject', () => {
    let sut: MetadataStore;
    let metadata: CsvKeyMetaData;

    let testModel = new TestModel();
    const testProperty = 'Property A';
    
    beforeEach(() => {
      sut = new MetadataStore();

      metadata = new CsvKeyMetaData(
        testModel.constructor,
        'propertyA',
        testProperty,
        'String',
        String
      );
    });

    it('should return a list of all registered objects', () => {
      sut.addCsvKey(metadata);

      expect(sut.getCsvKeyMetadataForObject(testModel)).to.deep.equal([metadata]);
    });

    it('should return an empty list if nothing was registered', () => {
      expect(sut.getCsvKeyMetadataForObject(testModel)).to.deep.equal([]);
    });

    it('should not return metadata from other classes', () => {
      sut.addCsvKey(metadata);
      
      const otherModel = new class OtherModel { propertyB!: string; }
      sut.addCsvKey(new CsvKeyMetaData(otherModel.constructor, 'propertyB', 'Property B', 'String', String));

      expect(sut.getCsvKeyMetadataForObject(testModel)).to.deep.equal([metadata]);
    });

    it('should return an empty list if no metadata for this object exists', () => {
      const otherModel = new class OtherModel { propertyB!: string; }
      sut.addCsvKey(new CsvKeyMetaData(otherModel.constructor, 'propertyB', 'Property B', 'String', String));

      expect(sut.getCsvKeyMetadataForObject(testModel)).to.deep.equal([]);
    });
  });


  describe('getImportFormatterMetadata', () => {
    let sut: MetadataStore;
    let metadata: ImportFormatterMetadata;

    let testModel = new TestModel();
    const testProperty = 'propertyA';
    const testFormatter = (s: string) => s.toUpperCase();
    
    beforeEach(() => {
      sut = new MetadataStore();

      metadata = new ImportFormatterMetadata(
        testModel.constructor,
        testProperty,
        testFormatter
      );
    });

    it('should find metadata object', () => {
      sut.addImportFormatterMetadata(metadata);

      expect(sut.getImportFormatterMetadata(testModel, testProperty)).to.equal(metadata);
    });

    it('should return undefined if no metadata was added', () => {
      expect(sut.getImportFormatterMetadata(testModel, testProperty)).to.not.exist;
    });

    it('should return undefined if unregistered property is requested', () => {
      sut.addImportFormatterMetadata(metadata);

      expect(sut.getImportFormatterMetadata(testModel, 'Other Property')).to.not.exist;
    });

    it('should return undefined if unregistered model is requested', () => {
      class OtherModel {
        propertyC: string = '';
      };

      sut.addImportFormatterMetadata(metadata);
      expect(sut.getImportFormatterMetadata(new OtherModel(), testProperty)).to.not.exist;
    });
  });

  describe('getImportFormatterMetadataForObject', () => {
    let sut: MetadataStore;
    let metadata: ImportFormatterMetadata;

    let testModel = new TestModel();
    const testProperty = 'Property A';
    const testFormatter = (s: string) => s.toUpperCase();
    
    beforeEach(() => {
      sut = new MetadataStore();

      metadata = new ImportFormatterMetadata(
        testModel.constructor,
        'propertyA',
        testFormatter
      );
    });

    it('should return a list of all registered objects', () => {
      sut.addImportFormatterMetadata(metadata);

      expect(sut.getImportFormatterMetadataForObject(testModel)).to.deep.equal([metadata]);
    });

    it('should return an empty list if nothing was registered', () => {
      expect(sut.getImportFormatterMetadataForObject(testModel)).to.deep.equal([]);
    });

    it('should not return metadata from other classes', () => {
      sut.addImportFormatterMetadata(metadata);
      
      const otherModel = new class OtherModel { propertyB!: string; }
      sut.addImportFormatterMetadata(
        new ImportFormatterMetadata(otherModel.constructor, 'propertyB', testFormatter)
      );

      expect(sut.getImportFormatterMetadataForObject(testModel)).to.deep.equal([metadata]);
    });

    it('should return an empty list if no metadata for this object exists', () => {
      const otherModel = new class OtherModel { propertyB!: string; }
      sut.addImportFormatterMetadata(
        new ImportFormatterMetadata(otherModel.constructor, 'propertyB', testFormatter)
      );

      expect(sut.getImportFormatterMetadataForObject(testModel)).to.deep.equal([]);
    });
  });
});