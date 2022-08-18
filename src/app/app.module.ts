import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

//Imports of animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Imports of routes
import { AppRoutingModule } from './app-routing.module';

//Here imports from shared, header, left-menu e footer;
import { HeaderComponent } from './shared/pages/header/header.component';
import { FooterComponent } from './shared/pages/footer/footer.component';
import { SidenavComponent } from './shared/pages/sidenav/sidenav.component'

//Here imports service shared
import { SidenavService } from './shared/services/sidenav.service'

// Here import from material module
import {MaterialModule} from './material.module'

import 'node_modules/bootstrap'

import { SwiperModule } from 'swiper/angular';
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,

    //declaration shared
    HeaderComponent,
    FooterComponent,
    SidenavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SwiperModule,
    PagesModule
    
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent],
  entryComponents: [ AppComponent ]
})
export class AppModule { }
