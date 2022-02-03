import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private http: HttpClient) { }


  buscarCidade(endereco: string) {
    return this.http.get<any>(`https://nominatim.openstreetmap.org/search?q=${endereco}&format=json&limit=1`);
  }
}
