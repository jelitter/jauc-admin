import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'jauc-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carNameFormControl = new FormControl('', [Validators.required, Validators.min(3)]);
  carPlateFormControl = new FormControl('', [Validators.required, Validators.min(3)]);

  matcher = new MyErrorStateMatcher();

  constructor(private carService: CarService, private toastr: ToastrService) {}

  ngOnInit() {
    this.carService.getCars();
    this.resetForm();
  }

  onSubmit(carForm: NgForm) {
    if (carForm.value.$key == null) {
      this.carService.addCar(carForm.value);
      this.toastr.success('Car Added', '🚗 Success!');
    } else {
      this.carService.updateCar(carForm.value);
      this.toastr.success('Car Updated', '🚗 Success!');
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
