import csv = require('csv-parse');

import { createReadStream, read } from 'fs';
import { createInterface } from 'readline';
import { Readable } from 'stream';

import { LineProcessor } from './lineprocessor';
import { ImportResultAggregator } from './lineaggregator';

import { MembershipModelFactory, ClubOfficerModelFactory, DistrictCouncilModelFactory, IModelFactory } from './modelfactory';
import { CsvImporterResult } from './csvimporterresult';
import { CsvImporterOptions } from './csvimporteroptions';




/**
 * Parser for TM specific membership csv files.
 */
export class CsvImporter<T> {


  constructor(
    private options: CsvImporterOptions,
    private lineProcessor: LineProcessor<T>,
    private importResultAggregator: ImportResultAggregator<T>
  ) { }


  /**
   * Reads and parses csv file.
   */
  async import(fileName: string) {
    return new Promise(
      (resolve: (r: CsvImporterResult<T>) => void, reject: () => void) => {
        this.lineReader(fileName)
          .pipe(this.lineProcessor)
          .pipe(this.importResultAggregator)
          .on('finish' , () => {
            resolve(this.importResultAggregator.aggregate);
          });
      })
  }

  private lineReader(fileName: string) {
    const reader = new Readable({
      read() {}
    });

    const readInterface = createInterface({
      input: createReadStream(fileName, { encoding: this.options.encoding }),
      terminal: false
    });

    readInterface.on('line', (line: string) => reader.push(line));
    readInterface.on('close', () => reader.push(null));

    return reader;
  }
}

async function importFile<T>(filePath: string, modelFactory: IModelFactory<T>) {
  const options = new CsvImporterOptions();

  const importer = new CsvImporter<T>(
    options,
    new LineProcessor(options, modelFactory),
    new ImportResultAggregator<T>()
  );
  return await importer.import(filePath);
}

export async function importMembershipFile(filePath: string) {
  return importFile(filePath, MembershipModelFactory());
}

export async function importClubOfficersFile(filePath: string) {
  return importFile(filePath, ClubOfficerModelFactory());
}

export async function importDistrictCouncilFile(filePath: string) {
  return importFile(filePath, DistrictCouncilModelFactory());
}