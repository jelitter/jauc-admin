import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './reviewtable-datasource';

@Component({
  selector: 'review-table',
  templateUrl: './reviewtable.component.html',
  styleUrls: ['./reviewtable.component.css'],
})
export class ReviewTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', '$key', 'carId', 'userId', 'rating'];

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort);
  }
}
