import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  @ViewChild('map') map!: ElementRef;

  style = 'mapbox://styles/mapbox/streets-v9';

  center: [number, number] = [0, 0]; // [Longitude, Latitude]

  zoom: [number] = [12];

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.center = [position.coords.longitude, position.coords.latitude];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const attribute = this.mapContainer.nativeElement.querySelector('.mapboxgl-ctrl-attrib');
      if (attribute) {
        attribute.remove();
      }
    });
  }
}
