import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SwiperComponent } from "swiper/angular";
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
  EffectCreative
} from "swiper";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay, EffectCreative]);

import 'node_modules/bootstrap'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
