import L from 'leaflet';
import { environment } from 'src/environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnInit {
  private defaultZoom = 13;
  private defaultLat = 51.8981696;
  private defaultLon = -8.4869786;
  icon: any;
  map: any;
  carMarkerList: Array<any>;

  constructor(private carService: CarService) {
    this.carMarkerList = [];
  }

  ngOnInit(): void {
    this.carMarkerList = [];
  }

  loadCars() {
    this.carService
      .getCars()
      .snapshotChanges()
      .subscribe(item => {
        item.forEach(element => {
          const c = element.payload.toJSON();
          c['$key'] = element.key;
          this.carMarkerList.push({
            car: c as Car,
            marker: null,
          });
        });

        this.updateMarkers();
      });
  }

  initializeMap() {
    const { mapboxKey } = environment.mapbox;
    this.icon = L.icon({
      iconUrl: '/assets/car.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    const url = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxKey}`;

    this.map = L.map('track-map', {
      center: [this.defaultLat, this.defaultLon],
      zoom: this.defaultZoom,
    });

    L.tileLayer(url, {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapboxKey,
    }).addTo(this.map);
  }

  center() {
    this.map.panTo([this.defaultLat, this.defaultLon]);
  }

  updateMarkers() {
    this.carMarkerList.forEach(c => {
      if (c.marker == null) {
        c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        c.marker.bindPopup(`<b>${c.car.name}</b><br>${c.car.plate}`);
        c.marker.addTo(this.map);
      } else {
        c.marker.remove();
        c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        console.log('marker moved');
      }
    });
  }

  openPopup(car: any): any {
    this.carMarkerList.find(cm => cm.car.$key === car.$key).marker.openPopup();
  }

  panTo(car: Car) {
    this.map.panTo([car.location.lat, car.location.lon]);
  }

  removeCar(car: Car): any {
    this.carMarkerList.find(cm => cm.car.$key === car.$key).marker.remove();
    this.carMarkerList = this.carMarkerList.filter(cm => cm.car.$key !== car.$key);
  }
}
