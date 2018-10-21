import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'jauc-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carList: Car[];
  displayedColumns: string[] = ['name', 'plate', 'lat', 'lon'];
  dataSource;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private carService: CarService, private toastr: ToastrService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Car>(this.carList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.carService
      .getCars()
      .snapshotChanges()
      .subscribe(item => {
        this.carList = [];
        item.forEach(element => {
          let c = element.payload.toJSON();
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
