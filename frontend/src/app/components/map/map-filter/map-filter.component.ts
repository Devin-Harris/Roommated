import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { PostFilter } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectMapFilters, storeMapFilters } from 'src/app/state/map';

@Component({
  selector: 'map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements AfterViewChecked, OnDestroy {
  @ViewChild('extraFilters') extraFilters!: ElementRef;

  @ViewChild('extraFiltersWrapper') extraFiltersWrapper!: ElementRef;

  form!: UntypedFormGroup;

  showingMoreFilters = false;

  readonly genderOptions = Object.values(Gender);

  readonly postTypeOptions = Object.values(PostTypeFilter);

  readonly postParkingOptions = Object.values(PostParkingFilter);

  readonly postPetFilterOptions = Object.values(PostPetFilter);

  private $storedMapFilters: Observable<PostFilter>;

  private $destroyed = new Subject<void>();

  constructor(private fb: UntypedFormBuilder, private store: Store) {
    this.initializeForm();

    this.$storedMapFilters = this.store.select(selectMapFilters);
    this.$storedMapFilters.pipe(takeUntil(this.$destroyed)).subscribe((filters) => {
      if (filters) {
        filters.minPrice !== undefined &&
          filters.minPrice !== null &&
          this.form.get('default')?.get('minPrice')?.setValue(filters.minPrice);
        filters.maxPrice !== undefined &&
          filters.maxPrice !== null &&
          this.form.get('default')?.get('maxPrice')?.setValue(filters.maxPrice);
        filters.minGroupSize !== undefined &&
          filters.minGroupSize !== null &&
          this.form.get('default')?.get('minGroupSize')?.setValue(filters.minGroupSize);
        filters.maxGroupSize !== undefined &&
          filters.maxGroupSize !== null &&
          this.form.get('default')?.get('maxGroupSize')?.setValue(filters.maxGroupSize);
        filters.housingTypes !== undefined &&
          filters.housingTypes !== null &&
          this.form.get('default')?.get('housingType')?.setValue(filters.housingTypes);
        filters.moveInDate !== undefined &&
          filters.moveInDate !== null &&
          this.form.get('default')?.get('moveInDate')?.setValue(filters.moveInDate);
        filters.pets !== undefined &&
          filters.pets !== null &&
          this.form.get('extra')?.get('pets')?.setValue(filters.pets);
        filters.parkings !== undefined &&
          filters.parkings !== null &&
          this.form.get('extra')?.get('parkings')?.setValue(filters.parkings);
        filters.genders !== undefined &&
          filters.genders !== null &&
          this.form.get('extra')?.get('genders')?.setValue(filters.genders);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.animateExtraFilters();
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  toggleMoreFilter(): void {
    this.showingMoreFilters = !this.showingMoreFilters;
    this.animateExtraFilters();
  }

  resetForm(): void {
    this.initializeForm();
    this.applyFilters();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      default: this.fb.group({
        minPrice: new UntypedFormControl(null),
        maxPrice: new UntypedFormControl(null),
        minGroupSize: new UntypedFormControl(null),
        maxGroupSize: new UntypedFormControl(null),
        housingTypes: new UntypedFormControl([PostTypeFilter.Any]),
        moveInDate: new UntypedFormControl(null),
      }),
      extra: this.fb.group({
        pets: new UntypedFormControl([PostPetFilter.Any]),
        parkings: new UntypedFormControl([PostParkingFilter.Any]),
        genders: new UntypedFormControl([Gender.Any]),
      }),
    });
  }

  applyFilters(): void {
    this.store.dispatch(
      storeMapFilters({
        filters: {
          minPrice: this.form.get('default')?.get('minPrice')?.value,
          maxPrice: this.form.get('default')?.get('maxPrice')?.value,
          minGroupSize: this.form.get('default')?.get('minGroupSize')?.value,
          maxGroupSize: this.form.get('default')?.get('maxGroupSize')?.value,
          housingTypes: this.form.get('default')?.get('housingTypes')?.value,
          moveInDate: this.form.get('default')?.get('moveInDate')?.value,
          pets: this.form.get('extra')?.get('pets')?.value,
          parkings: this.form.get('extra')?.get('parkings')?.value,
          genders: this.form.get('extra')?.get('genders')?.value,
        },
      })
    );
  }

  getPriceDisplayText(): string {
    const minPriceValue = this.form.get('default')?.get('minPrice')?.value;
    const maxPriceValue = this.form.get('default')?.get('maxPrice')?.value;
    if (minPriceValue && maxPriceValue) {
      return minPriceValue + ' - ' + maxPriceValue;
    }

    if (minPriceValue) {
      return minPriceValue;
    }
    if (maxPriceValue) {
      return maxPriceValue;
    }

    return 'Any';
  }

  validatePriceFromMin(): void {
    const minPriceValue = this.form.get('default')?.get('minPrice')?.value;
    const maxPriceValue = this.form.get('default')?.get('maxPrice')?.value;
    if (!maxPriceValue) return;

    if (minPriceValue > maxPriceValue) {
      this.form.get('default')?.get('maxPrice')?.setValue(minPriceValue);
    }
  }

  validatePriceFromMax(): void {
    const minPriceValue = this.form.get('default')?.get('minPrice')?.value;
    const maxPriceValue = this.form.get('default')?.get('maxPrice')?.value;
    if (!minPriceValue) return;

    if (maxPriceValue < minPriceValue) {
      this.form.get('default')?.get('minPrice')?.setValue(maxPriceValue);
    }
  }

  getGroupSizeDisplayText(): string {
    const minGroupSizeValue = this.form.get('default')?.get('minGroupSize')?.value;
    const maxGroupSizeValue = this.form.get('default')?.get('maxGroupSize')?.value;
    if (minGroupSizeValue && maxGroupSizeValue) {
      return minGroupSizeValue + ' - ' + maxGroupSizeValue;
    }

    if (minGroupSizeValue) {
      return minGroupSizeValue;
    }
    if (maxGroupSizeValue) {
      return maxGroupSizeValue;
    }

    return 'Any';
  }

  validateGroupSizeFromMin(): void {
    const minGroupSizeValue = this.form.get('default')?.get('minGroupSize')?.value;
    const maxGroupSizeValue = this.form.get('default')?.get('maxGroupSize')?.value;
    if (!maxGroupSizeValue) return;

    if (minGroupSizeValue > maxGroupSizeValue) {
      this.form.get('default')?.get('maxGroupSize')?.setValue(minGroupSizeValue);
    }
  }

  validateGroupSizeFromMax(): void {
    const minGroupSizeValue = this.form.get('default')?.get('minGroupSize')?.value;
    const maxGroupSizeValue = this.form.get('default')?.get('maxGroupSize')?.value;
    if (!minGroupSizeValue) return;

    if (maxGroupSizeValue < minGroupSizeValue) {
      this.form.get('default')?.get('minGroupSize')?.setValue(maxGroupSizeValue);
    }
  }

  private animateExtraFilters(): void {
    if (this.extraFiltersWrapper && this.extraFilters) {
      if (this.showingMoreFilters) {
        this.extraFiltersWrapper.nativeElement.style.height =
          this.extraFilters.nativeElement.clientHeight + 'px';
        this.extraFiltersWrapper.nativeElement.style.overflow = 'unset';
      } else {
        this.extraFiltersWrapper.nativeElement.style.height = 0;
        this.extraFiltersWrapper.nativeElement.style.overflow = 'hidden';
      }
    }
  }
}
