import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SplashComponent} from './splash/splash.component';

const routes: Routes = [
    {path: '', component: SplashComponent}
];

export const allAppComponents = [SplashComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
