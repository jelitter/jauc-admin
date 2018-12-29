import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Car } from '../models/car';
import { Location } from '../models/location';
import { Injectable } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { CarService } from './car.service';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { getDistance } from './shared';
import { ToasterService } from './toaster.service';

@Injectable()
export class BookingService {
    bookings: AngularFireList<any>;
    carList: Car[] = [];
    bookingList: Booking[] = [];

    selectedBooking: Car = new Car();

    constructor(
        private toastr: ToasterService,
        private firebase: AngularFireDatabase,
        private carService: CarService,
        private invoiceService: InvoiceService,
        private userService: UserService
    ) {
        this.bookings = this.firebase.list('bookings');
        this.carService
            .getCars()
            .snapshotChanges()
            .subscribe(cars => {
                this.carList = [];
                cars.forEach(el => {
                    const car = el.payload.toJSON();
                    car['$key'] = el.key;
                    this.carList.push((car as unknown) as Car);
                });
            });
    }

    getBookings() {
        return this.bookings;
    }

    approveBooking(booking: Booking, adminId: string): Car {
        const key = booking.$key;
        let assignedCar = null;

        // Assign the closest car
        let closestCarId = null;
        let closestDistance = Infinity;
        const availableCars = this.carList.filter(c => !c.currentBookingId);
        console.log(`🚕 Searching in ${availableCars.length} available cars...`);

        availableCars.forEach(car => {
            const distance = getDistance(booking.origin, car.location);
            // console.log('distance', distance);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCarId = car.$key;
            }
        });
        assignedCar = this.carList.find(car => car.$key === closestCarId);
        if (assignedCar) {
            this.toastr.showToast(
                `✅ Booking approved! Assigned closest car '${assignedCar.name}' found ${Math.round(
                    (closestDistance / 1000) * 100
                ) / 100} km. away`,
                'JAUC Cars',
                5000
            );

            console.log(
                `Closest car '${assignedCar.name}' found ${Math.round((closestDistance / 1000) * 100) / 100} km.`
            );

            booking.approvedBy = adminId;

            assignedCar.currentBookingId = booking.$key;
            booking.carId = closestCarId;
            booking.carName = assignedCar.name;
            // Create Invoice
            this.invoiceService.createInvoice(booking).then(inv => {
                booking.invoiceId = inv.key;
                delete booking.$key;
                this.bookings.update(key, booking);
                this.carService.updateCarToDB(assignedCar);
            });
        } else {
            console.error('No cars available for this booking');
            this.toastr.showToast(`❌ Booking was NOT approved! All cars are currently busy.`, 'JAUC Cars', 5000);
        }
        return assignedCar;
    }

    unapproveBooking(booking: Booking) {
        const key = booking.$key;
        delete booking.$key;
        booking.approvedBy = null;

        const assignedCar = this.carList.find(car => car.$key === booking.carId);
        if (assignedCar) {
            assignedCar.currentBookingId = null;
            console.error('Unapprove - Car removed from booking');
        } else {
            console.error('Unapprove - No car found for this booking');
        }
        booking.carId = null;
        booking.carName = null;

        this.invoiceService.deleteInvoice(booking.invoiceId);
        booking.invoiceId = null;
        this.bookings.update(key, booking);
    }

    deleteBooking(booking: Booking) {
        this.bookings.remove(booking.$key);
    }
}
