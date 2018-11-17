import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { Booking } from './../models/booking';
import { BookingDataSource } from './bookings-datasource';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: BookingDataSource;
    displayedColumns = ['carId', 'userId', 'approvedBy', 'invoiceId'];

    constructor(private bookingService: BookingService) {}
    bookings: Array<Booking>;

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
                console.log(`Bookings received`, this.bookings);
                this.dataSource = new BookingDataSource(this.paginator, this.sort, this.bookings);
            });
    }
}
