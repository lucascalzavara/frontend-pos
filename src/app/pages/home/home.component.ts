import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer) { }

  imagem_original: any =  "";
  imagem_processada: string = "";
  quantidade_ovos: number = 0;
  data_hora: any = null;
  timer = 0;
  timerInterval: any = null;

  ngOnInit(): void {
  }

  capturar() {
    this.timer = 32;
    this.quantidade_ovos = 0
    this.httpService.capturar().subscribe(res => {
      this.data_hora = new Date();
    });

    this.timerInterval = setInterval(() => {
      this.timer--;
    }, 1000);

    setTimeout(() => {
      this.httpService.getFoto().subscribe(res => {
        this.imagem_original = res;
      });

      this.httpService.getFotoProcessada().subscribe(res => {
        this.imagem_processada = res;
      });

      this.httpService.getQtdOvos().subscribe(res => {
        this.quantidade_ovos = res;
      });
      clearTimeout(this.timerInterval);
      this.timer = 0;
    }, 32000);
  }

  _arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
