import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/models/invoice';
import { Settlement } from 'src/app/models/settlement';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-total-revenue',
  templateUrl: './total-revenue.component.html',
  styleUrls: ['./total-revenue.component.scss']
})
export class TotalRevenueComponent implements OnInit {

    invoiceList: Array<Invoice>;
		totalRevenue: number;

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.invoiceService
            .getInvoices()
            .snapshotChanges()
            .subscribe(
							update => {
                this.invoiceList = this.getInvoice(update);
								this.totalRevenue = this.getRevenue(this.invoiceList);
            });
    }

    getInvoice(fireBaseData) {
        const data = [];

        fireBaseData.forEach(element => {
            const inv = element.payload.toJSON();
            inv['$key'] = element.key;
            data.push(inv as Invoice);
        });

        return data;
    }

		getRevenue(invoices): number {
			let total = 0;

			invoices.forEach(element => {
				total += element.price;
			});

			return total;
		}

}
