import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';
import { Car } from 'src/app/models/car';
import L from 'leaflet';
import { environment } from './../../../../environments/environment';

@Component({
    selector: 'jauc-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
    carList: Car[];
    carMarkerList: Array<any>;
    map: any;
    icon: any;

    constructor(private carService: CarService, private toastr: ToastrService) {}

    ngOnInit() {
        this.initializeMap();
        this.carService
            .getCars()
            .snapshotChanges()
            .subscribe(item => {
                this.carList = [];
                this.carMarkerList = [];
                item.forEach(element => {
                    const c = element.payload.toJSON();
                    c['$key'] = element.key;
                    this.carList.push(c as Car);
                    this.carMarkerList.push({
                        car: c as Car,
                        marker: null,
                    });
                });

                this.updateMarkers();
            });
    }

    onEdit(car: Car) {
        this.carService.selectedCar = Object.assign({}, car); // disabling double data binding

        // Pane map to car location
        this.map.panTo([car.location.lat, car.location.lon]);

        // Open car popup
        this.carMarkerList.find(cm => cm.car.$key === car.$key).marker.openPopup();
    }

    onDelete(car: Car) {
        if (confirm(`💀 Are you sure to remove '${car.name}'? `)) {
            this.carService.deleteCar(car.$key);

            // Remove marker from map and list
            this.carMarkerList.find(cm => cm.car.$key === car.$key).marker.remove();
            this.carMarkerList = this.carMarkerList.filter(cm => cm.car.$key !== car.$key);

            this.toastr.success('Car removed', '🚗 Success!');
        } else {
            this.toastr.info('🚗 Live another day', 'Phew!');
        }
    }

    private initializeMap() {
        const { mapboxKey } = environment.mapbox;

        const shadowIcon = '/marker-shadow.png';

        this.icon = L.icon({
            // iconUrl: '/assets/location.png',
            iconUrl: '/assets/car.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
        });

        const zoom = 13;
        const lat = 51.8981696;
        const lon = -8.4869786;
        const url = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxKey}`;

        this.map = L.map('track-map', {
            center: [lat, lon],
            zoom,
        });

        L.tileLayer(url, {
            // attribution:
            //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: mapboxKey,
        }).addTo(this.map);

        L.popup({ autoClose: true })
            .setLatLng([lat, lon])
            .setContent(
                `
        <h4>Welcome to the Admin Panel</h4>
        <p>Click on the <b>Edit</b> button on a car to show it on the map.
      `
            )
            .openOn(this.map);
    }

    updateMarkers() {
        this.carMarkerList.forEach(c => {
            if (c.marker == null) {
                c.marker = L.marker([c.car.location.lat, c.car.location.lon], { icon: this.icon, riseOnHover: true });
                c.marker.bindPopup(`<b>${c.car.name}</b><br>${c.car.plate}`);
                c.marker.addTo(this.map);
            } else {
                c.marker.setLatLng(c.car.location.lat, c.car.location.lon);
            }
        });
    }
}
