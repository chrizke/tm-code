/**
 * Enum to distinguish different type of LineItems.
 */
export enum LineItemType {
   DateHeader,
   CsvData,
   None
};


/**
 * Transfer class for each line during import. 
 * Contains line item itself and meta data about
 * the type of the line.
 */
export class LineItem<T> {
  type: LineItemType = LineItemType.None;

  data?: T | Date;
}


/**
 * Create a new LineItem object for type DateHeader.
 * @param date Date
 */
export function dateHeaderItem<T>(date: Date): LineItem<T> {
  return {
    type: LineItemType.DateHeader,
    data: date
  };
}


/**
 * Create a new LineItem object for type T
 * @param data Data
 */
export function csvDataItem<T>(data: T): LineItem<T> {
  return {
    type: LineItemType.CsvData,
    data
  }
}