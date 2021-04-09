//Import is how code is shared across different files in javascript/typescript
import {Component} from '@angular/core';


//decorator that marks a class as an Angular Component
@Component({
	templateUrl: './splash.component.html'
})

//Export makes variables, functions and classes sharable via import across different files.
export class SplashComponent{}