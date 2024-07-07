import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private http: HttpClient
    ) { }


    getAllUsers(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users`);
    }

    getUser(id): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    addUser(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users`, data);
    }

    updateUser(data): Observable<any> {
        return this.http.put(`${environment.apiUrl}/users/${data._id}`, data);
    }

    deleteUser(id): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
