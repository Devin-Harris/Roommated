import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { storeMapFilters } from 'src/app/state/map';

@Component({
  selector: 'map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements AfterViewChecked {
  @ViewChild('extraFilters') extraFilters!: ElementRef;

  @ViewChild('extraFiltersWrapper') extraFiltersWrapper!: ElementRef;

  form!: FormGroup;

  showingMoreFilters = false;

  readonly genderOptions = Object.values(Gender);

  readonly postTypeOptions = Object.values(PostTypeFilter);

  readonly postParkingOptions = Object.values(PostParkingFilter);

  readonly postPetFilterOptions = Object.values(PostPetFilter);

  constructor(private fb: FormBuilder, private store: Store) {
    this.initializeForm();
  }

  ngAfterViewChecked(): void {
    this.animateExtraFilters();
  }

  toggleMoreFilter(): void {
    this.showingMoreFilters = !this.showingMoreFilters;
    this.animateExtraFilters();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      default: this.fb.group({
        minPrice: new FormControl(null),
        maxPrice: new FormControl(null),
        minGroupSize: new FormControl(null),
        maxGroupSize: new FormControl(null),
        type: new FormControl(PostTypeFilter.Any),
        moveInDate: new FormControl(null),
      }),
      extra: this.fb.group({
        pets: new FormControl(PostPetFilter.Any),
        parking: new FormControl(PostParkingFilter.Any),
        gender: new FormControl(Gender.Any),
      }),
    });
  }

  applyFilters(): void {
    // TODO: dispatch action to refetch posts for map based on filters
    this.store.dispatch(
      storeMapFilters({
        filters: {
          minPrice: this.form.get('default')?.get('minPrice')?.value,
          maxPrice: this.form.get('default')?.get('maxPrice')?.value,
          minGroupSize: this.form.get('default')?.get('minGroupSize')?.value,
          maxGroupSize: this.form.get('default')?.get('maxGroupSize')?.value,
          type: this.form.get('default')?.get('type')?.value,
          moveInDate: this.form.get('default')?.get('moveInDate')?.value,
          pets: this.form.get('extra')?.get('pets')?.value,
          parking: this.form.get('extra')?.get('parking')?.value,
          gender: this.form.get('extra')?.get('gender')?.value,
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

    return '';
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

    return '';
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
