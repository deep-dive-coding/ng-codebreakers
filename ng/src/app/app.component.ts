import {Component} from '@angular/core';

@Component({
  //creates a custom html tag for this component that can be injected into other templates/components.
  selector: 'app-root',
  //template enables for inlining the html (view) in the same file as the component.
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg bg-dark">
        <small class="d-none d-md-inline-block text-muted mr-auto"><em>Angularific Demo Involving Code Breaking</em></small>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button routerLink="/codes" class="btn btn-primary">codes</button>
          </li>
        </ul>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
