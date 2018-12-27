import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Car } from '../models/car';
import { Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { CarService } from './car.service';

@Injectable()
export class BookingService {
    bookings: AngularFireList<any>;
    selectedBooking: Car = new Car();

    constructor(
        private firebase: AngularFireDatabase,
        private carService: CarService,
        private invoiceService: InvoiceService
    ) {
        this.bookings = this.firebase.list('bookings');
    }

    getBookings() {
        return this.bookings;
    }

    approveBooking(booking: Booking, adminId: string) {
        const key = booking.$key;
        booking.approvedBy = adminId;

        const carList: Car[] = [];

        // Assign a Car
        this.carService
            .getCars()
            .snapshotChanges()
            .subscribe(cars => {
                cars.forEach(el => {
                    const car = el.payload.toJSON();
                    car['$key'] = el.key;
                    carList.push((car as unknown) as Car);
                });

                // Find closest car here...
                booking.carId = carList[Math.floor(Math.random() * carList.length)].$key;

                console.log('carList', carList);

                // Create Invoice
                this.invoiceService.createInvoice(booking).then(inv => {
                    booking.invoiceId = inv.key;
                    delete booking.$key;
                    this.bookings.update(key, booking);
                });
            });
    }

    unapproveBooking(booking: Booking) {
        const key = booking.$key;
        delete booking.$key;
        booking.approvedBy = null;
        booking.carId = null;

        this.invoiceService.deleteInvoice(booking.invoiceId);
        booking.invoiceId = null;
        this.bookings.update(key, booking);
    }

    deleteBooking(booking: Booking) {
        this.bookings.remove(booking.$key);
    }
}
