import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { MapService } from 'src/app/services/map.service';
import { ErrorStateMatcher } from '@angular/material';
import { Car } from 'src/app/models/car';
import { ToasterService } from './../../services/toaster.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-add-car',
    templateUrl: './add-car.component.html',
    styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
    carNameFormControl = new FormControl('', [Validators.required, Validators.min(3)]);
    carPlateFormControl = new FormControl('', [Validators.required, Validators.min(3)]);

    matcher = new MyErrorStateMatcher();

    constructor(public carService: CarService, private toaster: ToasterService, private mapService: MapService) {}

    ngOnInit() {
        this.resetForm();
    }

    onSubmit(carForm: NgForm) {
        if (carForm.value.$key == null) {
            this.carService.addCar(carForm.value);
            // this.toaster.success('Car Added', '🚗 Success!');
            this.toaster.showToast('Car Added', '🚗 Success!');
        } else {
            this.carService.updateCar(carForm.value);
            // this.toaster.success('Car Updated', '🚗 Success!');
            this.toaster.showToast('Car Updated', '🚗 Success!');
        }
        this.resetForm(carForm);
    }

    resetForm(carForm?: NgForm) {
        if (carForm != null) {
            carForm.reset();
            this.carService.selectedCar = new Car();
        }
    }
}
