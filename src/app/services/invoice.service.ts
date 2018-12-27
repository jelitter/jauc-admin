import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Injectable, OnInit } from '@angular/core';
import { Invoice } from '../models/invoice';
import { getDistance } from './shared';

@Injectable()
export class InvoiceService {
    invoices: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
        this.getInvoices();
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
}
