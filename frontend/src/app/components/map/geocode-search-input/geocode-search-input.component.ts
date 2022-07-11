import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Location } from '@rmtd/common/interfaces';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'geocode-search-input',
  templateUrl: './geocode-search-input.component.html',
  styleUrls: ['./geocode-search-input.component.scss'],
})
export class GeocodeSearchInputComponent implements OnInit, OnDestroy {
  @ViewChild('searchInputContainerRef') searchInputContainerRef: ElementRef | undefined;

  @ViewChild('searchInputRef') searchInputRef?: ElementRef<HTMLInputElement>;

  @ViewChild('searchResultsRef') searchResultsRef: ElementRef | undefined;

  @Output('onSearchResults') onSearchResults = new EventEmitter<Location>();

  showingSearchResults = false;

  searchResults: Location[] = [];

  private readonly searchSubject = new Subject<string | undefined>();

  private destroyed$ = new Subject<void>();

  private outsideClickListener: () => void;

  constructor(private renderer: Renderer2) {
    this.outsideClickListener = this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.searchInputContainerRef?.nativeElement &&
        e.target !== this.searchResultsRef?.nativeElement
      ) {
        this.showingSearchResults = false;
      }
    });
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300),
        tap(async (searchQuery) => {
          this.showingSearchResults = false;
          if (searchQuery) {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
                searchQuery
              )}.json?types=address&access_token=${environment.mapboxAccessToken}`
            );
            const json: MapboxGeocoder.Results = await response.json();
            const features = json.features as MapboxGeocoder.Result[];
            this.searchResults = this.mapSearchResults(features);
            this.showingSearchResults = true;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.outsideClickListener();
  }

  handleSearchResultClick(searchResult: Location): void {
    this.onSearchResults.emit(searchResult);
    this.showingSearchResults = false;
    // Update the search bar with the selected address for UX purposes
    this.searchInputRef!.nativeElement.value = searchResult.placeName;
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  private mapSearchResults(rawResults: MapboxGeocoder.Result[]): Location[] {
    return rawResults.map((result: MapboxGeocoder.Result) => {
      return {
        lng: result.center[0],
        lat: result.center[1],
        postCode:
          result.context.find((ctx: { id: string }) => ctx.id.split('.')[0] === 'postcode')?.text ??
          null,
        city:
          result.context.find((ctx: { id: string }) => ctx.id.split('.')[0] === 'place')?.text ??
          null,
        district:
          result.context.find((ctx: { id: string }) => ctx.id.split('.')[0] === 'district')?.text ??
          null,
        state:
          result.context.find((ctx: { id: string }) => ctx.id.split('.')[0] === 'region')?.text ??
          null,
        country:
          result.context.find((ctx: { id: string }) => ctx.id.split('.')[0] === 'country')?.text ??
          null,
        placeName: result.place_name,
      };
    });
  }
}
