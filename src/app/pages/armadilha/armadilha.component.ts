import { Component, OnInit } from '@angular/core';
import { Armadilha } from 'src/app/model/armadilha';

@Component({
  selector: 'app-armadilha',
  templateUrl: './armadilha.component.html',
  styleUrls: ['./armadilha.component.css']
})
export class ArmadilhaComponent implements OnInit {

  armadilha: Armadilha = {
    Longitude: 0,
    Latitude: 0,
    Codigo: 0,
    Cidade: null,
    PontoReferencia: ""
  };

  constructor() { }

  ngOnInit(): void {
  }

  setLatitude (event: any) {
    this.armadilha.Latitude = event;
  }

  setLongitude (event: any) {
    this.armadilha.Longitude = event;
  }

}
