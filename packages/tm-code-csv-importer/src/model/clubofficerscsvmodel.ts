import { CsvKey, ImportFormatter, SlashDateFormatter, DashDateFormatter, OptedOutFormatter, StringArrayFormatter } from '../decorators';

export class ClubOfficersCsvModel {
  @CsvKey('Division')
  division?: string;

  @CsvKey('Area')
  area?: number;

  @CsvKey('Club ID')
  clubID?: number;

  @CsvKey('Club Name')
  clubName?: string;

  @CsvKey('Club Status')
  clubStatus?: string;

  @CsvKey('Charter Date')
  @ImportFormatter(DashDateFormatter())
  charterDate?: Date;

  @CsvKey('Election Cycle')
  electionCycle?: string;

  @CsvKey('Office')
  office?: string;

  @CsvKey('Term Begin')
  @ImportFormatter(SlashDateFormatter())
  termBegin?: Date;

  @CsvKey('Term End')
  @ImportFormatter(SlashDateFormatter())
  termEnd?: Date;

  @CsvKey('Club Join Date')
  @ImportFormatter(DashDateFormatter())
  clubJoinDate?: Date;

  @CsvKey('Original Join Date')
  @ImportFormatter(DashDateFormatter())
  originalJoinDate?: Date;

  @CsvKey('Membership Begin')
  @ImportFormatter(DashDateFormatter())
  membershipBegin?: Date;

  @CsvKey('Membership End')
  @ImportFormatter(DashDateFormatter())
  membershipEnd?: Date;

  @CsvKey('Member ID')
  memberID?: number;

  @CsvKey('Paid Status')
  paidStatus?: string;

  @CsvKey('Last Name')
  lastName?: string;

  @CsvKey('First Name')
  first?: string;

  @CsvKey('Middle Name')
  middleName?: string;

  @CsvKey('EDU')
  @ImportFormatter(StringArrayFormatter())
  edu: string[] = [];

  @CsvKey('Address Line 1')
  address1?: string;

  @CsvKey('Address Line 2')
  address2?: string;

  @CsvKey('City')
  city?: string;

  @CsvKey('State')
  state?: string;

  @CsvKey('Postal Code')
  postalCode?: string;

  @CsvKey('Country')
  country?: string;

  @CsvKey('Member has opted-out of Toastmasters WHQ marketing mail')
  @ImportFormatter(OptedOutFormatter())
  wantsMarketingMails?: string;

  @CsvKey('Home Phone')
  homePhone?: string;

  @CsvKey('Work Phone')
  workPhone?: string;

  @CsvKey('Cell Phone')
  cellPhone?: string;

  @CsvKey('Fax')
  fax?: string;

  @CsvKey('Member has opted-out of Toastmasters WHQ marketing phone calls')
  @ImportFormatter(OptedOutFormatter())
  wantsMarketingCalls!: boolean;

  @CsvKey('Email Address')
  email?: string;

  @CsvKey('Member has opted-out of Toastmasters WHQ marketing emails')
  @ImportFormatter(OptedOutFormatter())
  wantsMarketingEmails!: boolean;

  @CsvKey('Web URL')
  webURL?: string;

  @CsvKey('Pathways Enrolled')
  pathwaysEnrolled?: boolean;
}
