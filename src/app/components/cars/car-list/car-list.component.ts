import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
    carList: Car[];

    constructor(private carService: CarService, private toastr: ToastrService, private map: MapService) {}

    ngOnInit() {
        this.map.initializeMap();
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
                this.map.loadCars();
                this.welcomeToast();
            });
    }

    onEdit(car: Car) {
        this.carService.selectedCar = Object.assign({}, car); // disabling double data binding
        this.map.panTo(this.carService.selectedCar);
        this.map.openPopup(this.carService.selectedCar);
    }

    onDelete(car: Car) {
        this.map.panTo(car);
        this.map.openPopup(car);
        setTimeout(() => {
            if (confirm(`💀 Are you sure to remove '${car.name}'? `)) {
                this.carService.deleteCar(car);
                this.map.removeCar(car);
                this.toastr.success('Car removed', '🚗 Success!');
            } else {
                this.toastr.info('🚗 Live another day', 'Phew!');
            }
            this.map.center();
        }, 200);
    }

    welcomeToast() {
        this.toastr.success(
            'Click on the <b>Edit</b> button on a car to show it on the map',
            'Welcome to the Admin Panel',
            {
                timeOut: 10000,
                enableHtml: true,
                progressBar: true,
                positionClass: 'toast-top-center',
                closeButton: true,
            }
        );
    }
}
