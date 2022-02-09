import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as openLayer from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import Point from 'ol/geom/Point';
import { MapaService } from 'src/app/services/mapa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private mapaService: MapaService, private titleService: Title) {
    this.titleService.setTitle("SisMID - Sistema de Monitoramento de Infestação de Dengue");
  }

  imagem_original: any = "";
  imagem_processada: string = "";
  quantidade_ovos: number = 0;
  data_hora: any = null;
  timer = 0;
  timerInterval: any = null;

  mapa: any;
  localizacao: string = "Londrina";
  overlay: any;
  container: any;
  content: any;

  arrayMensagem: Array<string> = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapa = new Map({
      target: 'brasil',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: openLayer.fromLonLat([-51.16924, -23.31287]),
        zoom: 15
      })
    });

    var ponto_1 = new Feature({
      geometry: new Point(openLayer.fromLonLat([-51.16924, -23.31287])),
      name: '<b>Infestação alta!</b><br/>Quantidade de ovos encontrados: 10.000+'
    });

    var ponto_2 = new Feature({
      geometry: new Point(openLayer.fromLonLat([-51.15999, -23.31207])),
      name: '<b>Infestação média!</b><br/>Quantidade de ovos encontrados: 5.000+'
    });

    var ponto_3 = new Feature({
      geometry: new Point(openLayer.fromLonLat([-51.1655, -23.3123])),
      name: '<b>Infestação leve!</b><br/>Quantidade de ovos encontrados: 2.000+'
    });

    ponto_1.setStyle(new Style({
      image: new Icon({
        color: '#fd0000',
        crossOrigin: 'anonymous',
        scale: 0.05,
        src: '../../../assets/image/circulo.png',
      })
    }));

    ponto_2.setStyle(new Style({
      image: new Icon({
        color: '#fd7e14',
        crossOrigin: 'anonymous',
        scale: 0.05,
        src: '../../../assets/image/circulo.png',
      })
    }));

    ponto_3.setStyle(new Style({
      image: new Icon({
        color: '#00c706',
        crossOrigin: 'anonymous',
        scale: 0.05,
        src: '../../../assets/image/circulo.png',
      })
    }));

    var layer = new VectorLayer({
      source: new Vector({
        features: [ponto_1, ponto_2, ponto_3]
      })
    });

    this.mapa.addLayer(layer);


    //MODAL AO CLICAR NOS PONTOS
    this.container = document.getElementById('popup');
    this.content = document.getElementById('popup-content');
    this.overlay = new Overlay({
      element: this.container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    this.mapa.addOverlay(this.overlay);

    this.mapa.on('singleclick', (event: any) => {
      this.overlay.setPosition(undefined);
      this.mapa.forEachFeatureAtPixel(event.pixel, (feature: any) => {
        this.abrirPopup(event, feature);
      })
    });
    //FINAL DA MODAL POPUP


    //obtem as coordenadas no click no mapa
    this.mapa.on('click', (evt: any) => {
      console.log(openLayer.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    });
  }

  abrirPopup(event: any, feature: any) {
    if (this.mapa.hasFeatureAtPixel(event.pixel) === true) {
      var coordinate = event.coordinate;
      this.content.innerHTML = feature.values_.name;
      this.overlay.setPosition(coordinate);
    } 
  }

  buscarCidade(): any {
    this.mapaService.buscarCidade(this.localizacao).subscribe(res => {
      var coord = openLayer.fromLonLat([res[0].lon, res[0].lat]);
      this.mapa.getView().animate({ center: coord, zoom: 15 });
    })
  }

  // capturar() {
  //   this.timer = 32;
  //   this.quantidade_ovos = 0
  //   this.httpService.capturar().subscribe(res => {
  //     this.data_hora = new Date();
  //   });

  //   this.timerInterval = setInterval(() => {
  //     this.timer--;
  //   }, 1000);

  //   setTimeout(() => {
  //     this.httpService.getFoto().subscribe(res => {
  //       this.imagem_original = res;
  //     });

  //     this.httpService.getFotoProcessada().subscribe(res => {
  //       this.imagem_processada = res;
  //     });

  //     this.httpService.getQtdOvos().subscribe(res => {
  //       this.quantidade_ovos = res;
  //     });
  //     clearTimeout(this.timerInterval);
  //     this.timer = 0;
  //   }, 32000);
  // }

  // _arrayBufferToBase64(buffer: any) {
  //   var binary = '';
  //   var bytes = new Uint8Array(buffer);
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return btoa(binary);
  // }

  // sanitize(url: string) {
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }

}
