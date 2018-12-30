import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { MapService } from 'src/app/services/map.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
    carList: Car[];
    displayedColumns: string[] = ['actions', 'name', 'plate', 'location', 'booking'];

    constructor(private carService: CarService, private toastr: ToasterService, private map: MapService) {}

    ngOnInit() {
        // this.map.initializeMap();
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
        this.map.closePopup(this.carService.selectedCar);
        this.carService.selectedCar = Object.assign({}, car); // disabling double data binding
        this.map.panTo(this.carService.selectedCar);
        this.map.openPopup(this.carService.selectedCar);

        this.map.addRoute(this.carService.selectedCar.location, { lat: 51.8981696, lon: -8.4869786 });
        //       private defaultLat = 51.8981696;
        // private defaultLon = -8.4869786;
    }

    onDelete(car: Car) {
        this.map.panTo(car);
        this.map.openPopup(car);
        setTimeout(() => {
            if (confirm(`💀 Are you sure to remove '${car.name}'? `)) {
                this.carService.deleteCar(car);
                this.map.removeCar(car);
                // this.toastr.success('Car removed', '🚗 Success!');
                this.toastr.showToast('Car removed', '🚗 Success!');
            } else {
                // this.toastr.info('🚗 Live another day', 'Phew!');
                this.toastr.showToast('🚗 Live another day', 'Phew!');
            }
            this.map.center();
        }, 200);
    }

    welcomeToast() {
        // this.toastr.success(
        this.toastr.showToast('Welcome to the Admin Panel', 'JAUC Cars');
    }
}
