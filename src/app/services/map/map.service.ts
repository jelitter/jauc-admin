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
                    const car: Car = <Car>element.payload.toJSON();
                    car['$key'] = element.key;

                    let marker = L.marker([car.location.lat, car.location.lon], { icon: this.icon, riseOnHover: true });
                    marker.bindPopup(`<b>${car.name}</b><br>${car.plate}`);
                    marker.addTo(this.map);

                    this.carMarkerList.push({
                        car,
                        marker,
                    });
                });

                // this.updateMarkers();
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
            c.marker.setLatLng([c.car.location.lat, c.car.location.lon]);
        });

        // this.carMarkerList = this.carMarkerList.map(c => {
        //     if (c.marker) {
        //         c.marker.remove();
        //     }
        //     c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        //     c.marker.bindPopup(`<b>${c.car.name}</b><br>${c.car.plate}`);
        //     c.marker.addTo(this.map);
        // });

        // this.carMarkerList.forEach(c => {
        // if (c.marker === null) {
        //     // c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        //     // c.marker.bindPopup(`<b>${c.car.name}</b><br>${c.car.plate}`);
        //     // c.marker.addTo(this.map);
        // } else {
        //     c.marker.remove();
        //     // c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        //     // console.log('marker moved');
        // }
        //     c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
        //     c.marker.bindPopup(`<b>${c.car.name}</b><br>${c.car.plate}`);
        //     c.marker.addTo(this.map);
        // });
    }

    openPopup(car: Car): any {
        let foundCar = this.carMarkerList.find(cm => cm.car.$key === car.$key);
        if (foundCar) {
            foundCar.marker.openPopup();
        }
    }

    closePopup(car: Car): any {
        let foundCar = this.carMarkerList.find(cm => cm.car.$key === car.$key);
        if (foundCar) {
            foundCar.marker.remove();
        }
    }

    panTo(car: Car) {
        this.map.panTo([car.location.lat, car.location.lon]);
    }

    removeCar(car: Car): any {
        // this.carMarkerList.find(cm => cm.car.$key === car.$key).marker.remove();
        this.closePopup(car);
        this.carMarkerList = this.carMarkerList.filter(cm => cm.car.$key !== car.$key);
    }
}
