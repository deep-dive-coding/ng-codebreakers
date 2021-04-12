//Import is how code is shared across different files in javascript/typescript
import {Component} from '@angular/core';


//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './splash.component.html'
})

//Export makes variables, functions and classes sharable via import across different files.
export class SplashComponent{}