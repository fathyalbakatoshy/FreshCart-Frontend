import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories/${id}`);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categories`, data);
  }

  updateCategory(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/categories/${data._id}`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
