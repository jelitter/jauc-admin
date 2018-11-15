import { Review } from './review';
import { Location } from './location';

export class Booking {
  $key: string;
  userId: string;
  carId: string;
  invoiceId: string;
  origin: Location;
  destination: Location;
  approvedBy: string;
  reviews: Array<Review>;
}
