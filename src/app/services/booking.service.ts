import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Car } from '../models/car';
import { Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Injectable()
export class BookingService {
    bookings: AngularFireList<any>;
    selectedBooking: Car = new Car();

    constructor(private firebase: AngularFireDatabase, private invoiceService: InvoiceService) {}

    getBookings() {
        return (this.bookings = this.firebase.list('bookings'));
    }

    approveBooking(booking: Booking, adminId: string) {
        const key = booking.$key;
        booking.approvedBy = adminId;
        this.invoiceService.createInvoice(booking).then(inv => {
            booking.invoiceId = inv.key;
            delete booking.$key;
            this.bookings.update(key, booking);
        });
    }

    unapproveBooking(booking: Booking) {
        const key = booking.$key;
        delete booking.$key;
        booking.approvedBy = null;

        this.invoiceService.deleteInvoice(booking.invoiceId);
        booking.invoiceId = null;
        this.bookings.update(key, booking);
    }

    deleteBooking(booking: Booking) {
        this.bookings.remove(booking.$key);
    }
}
