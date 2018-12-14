import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

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

    constructor(private reviews: ReviewService) {}

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
            const review = element.payload.toJSON();
            review['$key'] = element.key;
            data.push(review as Review);
        });

        return data;
    }
}
