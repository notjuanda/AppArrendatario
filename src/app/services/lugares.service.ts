import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {
  private apiUrl = 'https://toncipinto.nur.edu/api';

  constructor(private http: HttpClient) {}

  getLugaresPorArrendatario(arrendatarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugares/arrendatario/${arrendatarioId}`);
  }

  crearLugar(lugar: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lugares`, lugar);
  }

  agregarFoto(lugarId: number, foto: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', foto);

    return this.http.post(`${this.apiUrl}/lugares/${lugarId}/foto`, formData);
  }

  getLugarPorId(lugarId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugares/${lugarId}`);
  }

  editarLugar(lugarId: number, lugar: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/lugares/${lugarId}`, lugar);
  }
}
