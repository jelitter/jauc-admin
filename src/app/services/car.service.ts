import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Car } from '../models/car';
import { Location } from '../models/location';
import 'rxjs/add/operator/take';
import { randomCorkCoords } from './shared';

@Injectable()
export class CarService {
    carList: AngularFireList<any>;
    selectedCar: Car = new Car();

    constructor(private firebase: AngularFireDatabase) {
        this.carList = this.firebase.list('cars');
    }

    getCars() {
        // return (this.carList = this.firebase.list('cars'));
        return this.carList;
    }

    addCar(car: Car) {
        const { lat, lon } = randomCorkCoords();

        this.carList.push({
            name: car.name,
            plate: car.plate,
            location: new Location(lat, lon),
        });
    }

    updateCar(car: Car) {
        car.location = randomCorkCoords();
        this.updateCarToDB(car);
    }

    updateCarToDB(car: Car) {
        const key = car.$key;
        delete car.$key;

        this.carList.update(key, car);
    }

    deleteCar(car: Car) {
        this.carList.remove(car.$key);
    }

    getAvailableCar() {
        return this.firebase
            .list('cars')
            .valueChanges()
            .take(1)
            .toPromise();
    }
}
