import { Review } from './review';
import { Location } from './location';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from './invoice';

export class Booking {
    $key: string;
    userId: string;
    carId: string;
    invoiceId: string = null;
    origin: Location;
    destination: Location;
    approvedBy: string = null;
    review: Review;

    constructor() {}
}
