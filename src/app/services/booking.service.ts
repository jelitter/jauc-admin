import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Booking } from '../models/booking';
import { Car } from '../models/car';
// import { Location } from '../models/location';
import { Injectable, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { CarService } from './car.service';
import { getDistance } from './shared';
import { ToasterService } from './toaster.service';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class BookingService {
    bookings: AngularFireList<any>;
    cars: AngularFireList<any>;
    carList: Car[] = [];
    bookingList: Booking[] = [];

    selectedBooking: Car = new Car();

    constructor(
        private toastr: ToasterService,
        private firebase: AngularFireDatabase,
        private carService: CarService,
        private invoiceService: InvoiceService
    ) {
        this.bookings = this.firebase.list('bookings');
        this.cars = this.firebase.list('cars');

        this.getCarList();
        this.getBookingList();
    }

    getBookings() {
        return this.bookings;
    }

    getCarList() {
        return this.cars.snapshotChanges().subscribe(cars => {
            this.carList = [];
            cars.forEach(el => {
                const car = el.payload.toJSON();
                car['$key'] = el.key;
                car['carId'] = el.key;
                this.carList.push(car as Car);
            });
            console.log(`🚗 Car List`, this.carList);
        });
    }

    getBookingList() {
        return this.bookings.snapshotChanges().subscribe(bookings => {
            this.bookingList = [];
            bookings.forEach(el => {
                const booking = el.payload.toJSON();
                booking['$key'] = el.key;
                booking['bookingId'] = el.key;
                this.bookingList.push(booking as Booking);
            });
            console.log(`📘 Booking List`, this.bookingList);
        });
    }

    approveBooking(booking: Booking, adminId: string): Car {
        const key = booking.$key;
        let assignedCar: Car = null;

        // Assign the closest car
        let closestCarId = null;
        let closestDistance = Infinity;
        const availableCars = this.carList.filter(c => !c.currentBookingId);
        console.log(`🚕 Searching in ${availableCars.length} available cars...`);

        availableCars.forEach(car => {
            const distance = getDistance(booking.origin, car.location);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCarId = car.$key;
            }
        });
        assignedCar = this.carList.find(car => car.$key === closestCarId);
        if (assignedCar) {
            console.log(
                `Closest car '${assignedCar.name}' found ${Math.round((closestDistance / 1000) * 100) / 100} km.`,
                assignedCar
            );

            booking.approvedBy = adminId;
            assignedCar.currentBookingId = key;
            booking.carId = assignedCar.carId || assignedCar.$key || closestCarId || null;
            booking.carName = assignedCar.name;

            // Create Invoice
            this.invoiceService.createInvoice(booking).then(inv => {
                booking.invoiceId = inv.key;
                delete booking.$key;
                this.bookings.update(key, booking).then(() => {
                    this.toastr.showToast(
                        `✅ Booking approved! Assigned closest car '${assignedCar.name}' found ${Math.round(
                            (closestDistance / 1000) * 100
                        ) / 100} km. away`,
                        'JAUC Cars',
                        7000
                    );
                    // this.carService.updateCarToDB(assignedCar);
                    delete assignedCar.$key;
                    this.cars.update(booking.carId, assignedCar);
                });
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

        this.removeCarFromBooking(booking);
        booking.carId = null;
        booking.carName = null;

        this.invoiceService.deleteInvoice(booking.invoiceId);
        booking.invoiceId = null;
        this.bookings.update(key, booking);
    }

    deleteBooking(booking: Booking) {
        this.removeCarFromBooking(booking);
        this.invoiceService.deleteInvoice(booking.invoiceId);
        this.bookings.remove(booking.$key);
    }

    releaseCarFromBooking(bookingId) {
        const booking = this.bookingList.find(b => b.$key === bookingId);
        if (booking) {
            this.removeCarFromBooking(booking);
        }
    }

    isBookingPaid(bookingId) {
        if (this.bookingList.length === 0) {
            return false;
        }

        const foundBooking = this.bookingList.find(b => b.$key === bookingId);
        if (foundBooking) {
            // console.log(`Booking Id ${foundBooking.$key} has invoice Id:`, foundBooking.invoiceId);
            return this.invoiceService.isInvoicePaid(foundBooking.invoiceId);
        } else {
            // console.log(`No booking found with Id ${bookingId}`);
            return true;
        }

        // this.firebase
        //     .list('bookings')
        //     .snapshotChanges()
        //     .take(1)
        //     .subscribe(bookings => {
        //         this.bookingList = [];
        //         bookings.forEach(el => {
        //             const booking = el.payload.toJSON() as Booking;
        //             booking['$key'] = el.key;
        //             this.bookingList.push(booking as Booking);
        //         });
        //         const foundBooking = this.bookingList.find(b => b.$key === bookingId);
        //         if (foundBooking) {
        //             // console.log(`Booking Id ${foundBooking.$key} has invoice Id:`, foundBooking.invoiceId);
        //             return this.invoiceService.isInvoicePaid(foundBooking.invoiceId);
        //         } else {
        //             // console.log(`No booking found with Id ${bookingId}`);
        //             return true;
        //         }
        //     });
    }

    private removeCarFromBooking(booking: Booking) {
        const assignedCar = this.carList.find(car => car.$key === booking.carId);
        if (assignedCar) {
            assignedCar.currentBookingId = null;
            this.carService.updateCarToDB(assignedCar);
            console.log('📕 Unapprove - Car removed from booking');
        } else {
            console.log('📙 Unapprove - No car found for this booking');
        }
    }
}
