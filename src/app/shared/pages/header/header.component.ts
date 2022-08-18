import { onSideNavChange, animateText } from 'src/app/animation/animation';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavService } from '../../services/sidenav.service';

import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class HeaderComponent implements OnInit {
  
@Output () public sidenavToggle = new EventEmitter();

  constructor(private _sidenavService: SidenavService) {  }

  ngOnInit(): void {
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
 
}
