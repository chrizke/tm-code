import { Duplex } from 'stream';
import csv = require('csv-parse');

import { csvDataItem, dateHeaderItem } from './lineitem';
import { CsvImporterOptions } from './csvimporteroptions';
import { IModelFactory } from './modelfactory';

/**
 * Processes single lines from the imported file.
 * Transforms line strings into final objects.
 */
export class LineProcessor<T> extends Duplex {
  lineCounter = 0;

  parser: csv.Parser;

  constructor(
    private importerOptions: CsvImporterOptions,
    private modelFactory: IModelFactory<T>
  ) {
    super({
      objectMode: true
    });

    this.parser = csv({
      delimiter: importerOptions.delimiter,
      columns: true
    });

    this.parser.on('data', (chunk: any) => this.push(csvDataItem(this.modelFactory.createFromObject(chunk))));
  }

  _write(chunk: any, _encoding: any, next: (error?: Error | null) => void) {
    if (this.lineCounter < this.importerOptions.lineOffset) {
      this.push(dateHeaderItem<T>(this.parseHeaderDate(chunk.toString())));
    } else {
      // Send it to parser which will
      // come back with a 'data' event
      this.parser.write(chunk + '\n');
    }

    this.lineCounter++;

    next(undefined);
  }

  private parseHeaderDate(line: string) {
    const headerRegex = /^\uFEFF?"Date Generated: ((January|February|March|April|May|June|July|August|September|October|November|December)? (\d{1,2}), (\d{4}))"$/
    const matchRes = line.match(headerRegex);

    if (matchRes && matchRes.length > 1) {
      return new Date(`${matchRes[1]}`);
    }

    return new Date();
  }

  _final(cb: any) {
    this.push(null);
    cb();
  }

  _read() { }
}