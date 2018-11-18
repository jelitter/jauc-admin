import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { Booking } from './../models/booking';
import { BookingDataSource } from './bookings-datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    bookings: Array<Booking>;
    dataSource: BookingDataSource;
    displayedColumns = ['actions', 'carId', 'userId', 'approvedBy', 'invoiceId', 'origin', 'destination'];

    constructor(private bookingService: BookingService, private userService: UserService) {}

    ngOnInit() {
        this.bookingService
            .getBookings()
            .snapshotChanges()
            .subscribe(item => {
                this.bookings = [];
                item.forEach(element => {
                    const b = element.payload.toJSON();
                    b['$key'] = element.key;
                    this.bookings.push(b as Booking);
                });
                this.dataSource = new BookingDataSource(this.paginator, this.sort, this.bookings);
            });
    }

    onApprove(booking: Booking) {
        this.userService.uid
            .take(1)
            .toPromise()
            .then(uid => {
                console.log(this.userService.displayName);
                this.bookingService.approveBooking(booking, this.userService.displayName);
            });
    }
    onUnapprove(booking: Booking) {
        this.bookingService.approveBooking(booking, '');
    }
}
