import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  imagem_original: string = "https://img.pebmed.com.br/wp-content/uploads/2019/11/29111226/dengue-1.jpg.webp";
  imagem_processada: string = "https://img.pebmed.com.br/wp-content/uploads/2019/11/29111226/dengue-1.jpg.webp";
  quantidade_ovos: number = 300;
  data_hora: any = null;

  ngOnInit(): void {
  }

  capturar() {
    this.httpService.capturarEProcessar().subscribe(res => {
      this.data_hora = new Date();
    });
  }

}
