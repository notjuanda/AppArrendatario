import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl = 'https://toncipinto.nur.edu/api';

  constructor(private http: HttpClient) {}

  getReservasPorLugar(lugarId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas/lugar/${lugarId}`);
  }
}
