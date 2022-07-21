import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.state';

export const selectApplication = createFeatureSelector<ApplicationState>('application');
