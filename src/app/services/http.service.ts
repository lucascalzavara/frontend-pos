import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: string = "192.168.0.0";


  capturar() {
    return this.http.get<any>(`${this.url}/capturarFoto`);
  }

  getFoto() {
    return this.http.get<any>(`${this.url}/getFoto`);
  }

  getFotoProcessada() {
    return this.http.get<any>(`${this.url}/getFotoProcessada`);
  }

  getQtdOvos() {
    return this.http.get<any>(`${this.url}/getQtdOvos`);
  }
}
