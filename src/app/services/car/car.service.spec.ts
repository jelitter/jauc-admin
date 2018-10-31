import { TestBed, inject } from '@angular/core/testing';
import { Car } from '../../models/car';
import { Location } from '../../models/location';

import { Observable, of } from 'rxjs';
import { CarService } from './car.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

const fixtureCars: Car[] = [
    {
        $key: '1',
        name: 'Toyota Avensis',
        plate: '17-34112-TS',
        location: new Location(51.905788, -8.568095)
    },
    {
        $key: '2',
        name: 'Optimus',
        plate: 'XX-2018-ZZ',
        location: new Location(0, 0)
    },
    {
        $key: '3',
        name: 'Renault 19',
        plate: 'ZX-2312-90',
        location: new Location(51.905788, -8.568095)
    }
];

const angularFireDatabaseStub = {
    list: () => {}
    /*     update: (car: Car) => {
        const carList = this.list();
        for (let i = 0; i <= carList.length; i++) {
            if (carList[i].$key === car.$key) {
                carList[i] = car;
            }
        }
    } */
};
const mockCars$ = {
    valueChanges() {
        return of(fixtureCars);
    }
};

describe('CarService', () => {
    beforeEach(() => {
        spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockCars$);
        TestBed.configureTestingModule({
            providers: [CarService, { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }]
        });
    });

    it('should be created', inject([CarService], (service: CarService) => {
        expect(service).toBeTruthy();
    }));

    it('getAll should get you the full list of cars', inject([CarService], (service: CarService) => {
        const cars$ = service.getCars();
        cars$.valueChanges().subscribe((cars: Car[]) => {
            expect(cars[0].plate).toEqual(fixtureCars[0].plate);
            expect(cars.length).toBe(3);
        });
    }));

    /*     it('updateCar should update a single car', inject([CarService], (service: CarService) => {
        const changes = {
            $key: '1',
            name: 'New Car',
            plate: 'New Plate',
            location: new Location(-1, -1)
        };

        service.updateCar(changes);

        const cars$ = service.getCars();
        cars$.valueChanges().subscribe((cars: Car[]) => {
            expect(cars[0].plate).toEqual(fixtureCars[0].plate);
            expect(cars.length).toBe(3);
        });
    })); */
});
