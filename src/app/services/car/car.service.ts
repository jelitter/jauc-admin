import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Car } from '../../models/car';
import * as shared from '../../shared/js/shared';

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
      lat: car.lat || shared.randomFromInterval(-90, 90),
      lon: car.lon || shared.randomFromInterval(-180, 180)
    });
  }

  updateCar(car: Car) {
    this.carList.update(car.$key, {
      name: car.name,
      plate: car.plate,
      lat: car.lat || shared.randomFromInterval(-90, 90),
      lon: car.lon || shared.randomFromInterval(-180, 180)
    });
  }

  deleteCar($key: string) {
    this.carList.remove($key);
  }
}

