import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

// Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Fire
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

// Angular Material
import { MaterialModule } from './material.module';

// PrimeNG
import { PrimeNgModule } from './primeng.module';

// Services
import { CarService } from '../services/car.service';
import { MapService } from './../services/map.service';
import { ToasterService } from '../services/toaster.service';
import { UserService } from '../services/user.service';

// Components
import { AddCarComponent } from '../cars/add-car/add-car.component';
import { AppComponent } from './app.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { CarsComponent } from '../cars/cars.component';
import { CarListComponent } from '../cars/car-list/car-list.component';
import { CarMapComponent } from '../cars/car-map/car-map.component';
import { LoginComponent } from '../login/login.component';
import { ReportsComponent } from '../reports/reports.component';
import { DashboardComponent } from 'src/_sample-components/dashboard/dashboard.component';
import { TableComponent } from 'src/_sample-components/table/table.component';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
    declarations: [
        AddCarComponent,
        AppComponent,
        NavbarComponent,
        BookingsComponent,
        CarsComponent,
        CarListComponent,
        CarMapComponent,
        LoginComponent,
        ReportsComponent,
        DashboardComponent,
        TableComponent,
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        PrimeNgModule,
        MaterialModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    providers: [UserService, CarService, MapService, ToasterService],
    bootstrap: [AppComponent],
})
export class AppModule {}
