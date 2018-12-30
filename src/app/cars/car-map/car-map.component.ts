import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { Booking } from 'src/app/models/booking';

@Component({
    selector: 'app-car-map',
    template: `
        <mat-card id="map-container" class="car-map"> <div id="track-map"></div> </mat-card>
    `,
    styles: ['#map-container { padding: 1em; height: 100%; } ', '#track-map { height: 100%; }'],
})
export class CarMapComponent implements OnInit, OnChanges {
    constructor(private map: MapService) {}

    @Input() booking: Booking;

    ngOnInit() {
        this.map.initializeMap(this.booking);
    }

    ngOnChanges(changes: SimpleChanges) {
        const booking: SimpleChange = changes.booking;
        // console.log('booking change: ', booking);

        // console.log(this.booking);

        const currentBooking = booking.currentValue as Booking;

        if (currentBooking && currentBooking.origin) {
            // console.log(`displaying booking`, this.booking.$key);

            this.map.addRoute(this.booking.origin, this.booking.destination);
        }
    }
}
