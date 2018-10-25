import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'jauc-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carList: Car[];

  constructor(private carService: CarService, private toastr: ToastrService) {}

  ngOnInit() {
    this.carService
      .getCars()
      .snapshotChanges()
      .subscribe(item => {
        this.carList = [];
        item.forEach(element => {
          const c = element.payload.toJSON();
          c['$key'] = element.key;
          this.carList.push(c as Car);
        });
      });
  }

  onEdit(car: Car) {
    this.carService.selectedCar = Object.assign({}, car); // disabling double data binding
  }

  onDelete($key: string) {
    if (confirm('💀 Are you sure to remove this car?')) {
      this.carService.deleteCar($key);
      this.toastr.success('Car removed', '🚗 Success!');
    } else {
      this.toastr.info('🚗 Live another day', 'Phew!');
    }
  }
}
