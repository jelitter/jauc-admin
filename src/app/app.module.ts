import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';

// Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

// Components
import { AppComponent } from './app.component';
import { CarComponent } from './components/cars/car/car.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { CarsComponent } from './components/cars/cars.component';
import { LoginComponent } from './components/login/login.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Services
import { CarService } from './services/car/car.service';
import { BookingService } from './services/booking/booking.service';
import { UserService } from './services/user/user.service';
import { MapService } from './services/map/map.service';
import { HeaderAreaComponent } from './header-area/header-area.component';
import { CarListTemplateComponent } from './components/car-list-template/car-list-template.component';
import { LoginTemplateComponent } from './components/login-template/login-template.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginTemplateComponent },
  { path: 'vehicles/:id', component: CarComponent },
  {
    path: 'vehicles',
    component: CarListTemplateComponent,
    data: { title: 'Car List' },
  },
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    CarsComponent,
    CarComponent,
    CarListComponent,
    LoginComponent,
    LoginDialogComponent,
    PageNotFoundComponent,
    HeaderAreaComponent,
    CarListTemplateComponent,
    LoginTemplateComponent,
  ],
  entryComponents: [LoginDialogComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [Title, CarService, BookingService, UserService, MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
