import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { DIALOG_DATA } from './dialog-tokens';
import { DialogRef } from './dialogRef';

export interface DialogConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(@Inject(Overlay) private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      disposeOnNavigation: true,
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
