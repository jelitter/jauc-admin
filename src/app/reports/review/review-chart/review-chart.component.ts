import { ReviewService } from 'src/app/services/review.service';
import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-review-chart',
    templateUrl: './review-chart.component.html',
    styleUrls: ['./review-chart.component.css'],
})
export class ReviewChartComponent implements OnInit {
    public reviewList: Review[];
    public emotions: Object[];
    displayedColumns = ['$key', 'carId', 'userId', 'bookingId', 'rating'];

    constructor(private reviews: ReviewService) {}

    ngOnInit() {
        this.reviews
            .getReviews()
            .snapshotChanges()
            .subscribe(update => {
                this.reviewList = [];
                update.forEach(element => {
                    const rev = element.payload.toJSON();
                    rev['$key'] = element.key;
                    this.reviewList.push(rev as Review);
                });

				this.emotions = this.getEmotions(this.reviewList)
				console.log("DEBUG:", this.reviewList);
				console.log("DEBUG:", this.emotions);
            });

    }

    getEmotions(reviews: Review[]) {
        const emoList = [];

        for (let i = 0; i < reviews.length; i++) {
            const currentEmoji = reviews[i].rating;

			// if we don't find `currentEmoji` in our emote array,
			// add and count
            if (emoList.filter(emote => emote.rating === currentEmoji).length === 0) {
                const count = reviews.filter(emote => emote.rating === currentEmoji).length;
                emoList.push({
                    rating: currentEmoji,
                    value: count,
                });
            }
        }

        return emoList;
    }
}
