import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SplashComponent} from './splash/splash.component';
import {CodesComponent} from './codes/codes.component';
import {GuessesComponent} from './guesses/guesses.component';

const routes: Routes = [
    {path: 'guesses/:codeId', component: GuessesComponent},
    {path: 'codes', component: CodesComponent},
    {path: '', component: SplashComponent}
];

export const allAppComponents = [SplashComponent, CodesComponent, GuessesComponent];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}