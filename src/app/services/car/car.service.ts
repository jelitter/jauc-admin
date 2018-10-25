import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Car } from '../../models/car';
import {Location} from '../../models/location';
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
    const newLat = shared.randomFromInterval(-90, 90);
    const newLon = shared.randomFromInterval(-180, 180);

    this.carList.push({
      name: car.name,
      plate: car.plate,
      location: car.location || new Location(newLat, newLon)
    });
  }

  updateCar(car: Car) {
    const newLat = shared.randomFromInterval(-90, 90);
    const newLon = shared.randomFromInterval(-180, 180);

    this.carList.update(car.$key, {
      name: car.name,
      plate: car.plate,
      location: car.location || new Location(newLat, newLon)
    });
  }

  deleteCar($key: string) {
    this.carList.remove($key);
  }
}

