import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-car-map',
  template: `
    <mat-card id="map-container"> <div id="track-map"></div> </mat-card>
  `,
  styles: ['#map-container { height: 100%; } ', '#track-map { height: 100%; }']
})
export class CarMapComponent implements OnInit {
  constructor(private map: MapService) {}

  ngOnInit() {
    this.map.initializeMap();
  }
}
