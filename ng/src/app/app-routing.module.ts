import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SplashComponent} from './splash/splash.component';
import {CodesComponent} from './codes/codes.component';

const routes: Routes = [
    {path: 'codes', component: CodesComponent},
    {path: '', component: SplashComponent}
];

export const allAppComponents = [SplashComponent, CodesComponent];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}