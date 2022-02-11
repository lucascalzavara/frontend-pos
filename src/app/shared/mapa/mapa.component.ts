import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Output() latitude = new EventEmitter<number>();
  @Output() longitude = new EventEmitter<number>();
  @Input() codigoArmadilha = 0;
  @Input() pontoReferencia = "";
  @Input() edicao: boolean = false;

  constructor(private mapaService: MapaService) { }

  mapa: any;
  overlay: any;
  container: any;
  content: any;
  lat: number;
  lon: number;

  layer: any;

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
        scale: 0.03,
        src: '../../../assets/image/circulo.png',
      })
    }));

    ponto_2.setStyle(new Style({
      image: new Icon({
        color: '#fd7e14',
        crossOrigin: 'anonymous',
        scale: 0.03,
        src: '../../../assets/image/circulo.png',
      })
    }));

    ponto_3.setStyle(new Style({
      image: new Icon({
        color: '#00c706',
        crossOrigin: 'anonymous',
        scale: 0.03,
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
      if (this.edicao) {
        var coord = openLayer.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        this.lon = coord[0];
        this.lat = coord[1];
        this.longitude.emit(this.lon);
        this.latitude.emit(this.lat);
        this.adicionarMarcador();
      }
    });
  }

  abrirPopup(event: any, feature: any) {
    if (this.mapa.hasFeatureAtPixel(event.pixel) === true) {
      var coordinate = event.coordinate;
      this.content.innerHTML = feature.values_.name;
      this.overlay.setPosition(coordinate);
    }
  }

  adicionarMarcador(): void {

    this.mapa.removeLayer(this.layer);

    var marcador = new Feature({
      geometry: new Point(openLayer.fromLonLat([this.lon, this.lat])),
      name: `Marcação inserida!<br><b>ID ${this.codigoArmadilha}</b><br><b>${this.pontoReferencia}</b>`
    });

    this.layer = new VectorLayer({
      source: new Vector({
        features: [marcador]
      })
    });

    this.mapa.addLayer(this.layer);
  }

}
