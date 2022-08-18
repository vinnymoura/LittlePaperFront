import { Component, Input } from '@angular/core';
import { SidenavService } from './shared/services/sidenav.service';
import { onMainContentChange, onSideNavChange } from './animation/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent {
  title = 'Little-Papper';
  
  public onSideNavChange: boolean = true;

  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }

}
