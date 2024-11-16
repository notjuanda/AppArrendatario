import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://toncipinto.nur.edu/api/arrendatario';

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  register(userData: { email: string; nombre: string; password: string; telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe(
        async (response) => {
          await this.storage.set('user', response);
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  async getUser(): Promise<any> {
    return await this.storage.get('user');
  }

  async logout(): Promise<void> {
    await this.storage.remove('user'); // Elimina los datos del usuario
  }
}
