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
import { InvoiceService } from '../services/invoice.service';
import { MapService } from 'src/app/services/map.service';
import { ReviewService } from 'src/app/services/review.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { SupportService } from '../services/support.service';

// Components
import { AddCarComponent } from 'src/app/cars/add-car/add-car.component';
import { AppComponent } from './app.component';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { CarListComponent } from 'src/app/cars/car-list/car-list.component';
import { CarMapComponent } from 'src/app/cars/car-map/car-map.component';
import { CarsComponent } from 'src/app/cars/cars.component';
import { CarStatsComponent } from 'src/app/cars/car-stats/car-stats.component';
import { DashboardComponent } from 'src/app/reports/dashboard/dashboard.component';
import { FooterComponent } from 'src/app/footer/footer/footer.component';
import { InvoiceReportComponent } from 'src/app/reports/invoice-report/invoice-report.component';
import { LoginComponent } from 'src/app/login/login.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ReportsComponent } from 'src/app/reports/reports.component';
import { ReviewChartComponent } from 'src/app/reports/review/review-chart/review-chart.component';
import { ReviewDetailComponent } from 'src/app/reports/review/review-detail/review-detail.component';
import { ReviewEmoteDetailComponent } from 'src/app/reports/review/review-emote-detail/review-emote-detail.component';
import { ReviewOverviewComponent } from 'src/app/reports/review/review-overview/review-overview.component';
import { ReviewTableComponent } from 'src/app/reports/review/review-table/reviewtable.component';
import { SupportComponent } from '../support/support.component';

// Kendo
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { ChartsModule } from '@progress/kendo-angular-charts';

// Quill
import { QuillModule } from 'ngx-quill';

import 'hammerjs';

@NgModule({
    declarations: [
        AddCarComponent,
        AppComponent,
        NavbarComponent,
        BookingsComponent,
        CarsComponent,
        CarListComponent,
        CarMapComponent,
        CarStatsComponent,
				DashboardComponent,
        FooterComponent,
        LoginComponent,
        InvoiceReportComponent,
        ReportsComponent,
        ReviewOverviewComponent,
        ReviewDetailComponent,
        ReviewEmoteDetailComponent,
        ReviewChartComponent,
        ReviewTableComponent,
        SupportComponent,
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ChartsModule,
        CommonModule,
        FormsModule,
        GaugesModule,
        MaterialModule,
        NgbModule,
        PrimeNgModule,
        QuillModule,
        ReactiveFormsModule,
    ],
    providers: [
        BookingService,
        CarService,
        InvoiceService,
        MapService,
        ReviewService,
        SupportService,
        ToasterService,
        UserService,
    ],
    entryComponents: [CarsComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
