import { animation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from 'src/app/animation/animation';
import { SidenavService } from '../../services/sidenav.service';
import { Router, Routes, RouterModule } from '@angular/router';

interface Page {
  link: string;
  name: string;
}

@Component({
  selector: 'app-sideNav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [onSideNavChange, animateText]
})


export class SidenavComponent  {
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  public pages: Page[] = [
    { name: 'Feminino', link: 'some-link' },
    { name: 'Masculino', link: 'some-link' },
    { name: 'Acessórios', link: 'some-link' },
    { name: 'Perfumaria', link: 'some-link' },
  ];

  constructor(private _sidenavService: SidenavService) {}
  
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
   

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
  
  isShown: boolean = false ; // hidden by default

  toggleShow() {
  
  this.isShown = ! this.isShown;
  }

  btnLogin = function() {
      
  }

}
