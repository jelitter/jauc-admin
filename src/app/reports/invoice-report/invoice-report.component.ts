import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceDataSource } from './invoice-datasource';

@Component({
    selector: 'app-invoice-report',
    templateUrl: './invoice-report.component.html',
    styleUrls: ['./invoice-report.component.scss'],
})
export class InvoiceReportComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    invoices: Array<Invoice>;
    dataSource: InvoiceDataSource;
    displayedColumns = ['bookingId', 'price', 'paid'];

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.invoiceService
            .getInvoices()
            .snapshotChanges()
            .subscribe(item => {
                this.invoices = [];
                item.forEach(element => {
                    const inv = element.payload.toJSON() as Invoice;
                    inv['$key'] = element.key;
                    this.invoices.push(inv);
                });
                this.dataSource = new InvoiceDataSource(this.paginator, this.sort, this.invoices);
            });
    }
}
