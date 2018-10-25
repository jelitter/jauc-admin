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
      lat: car.lat || randomFromInterval(-90, 90),
      lon: car.lon || randomFromInterval(-180, 180)
    });
  }

  updateCar(car: Car) {
    console.log('updating car');
    console.log(car);

    this.carList.update(car.$key, {
      name: car.name,
      plate: car.plate,
      lat: car.lat || randomFromInterval(-90, 90),
      lon: car.lon || randomFromInterval(-180, 180)
    });
  }

  deleteCar($key: string) {
    this.carList.remove($key);
  }
}

function randomFromInterval(min, max) {
  return (Math.random() * (max - min + 1) + min).toFixed(6);
}
