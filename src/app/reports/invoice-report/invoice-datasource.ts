import { Invoice } from '../../models/invoice';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, of as observableOf, merge } from 'rxjs';

export class InvoiceDataSource extends DataSource<Invoice> {
    constructor(private paginator: MatPaginator, private sort: MatSort, public invoices: Array<Invoice>) {
        super();
    }

    connect(): Observable<Invoice[]> {
        const dataMutations = [observableOf(this.invoices), this.paginator.page, this.sort.sortChange];
        this.paginator.length = this.invoices.length;
        return merge(...dataMutations).pipe(
            map(() => {
                return this.getPagedData(this.getSortedData([...this.invoices]));
            })
        );
    }

    disconnect() {}

    private getPagedData(data: Invoice[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    private getSortedData(data: Invoice[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'bookingId':
                    return compare(a.bookingId, b.bookingId, isAsc);
                case 'price':
                    return compare(+a.price, +b.price, isAsc);
                case 'paid':
                    return compare(+a.paid, +b.paid, isAsc);

                default:
                    return 0;
            }
        });
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
