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
            .subscribe(item => {
                this.reviewList = [];
                item.forEach(element => {
                    const rev = element.payload.toJSON();
                    rev['$key'] = element.key;
                    this.reviewList.push(rev as Review);
                });

                this.emotions = this.getEmotions(this.reviewList);
            });
    }

    getEmotions(reviews: Review[]) {
        const emoList = [];

        for (let i = 0; i < reviews.length; i++) {
            const currentEmoji = reviews[i].rating;

            if (!emoList.filter(emote => emote === currentEmoji)) {
                const count = emoList.filter(emote => emote.rating === currentEmoji).length;
                console.log('DEBUG: Emoji', currentEmoji);
                console.log('DEBUG: Emoji C', count);
                emoList.push({
                    rating: currentEmoji,
                    value: count,
                });
            }
        }

        return emoList;
    }
}
