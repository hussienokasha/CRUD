import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-data',
  templateUrl: './add-employee-data.component.html',
  styleUrls: ['./add-employee-data.component.css'],

})
export class AddEmployeeDataComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    public dialogRef: MatDialogRef<AddEmployeeDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }
  employeeForm = this.fb.group({
    fName: [''],
    lName: [''],
    date: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ],
    ],
    edu: [''],
    gender: [''],
  });

  submitForm() {
    if (this.employeeForm.valid) {
      if (this.data) {
        console.log(this.data)
        this.empService
          .EditEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (v) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              alert('data not completed or invalid');
              console.log(err);
            },
          });
      } else {
        this.empService.addEmployee(this.employeeForm.value).subscribe({
          next: (v) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            alert('data not completed or invalid');
            console.log(err);
          },
        });
      }
    }
  }

  getErrorMessage() {
    if (this.employeeForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.employeeForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
