import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarService } from './car.service';
import { Car } from '../models/car';
import { Location } from '../models/location';

// import L from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Booking } from '../models/booking';
// import 'leaflet-easybutton';
// declare var L: any;

@Injectable({
    providedIn: 'root',
})
export class MapService implements OnInit {
    private defaultZoom = 13;
    private defaultLat = 51.8981696;
    private defaultLon = -8.4869786;
    icon: any;
    iconArduino: any;
    map: any;
    carMarkerList: Array<any>;
    routingControl: any = null;

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
                this.carMarkerList.forEach(cm => {
                    this.map.removeLayer(cm.marker);
                });
                this.carMarkerList = [];

                const boundA: Location = new Location(Infinity, Infinity);
                const boundB: Location = new Location(-180, -90);

                item.forEach(element => {
                    const car: Car = <Car>element.payload.toJSON();
                    car['$key'] = element.key;

                    const marker = L.marker([car.location.lat, car.location.lon], {
                        icon: car.name && car.name.toLowerCase().match('arduino') ? this.iconArduino : this.icon,
                        riseOnHover: true,
                    });
                    marker.bindPopup(`<b>${car.name}</b><br>${car.plate}`);
                    marker.addTo(this.map);

                    this.carMarkerList.push({
                        car,
                        marker,
                    });

                    if (boundA.lat > car.location.lat) {
                        boundA.lat = car.location.lat;
                    }
                    if (boundA.lon > car.location.lon) {
                        boundA.lon = car.location.lon;
                    }
                    if (boundB.lat < car.location.lat) {
                        boundB.lat = car.location.lat;
                    }
                    if (boundB.lon < car.location.lon) {
                        boundB.lon = car.location.lon;
                    }
                });
                this.map.fitBounds([[boundA.lat, boundA.lon], [boundB.lat, boundB.lon]]);
            });
    }

    initializeMap(booking: Booking = null) {
        if (booking) {
            console.log(`Initialize Map with Booking`, booking);
        }

        const { mapboxKey } = environment.mapbox;
        this.icon = L.icon({
            iconUrl: '/assets/car.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
        });
        this.iconArduino = L.icon({
            iconUrl: '/assets/car-arduino.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
        });

        // const url = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxKey}`;
        const url = `http://{s}.tile.osm.org/{z}/{x}/{y}.png`;

        this.map = L.map('track-map');
        // this.map = L.map('track-map', {
        //     center: [this.defaultLat, this.defaultLon],
        //     zoom: this.defaultZoom,
        // }).setView([this.defaultLat, this.defaultLon], 16);

        L.tileLayer(url, {
            attribution: ``,
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
    }

    openPopup(car: Car): any {
        const foundCar = this.carMarkerList.find(cm => cm.car.$key === car.$key);
        if (foundCar) {
            foundCar.marker.openPopup();
        }
    }

    closePopup(car: Car): any {
        const foundCar = this.carMarkerList.find(cm => cm.car.$key === car.$key);
        if (foundCar) {
            foundCar.marker.remove();
        }
    }

    panTo(location: Location) {
        this.map.panTo([location.lat, location.lon]);
    }

    removeCar(car: Car): any {
        this.closePopup(car);
        this.carMarkerList = this.carMarkerList.filter(cm => cm.car.$key !== car.$key);
    }

    setRoute(origin: Location, destination: Location) {
        const waypoints = [L.latLng(origin.lat, origin.lon), L.latLng(destination.lat, destination.lon)];
        this.map.fitBounds([[origin.lat, origin.lon], [destination.lat, destination.lon]]);
        this.map.panTo(origin);

        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
            this.routingControl = null;
            // this.routingControl.getPlan().setWaypoints(waypoints);
        }

        this.routingControl = L.Routing.control({
            waypoints,
            router: new L.Routing.osrmv1({
                language: 'en',
                profile: 'car',
            }),
            routeWhileDragging: true,
            // geocoder: L.Control.Geocoder.nominatim({}),

            // show: true,
            // autoRoute: true,
        });

        this.routingControl.addTo(this.map);

        // this.routingControl.setWaypoints([L.latLng(origin.lat, origin.lon), L.latLng(destination.lat, destination.lon)]);
    }
}
