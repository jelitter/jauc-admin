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
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';
import { MapService } from 'src/app/services/map.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';

// Components
import { AddCarComponent } from 'src/app/cars/add-car/add-car.component';
import { AppComponent } from './app.component';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { CarsComponent } from 'src/app/cars/cars.component';
import { CarDetailComponent } from 'src/app/cars/car-detail/car-detail.component';
import { CarEditComponent } from 'src/app/cars/car-edit/car-edit.component';
import { CarListComponent } from 'src/app/cars/car-list/car-list.component';
import { CarStatsComponent } from '../cars/car-stats/car-stats.component';
import { CarMapComponent } from 'src/app/cars/car-map/car-map.component';
import { FooterComponent } from 'src/app/footer/footer/footer.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ReportsComponent } from 'src/app/reports/reports.component';
import { DashboardComponent } from 'src/_sample-components/dashboard/dashboard.component';
import { ReviewOverviewComponent } from 'src/app/reports/review/review-overview/review-overview.component';
import { ReviewTableComponent } from 'src/app/reports/review/review-table/reviewtable.component';
import { ReviewDetailComponent } from 'src/app/reports/review/review-detail/review-detail.component';
import { ReviewEmoteDetailComponent } from 'src/app/reports/review/review-emote-detail/review-emote-detail.component';
import { ReviewChartComponent } from 'src/app/reports/review/review-chart/review-chart.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

// Kendo
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
    declarations: [
        AddCarComponent,
        AppComponent,
        NavbarComponent,
        BookingsComponent,
        CarsComponent,
        CarListComponent,
        CarDetailComponent,
        CarEditComponent,
        CarMapComponent,
        CarStatsComponent,
        FooterComponent,
        LoginComponent,
        ReportsComponent,
        DashboardComponent,
        ReviewOverviewComponent,
        ReviewDetailComponent,
        ReviewEmoteDetailComponent,
        ReviewChartComponent,
        ReviewTableComponent,
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ButtonsModule,
        ChartsModule,
        CommonModule,
        DialogsModule,
        FormsModule,
        GaugesModule,
        MaterialModule,
        NgbModule,
        PrimeNgModule,
        ReactiveFormsModule,
    ],
    providers: [UserService, CarService, BookingService, MapService, ReviewService, ToasterService],
    bootstrap: [AppComponent],
})
export class AppModule {}
