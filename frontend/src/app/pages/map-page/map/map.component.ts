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

  @ViewChild('map') map!: ElementRef;

  @ViewChildren('i') markers!: QueryList<MarkerComponent>;

  mapStyle = 'mapbox://styles/mapbox/streets-v11';

  center: [number, number] = [3.533248, 47.599854]; // [Longitude, Latitude]

  zoom: [number] = [13];

  // TODO: change any to post type
  showingPosts: any[] = [];

  // TODO: change any to post type
  allPosts: any[] = [];

  showMap = false;

  /*
    See https://docs.mapbox.com/help/glossary/zoom-level/
    Represents the meters/pixel at the given zoom level based on the Latitude 
    First entry of a keys array is Latitude 0  
    Second entry of a keys array is Latitude +-20  
    Third entry of a keys array is Latitude +-40  
    Fourth entry of a keys array is Latitude +-60  
    Fifth entry of a keys array is Latitude +-80  
  */
  private zoomLevelDistances: { [key: number]: [number, number, number, number, number] } = {
    0: [78271.484, 73551.136, 59959.436, 39135.742, 13591.701],
    1: [39135.742, 36775.568, 29979.718, 19567.871, 6795.85],
    2: [19567.871, 18387.784, 14989.859, 9783.936, 3397.925],
    3: [9783.936, 9193.892, 7494.929, 4891.968, 1698.963],
    4: [4891.968, 4596.946, 3747.465, 2445.984, 849.481],
    5: [2445.984, 2298.473, 1873.732, 1222.992, 424.741],
    6: [1222.992, 1149.237, 936.866, 611.496, 212.37],
    7: [611.496, 574.618, 468.433, 305.748, 106.185],
    8: [305.748, 287.309, 234.217, 152.874, 53.093],
    9: [152.874, 143.655, 117.108, 76.437, 26.546],
    10: [76.437, 71.827, 58.554, 38.218, 13.273],
    11: [38.218, 35.914, 29.277, 19.109, 6.637],
    12: [19.109, 17.957, 14.639, 9.555, 3.318],
    13: [9.555, 8.978, 7.319, 4.777, 1.659],
    14: [4.777, 4.489, 3.66, 2.389, 0.83],
    15: [2.389, 2.245, 1.83, 1.194, 0.415],
    16: [1.194, 1.122, 0.915, 0.597, 0.207],
    17: [0.597, 0.561, 0.457, 0.299, 0.104],
    18: [0.299, 0.281, 0.229, 0.149, 0.052],
    19: [0.149, 0.14, 0.114, 0.075, 0.026],
    20: [0.075, 0.07, 0.057, 0.037, 0.013],
    21: [0.037, 0.035, 0.029, 0.019, 0.006],
    22: [0.019, 0.018, 0.014, 0.009, 0.003],
  };

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = [position.coords.longitude, position.coords.latitude];
        this.filterShowingPosts();
        this.showMap = true;
      },
      (error) => {
        console.error(error);
        this.center = [3.533248, 47.599854];
        this.showMap = true;
      }
    );

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
    if (this.center === null) {
      this.showingPosts = [];
    } else {
      const latMagnitude = Math.abs(this.center![1]);
      let zoomLevelDistanceIndex = 0;
      if (latMagnitude >= 70) {
        zoomLevelDistanceIndex = 4;
      } else if (latMagnitude >= 50) {
        zoomLevelDistanceIndex = 3;
      } else if (latMagnitude >= 30) {
        zoomLevelDistanceIndex = 2;
      } else if (latMagnitude >= 10) {
        zoomLevelDistanceIndex = 1;
      }

      const metersPerPixel =
        this.zoomLevelDistances[Math.ceil(this.zoom[0])][zoomLevelDistanceIndex];

      const mapContainerBounds = this.mapContainer?.nativeElement?.getBoundingClientRect() || {
        width: window.screenX,
        height: window.screenY,
      };

      const mapPixelHeight = mapContainerBounds.height;
      const mapPixelWidth = mapContainerBounds.width;
      const maxDimension = Math.max(mapPixelHeight, mapPixelWidth);
      const metersInView = metersPerPixel * maxDimension;

      this.showingPosts = this.allPosts.filter((post) => {
        const lngDifInKm = Math.abs(this.center![0] - post.lng) * 87.84336;
        const latDifInKm = Math.abs(this.center![1] - post.lat) * 111;
        return metersInView / 1000 >= Math.sqrt(Math.pow(lngDifInKm, 2) + Math.pow(latDifInKm, 2));
      });
    }
  }
}
