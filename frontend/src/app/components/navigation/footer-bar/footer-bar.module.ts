import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../icons/icons.module';
import { LogoModule } from '../../icons/logo/logo.module';
import { FooterComponent } from './footer-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule, LogoModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterbarModule {}
