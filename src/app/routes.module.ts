// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

// Route elements
import { CarListTemplateComponent } from './components/cars/car-list-template/car-list-template.component';
import { CarComponent } from './components/cars/car/car.component';
import { CarEditComponent } from './components/cars/car-edit/car-edit.component';
import { LoginTemplateComponent } from './components/login/login-template/login-template.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Route definition
const appRoutes: Routes = [
  { path: 'login', component: LoginTemplateComponent },
  { path: 'vehicles', component: CarListTemplateComponent, children: [
    { path: ':id', component: CarComponent },
    { path: ':id/edit', component: CarEditComponent },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }), // DEBUG: Tracing
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
