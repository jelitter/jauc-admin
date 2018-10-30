import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Car } from '../../models/car';
import * as shared from '../../shared/js/shared';
import { CarService } from '../car/car.service';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }
}
