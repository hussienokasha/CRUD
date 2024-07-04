import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiRoot: string = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) {}
  addEmployee(data: any) {
    return this.http.post(this.apiRoot, data);
  }
  getEmployee() {
    return this.http.get(this.apiRoot);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiRoot}/${id}`);
  }
  EditEmployee(id: number, data: any) {
    return this.http.put(`${this.apiRoot}/${id}`, data);
  }
}
