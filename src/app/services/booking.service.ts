import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Car } from '../models/car';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class BookingService {
    bookings: AngularFireList<any>;
    selectedBooking: Car = new Car();

    constructor(private firebase: AngularFireDatabase) {}

    getBookings() {
        return (this.bookings = this.firebase.list('bookings'));
    }

    approveBooking(booking: Booking, adminId: string) {
        const key = booking.$key;
        delete booking.$key;
        booking.approvedBy = adminId;
        this.bookings.update(key, booking);
    }
}
