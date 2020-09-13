import { CsvKey, ImportFormatter, DashDateFormatter, StringArrayFormatter } from '../decorators';

export class DistrictCouncilCsvModel {
  @CsvKey('District Name')
  districtName!: string;

  @CsvKey('Club ID')
  clubID!: number;


  @CsvKey('Club Name')
  clubName!: string;

  @CsvKey('Club Status')
  clubStatus!: string;

  @CsvKey('Position Description')
  position!: string;

  @CsvKey('Begin Date')
  @ImportFormatter(DashDateFormatter())
  beginDate!: Date;

  @CsvKey('End Date')
  @ImportFormatter(DashDateFormatter())
  endDate!: Date;

  @CsvKey('Member ID')
  memberID!: number;

  @CsvKey('First Name')
  firstName!: string;

  @CsvKey('Middle Name')
  middleName!: string;

  @CsvKey('Last Name')
  lastName!: string;

  @CsvKey('Name Credentials')
  @ImportFormatter(StringArrayFormatter())
  edu!: string[];

  @CsvKey('Email Address')
  email?: string;


  @CsvKey('Is Paid')
  @ImportFormatter((value: string) => value === 'Y')
  isPaid!: boolean;

  @CsvKey('Area')
  area!: number;


  @CsvKey('Division')
  division!: string;

  @CsvKey('District')
  district!: string;


  @CsvKey('Region')
  region!: number;

}