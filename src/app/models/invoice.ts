import { Settlement } from './settlement';

export class Invoice {
    $key: string;

    public settlements: Settlement[];

    constructor(public bookingId: string, public price: number) {}
}
