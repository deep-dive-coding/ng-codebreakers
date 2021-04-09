import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg bg-dark">
        <small class="d-none d-md-inline-block text-muted mr-auto"><em>An Angularific Demo.</em></small>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button routerLink="/posts" class="btn btn-primary">posts</button>
          </li>
        </ul>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ng';
}
