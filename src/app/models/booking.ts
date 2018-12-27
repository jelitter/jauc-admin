import { Review } from './review';
import { Location } from './location';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from './invoice';

export class Booking {
    $key: string;
    userId: string;
    userName: string = null;
    carId: string = null;
    carName: string = null;
    invoiceId: string = null;
    origin: Location;
    destination: Location;
    approvedBy: string = null;
    date: Date;
    review: Review;

    constructor() {}
}
