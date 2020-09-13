import { Writable } from 'stream';
import { CsvImporterResult } from './csvimporterresult';
import { LineItem, LineItemType } from './lineitem';

export class ImportResultAggregator<T> extends Writable {
  
  aggregate = new CsvImporterResult<T>();
  
  constructor() {
    super({
      objectMode: true,
    });
  }

  _write(chunk: LineItem<T>, _encoding: any, callback: (error?: Error | null) => void) {
    if (chunk.type === LineItemType.DateHeader) {
      this.aggregate.fileCreationDate = chunk.data as Date;
    } else {
      this.aggregate.entries.push(chunk.data as T);
    }
 
    callback();
  }
}