import { expect } from 'chai';

import { ModelFactory } from '../../src/parser/modelfactory';
import { MetadataStore } from '../../src/metadata/metadatastore';
import { CsvKey, CsvKeyOptions, ImportFormatterOptions, ImportFormatter } from '../../src/decorators';

class TestObjType {
  constructor(
    readonly value: string
  ) {}
}

describe('ModelFactory', () => {
  let metadataStore: MetadataStore;
  let csvKeyOptions: CsvKeyOptions;
  let importFormatterOptions: ImportFormatterOptions;

  beforeEach(() => {
    metadataStore = new MetadataStore();
    csvKeyOptions = { metadataStore };
    importFormatterOptions = { metadataStore };
  })

  it('should create correctly', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: string;

      @CsvKey('Property B', csvKeyOptions)
      propertyB!: string;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({ 'Property A': 'Test value A', 'Property B': 'Test value B' });
    expect(result).to.deep.equal({ propertyA: 'Test value A', propertyB: 'Test value B' });
  });

  it('should convert basic types', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: string;

      @CsvKey('Property B', csvKeyOptions)
      propertyB!: number;

      @CsvKey('Property C', csvKeyOptions)
      propertyC!: boolean;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({ 'Property A': 'Test value', 'Property B': '4711', 'Property C': 'false' });
    expect(result).to.deep.equal({ propertyA: 'Test value', propertyB: 4711, propertyC: false });
  });

  it('should convert more complex, from string constructible types', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: TestObjType
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'Test value A'
    });

    expect(result).to.deep.equal({ propertyA: { value: 'Test value A'}});
  })

  it('should convert different boolean values', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: boolean;

      @CsvKey('Property B', csvKeyOptions)
      propertyB!: boolean;

      @CsvKey('Property C', csvKeyOptions)
      propertyC!: boolean;

      @CsvKey('Property D', csvKeyOptions)
      propertyD!: boolean;

      @CsvKey('Property E', csvKeyOptions)
      propertyE!: boolean;

      @CsvKey('Property F', csvKeyOptions)
      propertyF!: boolean;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'true',
      'Property B': 'false',
      'Property C': '1',
      'Property D': '0',
      'Property E': 'TRUE',
      'Property F': 'FALSE'
    });
    expect(result).to.deep.equal({
      'propertyA': true,
      'propertyB': false,
      'propertyC': true,
      'propertyD': false,
      'propertyE': true,
      'propertyF': false
    });
  });

  it('should ignore unspecified CSV keys', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: string;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'Test value A',
      'Property B': 'Test value B'
    });

    expect(result).to.deep.equal({ propertyA: 'Test value A'});
  });

  it('should ignore not decorated properties', () => {
    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      propertyA!: string;

      propertyB!: string;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'Test value A',
      'Property B': 'Test value B'
    });

    expect(result).to.deep.equal({ propertyA: 'Test value A'});
  });

  it('should use import formatters', () => {
    const testFormatter = (s: string) => s.toLowerCase();

    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      @ImportFormatter(testFormatter, importFormatterOptions)
      propertyA!: string;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'TeSt VaLuE a'
    });

    expect(result).to.deep.equal({ propertyA: 'test value a'});
  });

  it('should give import formatters precedence over other types', () => {
    const booleanFormatter = (_s: string) => false;
    const numberFormatter = (_s: string) => -4711;
    const stringFormatter = (_s: string) => 'From Formatter';
    const objFormatter = (s: string) => new TestObjType(s.toUpperCase()); 

    class TestModel {
      @CsvKey('Property A', csvKeyOptions)
      @ImportFormatter(booleanFormatter, importFormatterOptions)
      propertyA!: boolean;

      @CsvKey('Property B', csvKeyOptions)
      @ImportFormatter(numberFormatter, importFormatterOptions)
      propertyB!: number;

      @CsvKey('Property C', csvKeyOptions)
      @ImportFormatter(stringFormatter, importFormatterOptions)
      propertyC!: string;

      @CsvKey('Property D', csvKeyOptions)
      @ImportFormatter(objFormatter, importFormatterOptions)
      propertyD!: TestObjType;
    }

    const sut = new ModelFactory(metadataStore, TestModel);
    const result = sut.createFromObject({
      'Property A': 'TRUE',
      'Property B': '42',
      'Property C': 'Test value C',
      'Property D': 'Test value D'
    });

    expect(result).to.deep.equal({ 
      propertyA: false, 
      propertyB: -4711, 
      propertyC: 'From Formatter',
      propertyD: { value: 'TEST VALUE D'}
    });
  });
});