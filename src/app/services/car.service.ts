import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Car } from '../models/car';

@Injectable()
export class CarService {
  carList: AngularFireList<any>;
  selectedCar: Car = new Car();

  constructor(private firebase: AngularFireDatabase) {}

  getCars() {
    return (this.carList = this.firebase.list('cars'));
  }

  addCar(car: Car) {
    this.carList.push({
      name: car.name,
      plate: car.plate,
      lat: 0,
      lon: 0
    });
  }

  updateCar(car: Car) {
    this.carList.update(car.$key, {
      name: car.name,
      plate: car.plate,
      lat: car.lat || 0,
      lon: car.lon || 0
    });
  }

  deleteCar($key: string) {
    this.carList.remove($key);
  }
}
