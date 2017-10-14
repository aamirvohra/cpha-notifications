import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService {

  constructor() { }

  public getReports() {
    return this.getMockReportList();
  }

  private getMockReportList() {
    return [
      {
        product_name: 'Tylenol',
        request_type: 'Monograph Update',
        attachment: 'drug123.pdf',
        submitted_by: 'John Doe',
        date_submitted: 'May 04, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Dukoral',
        request_type: 'Drug Shortage',
        attachment: 'pfizer1076.pdf',
        submitted_by: 'Mary Kate Olsen',
        date_submitted: 'March 11, 2017',
        distribution_method: 'Fax and Email',
      },
      {
        product_name: 'Fluioraquinodones',
        request_type: 'Drug Shortage',
        attachment: 'drug123976.pdf',
        submitted_by: 'Chuck Norris',
        date_submitted: 'March 07, 2017',
        distribution_method: 'Include in CPS',
      },
      {
        product_name: 'Bentodiazepines',
        request_type: 'New Monograph',
        attachment: 'pfizer1076.pdf',
        submitted_by: 'Kathryn Wood',
        date_submitted: 'May 04, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Twinriz',
        request_type: 'Advisories and Warnings',
        attachment: 'pfizeralert.doc',
        submitted_by: 'Lyndon McPhail',
        date_submitted: 'March 11, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Fluioraquinodones',
        request_type: 'Drug Shortage',
        attachment: 'drug123976.pdf',
        submitted_by: 'Chuck Norris',
        date_submitted: 'March 07, 2017',
        distribution_method: 'Include in CPS',
      },
      {
        product_name: 'Bentodiazepines',
        request_type: 'New Monograph',
        attachment: 'pfizer1076.pdf',
        submitted_by: 'Kathryn Wood',
        date_submitted: 'May 04, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Twinriz',
        request_type: 'Advisories and Warnings',
        attachment: 'pfizeralert.doc',
        submitted_by: 'Lyndon McPhail',
        date_submitted: 'March 11, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Fluioraquinodones',
        request_type: 'Drug Shortage',
        attachment: 'drug123976.pdf',
        submitted_by: 'Chuck Norris',
        date_submitted: 'March 07, 2017',
        distribution_method: 'Include in CPS',
      },
      {
        product_name: 'Bentodiazepines',
        request_type: 'New Monograph',
        attachment: 'pfizer1076.pdf',
        submitted_by: 'Kathryn Wood',
        date_submitted: 'May 04, 2017',
        distribution_method: 'Fax',
      },
      {
        product_name: 'Twinriz',
        request_type: 'Advisories and Warnings',
        attachment: 'pfizeralert.doc',
        submitted_by: 'Lyndon McPhail',
        date_submitted: 'March 11, 2017',
        distribution_method: 'Fax',
      },
    ]
  }

}
