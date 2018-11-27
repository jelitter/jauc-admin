import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from 'src/app/cars/cars.component';
import { CarDetailComponent } from 'src/app/cars/car-detail/car-detail.component';
import { CarEditComponent } from 'src/app/cars/car-edit/car-edit.component';
import { AddCarComponent } from 'src/app/cars/add-car/add-car.component';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { ReportsComponent } from 'src/app/reports/reports.component';
import { ReviewOverviewComponent } from 'src/app/reports/review/review-overview/review-overview.component';
import { ReviewDetailComponent } from 'src/app/reports/review/review-detail/review-detail.component';
import { ReviewEmoteDetailComponent } from 'src/app/reports/review/review-emote-detail/review-emote-detail.component';

const routes: Routes = [
    {
        path: 'cars',
        component: CarsComponent,
        children: [
            {
                path: ':carId',
                component: CarDetailComponent,
            },{
				path: ':carId/edit',
				component: CarEditComponent
			}, {
				path: 'new',
				component: AddCarComponent
			}

        ],
    },
    {
        path: 'bookings',
        component: BookingsComponent,
    },
    {
        path: 'reports',
        component: ReportsComponent,
		children: [
			{
		        path: 'reviews',
		        component: ReviewOverviewComponent,
		        children: [
		            { path: ':reviewId', component: ReviewDetailComponent },
		            { path: 'emotes/:emoteId', component: ReviewEmoteDetailComponent },
		        ],
    		},
		]
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
