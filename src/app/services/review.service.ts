import { map } from 'rxjs/operators';
import { Review } from 'src/app/models/review';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {
    data: AngularFireList<any>;
    count: Observable<number>;

    constructor(private firebase: AngularFireDatabase) {}

    getReviews() {
        return (this.data = this.firebase.list('reviews'));
    }

    addReview(review: Review) {
        this.data.push(review);
    }

    updateReview(key, review: Review) {
      this.data.update(key, review);
    }

    deleteReview(key) {
      this.data.remove(key);
    }
}
