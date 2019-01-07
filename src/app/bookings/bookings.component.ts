import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { Booking } from './../models/booking';
import { BookingDataSource } from './bookings-datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    opened = false;
    selectedBooking = null;
    showAllBookings = false;
    bookings: Array<Booking>;
    dataSource: BookingDataSource;
    displayedColumns = ['actions', 'carId', 'userId', 'approvedBy', 'invoiceId', 'origin', 'destination', 'date'];

    public result;

    constructor(private bookingService: BookingService, private userService: UserService) {}

    ngOnInit() {
        this.showAllBookings = false;
        this.bookingService
            .getBookings()
            .snapshotChanges()
            .subscribe(item => {
                this.bookings = [];
                item.forEach(element => {
                    const b = element.payload.toJSON() as Booking;
                    b['$key'] = element.key;

                    const searchedUser = this.userService.getUserById(b.userId);
                    b.userName = searchedUser ? searchedUser.displayName : b.userId;

                    this.bookings.push(b);
                });
                this.dataSource = new BookingDataSource(
                    this.paginator,
                    this.sort,
                    this.bookings.filter(b => !b.approvedBy)
                );
            });
    }

    onApprove(booking: Booking) {
        this.userService.uid
            .take(1)
            .toPromise()
            .then(uid => {
                this.bookingService.approveBooking(booking, this.userService.displayName);
            });
    }

    onUnapprove(booking: Booking) {
        this.bookingService.unapproveBooking(booking);
    }

    onDelete(booking: Booking) {
        this.bookingService.deleteBooking(booking);
    }

    onView(booking: Booking) {
        this.selectedBooking = booking;
        this.displayedColumns = ['actions', 'carId', 'origin', 'destination'];
    }

    showAllClicked() {
        this.filterVisible();
    }

    filterVisible() {
        this.dataSource = new BookingDataSource(
            this.paginator,
            this.sort,
            !this.showAllBookings ? this.bookings : this.bookings.filter(b => !b.approvedBy)
        );
    }

    hideMap() {
        this.selectedBooking = null;
        this.displayedColumns = [
            'actions',
            'carId',
            'userId',
            'approvedBy',
            'invoiceId',
            'origin',
            'destination',
            'date',
        ];
    }
}
