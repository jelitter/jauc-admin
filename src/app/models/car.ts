import { Location } from './location';

export class Car {
    $key: string;
    carId?: string;
    name: string;
    plate: string;
    location: Location;
    currentBookingId: string;
}
