//Import is how code is shared across different files in javascript/typescript
import {Component, OnInit} from '@angular/core';
import {Codes} from '../shared/classes/Codes';
import {CodesService} from '../shared/services/codes.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './guesses.component.html'
})

export class GuessesComponent implements OnInit {
	public code: Codes | null = null;


	constructor(private codesService: CodesService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.setCode()
	}

	setCode(): void {
		const codeId: string = <string>this.route.snapshot.paramMap.get('codeId')
		this.codesService.getCodeByCodeId(codeId).subscribe(response => {
			this.code = response
		})

	}
}
