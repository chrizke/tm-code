# `@tm-code/csv-importer`
Importer Library for typical Toastmasters roster files. It comes with defined model types for all three district roster files.

## Usage
Install it as usual as an npm package

```shell
npm install @tm-code/csv-importer
```

Use one of the following async methods to import csv files:

* importMembershipFile
* importClubOfficersFile
* importDistrictCouncilFile

For instance

```typescript
import { importMembershipFile } from '@tm-code/csv-importer';

const allMemberships = await importMembershipFile('./file.csv')
```
  

## Disclaimer
Toastmasters International and all other Toastmasters International Trademarks and copyrights are the sole property of Toastmasters International.

This software is independent of Toastmasters International. It is not authorized by, endorsed by, sponsored by, affiliated with, or otherwise approved by Toastmasters International.