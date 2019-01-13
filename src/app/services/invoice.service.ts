import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Injectable, OnInit } from '@angular/core';
import { Invoice } from '../models/invoice';
import { getDistance } from './shared';

@Injectable()
export class InvoiceService {
    invoices: AngularFireList<any>;
    invoiceList: Invoice[] = [];

    constructor(private firebase: AngularFireDatabase) {
        this.getInvoices()
            .snapshotChanges()
            .subscribe(invoices => {
                this.invoiceList = [];
                invoices.forEach(el => {
                    const inv = el.payload.toJSON() as Invoice;
                    inv['$key'] = el.key;
                    this.invoiceList.push(inv as Invoice);
                });
            });
    }

    getInvoices() {
        return (this.invoices = this.firebase.list('invoices'));
    }

    addInvoice(invoice: Invoice) {
        return this.invoices.push(invoice);
    }

    createInvoice(booking: Booking) {
        // TODO: Replace hardcoded price with estimation from Google Maps API

        const distance = getDistance(booking.origin, booking.destination);
        let price = Math.round((distance / 1000) * 100) / 100;
        if (price < 10) {
            price = 10;
        }

        console.log({ distance, price });

        const invoice = new Invoice(booking.$key, price);
        invoice.settlements = [];
        return this.addInvoice(invoice);
    }

    deleteInvoice(key: string) {
        this.invoices.remove(key);
    }

    isInvoicePaid(invoiceId): Boolean {
        const invoice = this.invoiceList.find(i => i.$key === invoiceId);
        if (invoice) {
            // console.log(`Invoice Id ${invoiceId} found, paid: ${invoice.paid}`);
            return invoice.paid;
        } else {
            // console.log(`No invoice found with Id ${invoiceId}`);
            return false;
        }
    }
}
