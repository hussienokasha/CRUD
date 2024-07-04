import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEmployeeDataComponent } from './add-employee-data/add-employee-data.component';
import { EmployeeService } from './services/employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog, private empServ: EmployeeService) {}
  ngOnInit(): void {
    this.getEmployess();
  }

  displayedColumns: string[] = [
    'id',
    'fName',
    'lName',
    'edu',
    'email',
    'gender',
    'date',
    'delEdit',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getEmployess() {
    this.empServ.getEmployee().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    const d = this.dialog.open(AddEmployeeDataComponent);
    d.afterClosed().subscribe({
      next: (val) => {
        console.log(val);
        if (val) {
          this.getEmployess();
        }
      },
      error: (err) => console.log,
    });
  }
  deleteEmp(id: number) {
    const confirmDelete = confirm('are you really want to delete this!');
    if (!confirmDelete) {
      return;
    }
    this.empServ.deleteEmployee(id).subscribe({
      next: () => {
        this.getEmployess();
        console.log('deleted');
      },
    });
  }
  openEditDialog(formData: any) {
    let dialog = this.dialog.open(AddEmployeeDataComponent, {
      data: formData,
    });
    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployess();
        }
      },
    });
  }
}
