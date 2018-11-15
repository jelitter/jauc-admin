import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography" id="main">
      <app-navbar></app-navbar>
      <div id="router-container"><router-outlet></router-outlet></div>
    </div>
  `,
  styles: [
    '#main { background-color: rgba(100, 148, 237, 0.308); height: 100%; }',
    '#router-container { height: calc(100vh - 7em); margin: 1em; }'
  ]
})
export class AppComponent {
  constructor() {}
}
