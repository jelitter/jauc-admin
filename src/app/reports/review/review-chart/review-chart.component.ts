import { ReviewService } from 'src/app/services/review.service';
import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-review-emote-chart',
    templateUrl: './review-chart.component.html',
    styleUrls: ['./review-chart.component.css'],
})
export class ReviewChartComponent implements OnInit {
    public reviewList: Review[];
    public emotions: Object[];

    constructor(private reviews: ReviewService) {}

    ngOnInit() {
        this.reviews
            .getReviews()
            .snapshotChanges()
            .subscribe(update => {
                this.reviewList = this.getReviews(update);
                this.emotions = this.getEmotions(this.reviewList);
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

    getEmotions(reviews: Review[]) {
        const emoList = [];

        for (let i = 0; i < reviews.length; i++) {
            const currentEmoji = reviews[i].rating;

            // if we don't find `currentEmoji` in our emote array,
            // add and count; otherwise skip (we got this one already!)
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
