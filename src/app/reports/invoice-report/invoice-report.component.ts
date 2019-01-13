import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceDataSource } from './invoice-datasource';
import { BookingService } from './../../services/booking.service';

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

    constructor(private invoiceService: InvoiceService, private bookingService: BookingService) {}

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

                    if (inv.paid) {
                        // If invoice is paid, release car from booking
                        console.log(`Booking ${inv.bookingId} has a paid invoice, releasing car.`);
                        this.bookingService.releaseCarFromBooking(inv.bookingId);
                    }
                });
                this.dataSource = new InvoiceDataSource(this.paginator, this.sort, this.invoices);
            });
    }

    totalInvoices(all = false) {
        let sum = 0;
        this.invoices.filter(inv => inv.paid || all).forEach(i => (sum += i.price));
        return sum;
    }
}
