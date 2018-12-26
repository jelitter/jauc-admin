import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Injectable, OnInit } from '@angular/core';
import { Invoice } from '../models/invoice';

@Injectable()
export class InvoiceService {
    invoices: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
        this.getInvoices();
        // .valueChanges()
        // .subscribe(invs => {
        //     console.log(`Invoices`, invs);
        // });
    }

    getInvoices() {
        return (this.invoices = this.firebase.list('invoices'));
    }

    addInvoice(invoice: Invoice) {
        return this.invoices.push(invoice);
    }

    createInvoice(booking: Booking) {
        // TODO: Replace hardcoded price with estimation from Google Maps API
        const invoice = new Invoice(booking.$key, 15.0);
        invoice.settlements = [];
        return this.addInvoice(invoice);
    }

    deleteInvoice(key: string) {
        this.invoices.remove(key);
    }
}
