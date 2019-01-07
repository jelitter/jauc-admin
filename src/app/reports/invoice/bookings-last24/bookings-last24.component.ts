import { Booking } from 'src/app/models/booking';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-bookings-last24',
  templateUrl: './bookings-last24.component.html',
  styleUrls: ['./bookings-last24.component.scss']
})
export class BookingsLast24Component implements OnInit {

  	bookingList: Array<Booking>;
		total: number = 0;

    constructor(private bookingService: BookingService) {}

    ngOnInit() {
        this.bookingService
            .getBookings()
            .snapshotChanges()
            .subscribe(
							update => {
                this.bookingList = this.getBooking(update);
								this.calculateTotal(this.bookingList);
            });
    }

    getBooking(fireBaseData) {
        const data = [];

        fireBaseData.forEach(element => {
            const booking = element.payload.toJSON();
            booking['$key'] = element.key;
            data.push(booking as Booking);
        });

        return data;
    }

		calculateTotal(list: Array<Booking>): void {
			let count = 0;

			list.forEach((element) => {
				const oneday = 60 * 60 * 24 * 1000; // milliseconds
				const dateDiff = Math.abs(new Date().getTime() - new Date(element.date).getTime());

				if(dateDiff < oneday) { // if date is within 24h
					count++;
				}
			});

			this.total = count;
		}

}
