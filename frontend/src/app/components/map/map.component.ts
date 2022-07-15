import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Location, PostFilter, zoomLevelDistances } from '@rmtd/common/interfaces';
import { EventData, MapboxEvent } from 'mapbox-gl';
import { MarkerComponent } from 'ngx-mapbox-gl';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectFilteredMapPosts, selectMapFilters, storeMapFilters } from 'src/app/state/map';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  @ViewChild('map') map!: ElementRef;

  @ViewChildren('i') markers!: QueryList<MarkerComponent>;

  mapStyle = 'mapbox://styles/mapbox/streets-v11';
  // mapStyle = 'mapbox://styles/devinharris36/cl3tdp4cx001014pnipvalo1w';

  center: [number, number] = [3.533248, 47.599854]; // [Longitude, Latitude]

  zoom: [number] = [13];

  // TODO: change any to post type
  showingPosts: any[] = [];

  // TODO: change any to post type
  allPosts: any[] = [];

  showMap = false;

  showSearchPin = false;

  private $storedMapFilters: Observable<PostFilter>;

  // TODO: change any to post type
  private $filteredMapPosts: Observable<any[]>;

  private $destroyed = new Subject<void>();

  constructor(private store: Store) {
    this.$storedMapFilters = this.store.select(selectMapFilters);
    this.$storedMapFilters.pipe(takeUntil(this.$destroyed)).subscribe((filters) => {
      if (filters) {
        if (filters.mapCenterLng !== undefined && filters.mapCenterLat !== undefined) {
          this.center = [filters.mapCenterLng, filters.mapCenterLat];
        }
        if (filters.mapZoom !== undefined) {
          this.zoom = [filters.mapZoom];
        }
      }
    });

    this.$filteredMapPosts = this.store.select(selectFilteredMapPosts);
    this.$filteredMapPosts.pipe(takeUntil(this.$destroyed)).subscribe((posts) => {
      this.allPosts = posts;
      this.filterShowingPosts();
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = [position.coords.longitude, position.coords.latitude];
        this.updateLocationInStore();
        this.showMap = true;
      },
      (error) => {
        console.error(error);
        this.center = [3.533248, 47.599854];
        this.updateLocationInStore();
        this.showMap = true;
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.removeMapboxLogos();
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  handleCenterUpdate(
    e: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  ): void {
    const center = e?.target?.getCenter();
    if (center) {
      this.showSearchPin = false;
      this.center = [center.lng, center.lat];
      this.updateLocationInStore();
    }
  }

  handleZoomUpdate(
    e: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  ): void {
    const zoom = e?.target?.getZoom();
    const center = e?.target?.getCenter();
    if (center) {
      this.center = [center.lng, center.lat];
    }
    if (zoom) {
      this.zoom = [zoom];
      this.updateLocationInStore();
    }
  }

  handleSearchResults(result: Location): void {
    if (result.lng !== undefined && result.lat !== undefined) {
      this.showSearchPin = true;
      this.center = [result.lng, result.lat];
      if (this.zoom[0] < 13) {
        this.zoom = [13];
      }
    }
  }

  private updateLocationInStore(): void {
    this.store.dispatch(
      storeMapFilters({
        filters: {
          mapCenterLat: this.center[1],
          mapCenterLng: this.center[0],
          mapZoom: this.zoom[0],
          metersInView: this.calculateMetersInViewOfMap(),
        },
      })
    );
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

  private calculateMetersInViewOfMap(): number {
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

    const metersPerPixel = zoomLevelDistances[Math.ceil(this.zoom[0])][zoomLevelDistanceIndex];

    const mapContainerBounds = this.mapContainer?.nativeElement?.getBoundingClientRect() || {
      width: window.screenX,
      height: window.screenY,
    };

    const mapPixelHeight = mapContainerBounds.height;
    const mapPixelWidth = mapContainerBounds.width;
    const maxDimension = Math.max(mapPixelHeight, mapPixelWidth);
    return metersPerPixel * maxDimension;
  }

  private filterShowingPosts() {
    if (this.center === null) {
      this.showingPosts = [];
    } else {
      const metersInView = this.calculateMetersInViewOfMap();
      this.showingPosts = this.allPosts.filter((post) => {
        const lngDifInKm = Math.abs(this.center![0] - post.location.lng) * 87.84336;
        const latDifInKm = Math.abs(this.center![1] - post.location.lat) * 111;
        return metersInView / 1000 >= Math.sqrt(Math.pow(lngDifInKm, 2) + Math.pow(latDifInKm, 2));
      });
    }
  }
}
