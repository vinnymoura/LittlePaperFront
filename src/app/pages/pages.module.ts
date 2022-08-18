import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { EntrarComponent } from './Entrar/entrar.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './home/homepage/homepage.component';


import 'node_modules/bootstrap'
import { SwiperModule } from 'swiper/angular';
import { MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    HomepageComponent,
    EntrarComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class PagesModule {  }
