import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: string = "192.168.0.0";


  capturarEProcessar() {
    return this.http.get<any>(`${this.url}/capturarImagem`);
  }
}
