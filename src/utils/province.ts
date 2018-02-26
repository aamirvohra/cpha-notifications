export class Province {
  name: string;
  abbr: string;
  selected: false;

  static getProvinceList(): Array<any> {
    const provinceList = [
      {
        name: 'Alberta',
        abbr: 'AB'
      },
      {
        name: 'British Columbia',
        abbr: 'BC'
      },
      {
        name: 'Manitoba',
        abbr: 'MB'
      },
      {
        name: 'New Brunswick',
        abbr: 'NB'
      },
      {
        name: 'Newfoundland and Labrador',
        abbr: 'NL'
      },
      {
        name: 'Nova Scotia',
        abbr: 'NS',
      },
      {
        name: 'Ontario',
        abbr: 'ON'
      },
      {
        name: 'Prince Edward Island',
        abbr: 'PE'
      },
      {
        name: 'Quebec',
        abbr: 'QC',
      },
      {
        name: 'Saskatchewan',
        abbr: 'SK'
      },
    ];

    return provinceList;
  }

}
