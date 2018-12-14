import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-car-stats',
    templateUrl: './car-stats.component.html',
    styleUrls: ['./car-stats.component.scss'],
})
export class CarStatsComponent implements OnInit {
    public arcValue = 30;

    public avgSpeed = Math.floor(5 + Math.random() * 30);
    constructor() {}

    ngOnInit() {
        interval(1500)
            .pipe(map(data => this.getRandomAvgSpeed()))
            .subscribe(data => {
                this.avgSpeed = data;
            });
    }

    getRandomAvgSpeed() {
        let increment = Math.floor(Math.random() * 5) + 1;
        increment *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
        return this.avgSpeed > 60 ? 60 : this.avgSpeed < 1 ? 1 : this.avgSpeed + increment;
    }
}
