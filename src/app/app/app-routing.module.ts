import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from '../cars/cars.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { ReportsComponent } from '../reports/reports.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'cars',
        component: CarsComponent,
    },
    {
        path: 'bookings',
        component: BookingsComponent,
    },
    {
        path: 'reports',
        component: ReportsComponent,
    },
    {
        path: 'test dashboard',
        component: DashboardComponent,
    },
    {
        path: '**',
        redirectTo: 'cars',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
