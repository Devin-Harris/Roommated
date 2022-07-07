import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';

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

  constructor(private fb: FormBuilder) {
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
        price: new FormControl(null),
        groupSize: new FormControl(null),
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
