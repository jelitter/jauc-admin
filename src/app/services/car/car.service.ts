import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
    DatabaseSnapshot,
    AngularFireAction,
    AngularFireObject,
} from '@angular/fire/database';
import { Car } from '../../models/car';
import { Location } from '../../models/location';
import 'rxjs/add/operator/take';
import { randomCorkCoords } from '../../shared/js/shared';
import { Observable } from 'rxjs';

@Injectable()
export class CarService {
    carList: AngularFireList<any>;
    selectedCar: Car = new Car();

    constructor(private firebase: AngularFireDatabase) {}

    getCars() {
        return (this.carList = this.firebase.list('cars'));
    }

    addCar(car: Car) {
        const { lat, lon } = randomCorkCoords();

        this.carList.push({
            name: car.name,
            plate: car.plate,
            location: new Location(lat, lon),
        });
    }

    updateCar(car: Car): Car {
        const { lat, lon } = randomCorkCoords();
        const updatedCar = {
            name: car.name,
            plate: car.plate,
            location: new Location(lat, lon),
        };
        this.carList.update(car.$key, updatedCar);
        return { $key: car.$key, ...updatedCar };
    }

    deleteCar(car: Car) {
        this.carList.remove(car.$key);
    }
}
