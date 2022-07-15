import { FormControl, FormGroup } from '@angular/forms';

// For use with Angular Typed React Form
// to maps a interface to a form group
// Credit: https://netbasal.com/typed-reactive-forms-in-angular-no-longer-a-type-dream-bf6982b0af28
export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
