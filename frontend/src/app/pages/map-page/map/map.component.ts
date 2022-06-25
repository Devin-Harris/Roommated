import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { EventData, MapboxEvent, MapMouseEvent } from 'mapbox-gl';
import { MarkerComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  @ViewChildren('i') markers!: QueryList<MarkerComponent>;

  style = 'mapbox://styles/mapbox/streets-v11';

  center: [number, number] | null = null; // [Longitude, Latitude]

  zoom: [number] = [12];

  // TODO: change any to post type
  showingPosts: any[] = [];

  // TODO: change any to post type
  allPosts: any[] = [];

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.center = [position.coords.longitude, position.coords.latitude];
      this.filterShowingPosts();
    });

    this.fetchPosts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.removeMapboxLogos();
    });
  }

  handleCenterUpdate(
    e: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  ): void {
    const center = e?.target?.getCenter();
    if (center) {
      this.center = [center.lng, center.lat];
      this.filterShowingPosts();
    }
  }

  handleZoomUpdate(
    e: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  ): void {
    const zoom = e?.target?.getZoom();
    if (zoom) {
      this.zoom = [zoom];
      this.filterShowingPosts();
    }
  }

  private removeMapboxLogos(): void {
    const logo = this.mapContainer.nativeElement.querySelector('.mapboxgl-ctrl-logo');
    const attrib = this.mapContainer.nativeElement.querySelector('.mapboxgl-ctrl-attrib');
    if (attrib) {
      attrib.remove();
    }
    if (logo) {
      logo.parentNode.remove();
    }
  }

  private fetchPosts() {
    // TODO: emit action that triggers a store dispatch to change store based on filters and current center && zoom
    this.allPosts = [
      {
        lng: -84.516662,
        lat: 39.130986,
        id: 1,
      },
      {
        lng: -84.526672,
        lat: 39.150996,
        id: 2,
      },
    ];
    for (let i = 0; i < 100; i++) {
      this.allPosts.push({
        lng: -84.512511 + 0.01 * i,
        lat: 39.396083 - 0.01 * i,
        id: i + 2,
      });
    }

    this.filterShowingPosts();
  }

  private filterShowingPosts() {
    console.log(this.center);
    if (this.center === null) {
      this.showingPosts = [];
    } else {
      const range = 1 / Math.pow(2, Math.max(this.zoom[0] - 9, 0));
      this.showingPosts = this.allPosts.filter((post) => {
        const lngDif = this.center![0] - post.lng;
        const latDif = this.center![1] - post.lat;
        return range >= Math.sqrt(Math.pow(latDif, 2) + Math.pow(lngDif, 2));
      });
    }
  }
}
