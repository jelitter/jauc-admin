import { Booking } from '../models/booking';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, of as observableOf, merge } from 'rxjs';

export class BookingDataSource extends DataSource<Booking> {
    constructor(private paginator: MatPaginator, private sort: MatSort, public bookings: Array<Booking>) {
        super();
    }

    connect(): Observable<Booking[]> {
        const dataMutations = [observableOf(this.bookings), this.paginator.page, this.sort.sortChange];
        this.paginator.length = this.bookings.length;
        return merge(...dataMutations).pipe(
            map(() => {
                return this.getPagedData(this.getSortedData([...this.bookings]));
            })
        );
    }

    disconnect() {}

    private getPagedData(data: Booking[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    private getSortedData(data: Booking[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'carId':
                    return compare(a.carId, b.carId, isAsc);
                case 'userId':
                    return compare(+a.userId, +b.userId, isAsc);
                case 'approvedBy':
                    return compare(+a.approvedBy, +b.approvedBy, isAsc);
                case 'invoiceId':
                    return compare(+a.invoiceId, +b.invoiceId, isAsc);
                default:
                    return 0;
            }
        });
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
