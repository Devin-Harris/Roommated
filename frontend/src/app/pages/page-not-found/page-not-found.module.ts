import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { ImageStackModule } from 'src/app/components/misc/image-stack/image-stack.module';
import { NavigationModule } from 'src/app/components/navigation/navigation.module';
import { FooterbarModule } from 'src/app/components/navigation/footer-bar/footer-bar.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, RouterModule, ImageStackModule, FooterbarModule],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule { }
