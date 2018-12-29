import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { Booking } from './../models/booking';
import { BookingDataSource } from './bookings-datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../services/user.service';

import { WindowService, WindowRef, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { CarsComponent } from '../cars/cars.component';

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
    bookings: Array<Booking>;
    dataSource: BookingDataSource;
    displayedColumns = ['actions', 'carId', 'userId', 'approvedBy', 'invoiceId', 'origin', 'destination', 'date'];

    public result;

    constructor(
        private bookingService: BookingService,
        private userService: UserService,
        private windowService: WindowService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
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
                this.dataSource = new BookingDataSource(this.paginator, this.sort, this.bookings);
            });
    }

    onApprove(booking: Booking) {
        this.userService.uid
            .take(1)
            .toPromise()
            .then(uid => {
                console.log(this.userService.displayName);
                const assignedCar = this.bookingService.approveBooking(booking, this.userService.displayName);
                console.log({ assignedCar });
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

    // Cars floating window
    public openCars() {
        const window: WindowRef = this.windowService.open({
            title: 'Cars',
            content: CarsComponent,
            width: 1000,
            height: 600,
        });

        window.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                console.log('Cars window was closed.');
            }
        });
    }

    public openDialog() {
        const dialog: DialogRef = this.dialogService.open({
            title: 'Please confirm',
            content: 'Are you sure?',
            actions: [{ text: 'No' }, { text: 'Yes', primary: true }],
            width: 450,
            height: 200,
            minWidth: 250,
        });

        dialog.result.subscribe(result => {
            if (result instanceof DialogCloseResult) {
                console.log('close');
            } else {
                console.log('action', result);
            }

            this.result = JSON.stringify(result);
        });
    }
}
