import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SplashComponent} from './splash/splash.component';
import {CodesComponent} from './codes/codes.component';
import {DetailedCodeComponent} from './detailed-code/detailed-code.component';

const routes: Routes = [
    {path: 'detailed-code/:codeId', component: DetailedCodeComponent},
    {path: 'codes', component: CodesComponent},
    {path: '', component: SplashComponent}
];

export const allAppComponents = [SplashComponent, CodesComponent, DetailedCodeComponent];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}