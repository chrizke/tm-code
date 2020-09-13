import { expect } from 'chai';

import { LineProcessor } from '../../src/parser/lineprocessor';
import { CsvKey } from '../../src/decorators/csvkey';

// class Model {
//   propA?: string;
//   propB?: string;
// }

// class KeyModel {
//   @CsvKey('Property A')
//   propA?: string;

//   @CsvKey('Property B')
//   propB?: string;
// }

describe.skip('LineProcessor', () => {

  // it('should create a new instance of T', (done) => {
  //   const sut = new LineProcessor<Model>(() => new Model());

  //   sut.write({
  //     propA: 'FirstProp',
  //     propB: 'SecondProp'
  //   });

  //   sut.on('data', (chunk: any) => {
  //     expect(chunk).to.instanceOf(Model);
  //     done();
  //   });
  // });

  
  // it('should set all properties', (done) => {
  //   const sut = new LineProcessor<Model>(() => new Model());

  //   const obj = {
  //     propA: 'FirstProp',
  //     propB: 'SecondProp'
  //   };

  //   const expectedResult: Model = {
  //     ...obj,
  //   };

  //   sut.write(obj);

  //   sut.on('data', (chunk: Model) => {
  //     expect(chunk).to.deep.equal(expectedResult);
  //     done();
  //   });
  // });


  // it('should set all properties with speifiec csv keys', (done) => {
  //   const sut = new LineProcessor<KeyModel>(() => new KeyModel());

  //   const obj = {
  //     'Property A': 'FirstProp',
  //     'Property B': 'SecondProp'
  //   };

  //   const expectedResult = new KeyModel();
  //   expectedResult.propA = 'FirstProp';
  //   expectedResult.propB = 'SecondProp';

  //   sut.write(obj);

  //   sut.on('data', (chunk: KeyModel) => {
  //     expect(expectedResult).to.deep.equal(chunk);
  //     done();
  //   });
  // });


  // it('should ignore undefined properties', (done) => {
  //   const sut = new LineProcessor<KeyModel>(() => new KeyModel());

  //   const obj = {
  //     'Property A': 'FirstProp'
  //   };

  //   const expectedResult = new KeyModel();
  //   expectedResult.propA = 'FirstProp';

  //   sut.write(obj);

  //   sut.on('data', (chunk: KeyModel) => {
  //     expect(expectedResult).to.deep.equal(chunk);
  //     done();
  //   })
  // })
})