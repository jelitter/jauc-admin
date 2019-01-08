import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
    selector: 'app-review-table',
    templateUrl: './reviewtable.component.html',
    styleUrls: ['./reviewtable.component.css'],
})
export class ReviewTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    reviewList: Review[];
    displayedColumns = ['$key', 'carId', 'userId', 'bookingId', 'rating'];

    constructor(
        private reviews: ReviewService,
        private userService: UserService,
        private bookingService: BookingService
    ) {}

    ngOnInit() {
        this.reviews
            .getReviews()
            .snapshotChanges()
            .subscribe(update => {
                this.reviewList = this.getReviews(update);
            });
    }

    getReviews(fireBaseData) {
        const data = [];

        fireBaseData.forEach(element => {
            const review = element.payload.toJSON() as Review;

            review['$key'] = element.key;

            const searchedUser = this.userService.getUserById(review.userId);
            review.userName = searchedUser ? searchedUser.displayName : review.userId;

            const searchedBooking = this.bookingService.bookingList.find(b => b.$key === review.bookingId);
            review.carName = (searchedBooking ? searchedBooking.carName : review.carId) || 'none';

            data.push(review as Review);
        });

        return data;
    }
}
