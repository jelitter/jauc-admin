import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from '../cars/cars.component';
import { BookingsComponent } from '../bookings/bookings.component';
import { ReportsComponent } from '../reports/reports.component';
import { DashboardComponent } from 'src/_sample-components/dashboard/dashboard.component';
import { ReviewTableComponent } from 'src/app/reports/review/review-table/reviewtable.component';
import { ReviewOverviewComponent } from 'src/app/reports/review/review-overview/review-overview.component';
import { ReviewDetailComponent } from 'src/app/reports/review/review-detail/review-detail.component';

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
        path: 'reports/reviews',
        component: ReviewOverviewComponent,
        children: [{ path: ':reviewId', component: ReviewDetailComponent }],
    },
    {
        path: 'test dashboard',
        component: DashboardComponent,
    },
    {
        path: 'test  table',
        component: ReviewTableComponent,
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
