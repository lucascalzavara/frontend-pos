import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:5000";

  requestOptions: Object = {
    responseType: 'arraybuffer'
  }


  capturar() {
    return this.http.get<any>(`${this.url}/capturarFoto`);
  }

  getFoto() {
    return this.http.get<any>(`${this.url}/getFoto`, this.requestOptions);
  }

  getFotoProcessada() {
    return this.http.get<any>(`${this.url}/getFotoProcessada`, this.requestOptions);
  }

  getQtdOvos() {
    return this.http.get<any>(`${this.url}/getQtdOvos`);
  }
}
