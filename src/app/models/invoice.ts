import { Settlement } from './settlement';

export class Invoice {
    $key: string;

    public paid: Boolean = false;
    public settlements: Settlement[];

    constructor(public bookingId: string, public price: number) {}
}
