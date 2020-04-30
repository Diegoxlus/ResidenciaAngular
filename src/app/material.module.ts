// material.module.ts

import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule, MatPaginatorModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMatPaginatorIntl} from './servicios/custom-matpaginator-intl.service';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [MatDatepickerModule ],
})

export class MaterialModule {}
