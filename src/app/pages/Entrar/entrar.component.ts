import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import 'node_modules/bootstrap'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EntrarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  hide = true

}
