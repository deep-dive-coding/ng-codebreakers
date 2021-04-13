//Import is how code is shared across different files in javascript/typescript
import {Component, OnInit} from '@angular/core';
import {Codes} from '../shared/classes/Codes';
import {CodesService} from '../shared/services/codes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './codes.component.html'
})


export class CodesComponent implements OnInit {
	public codes: Codes[] = [];
	public codesForm: FormGroup;

	constructor(private codesService: CodesService, private formBuilder: FormBuilder) {
		this.codesForm = this.formBuilder.group({
			pool: ['', [Validators.required]],
			length: ['', [Validators.required]]

		})
	}

	ngOnInit() {
		this.loadAllCodes();
	}

	loadAllCodes(): void {
		this.codesService.getAllCodes().subscribe(reply => {
			this.codes = reply
		})
	}

	createCode(): void {


		const code: Codes = {
			id: null,
			created: null,
			pool: this.codesForm.value.pool,
			length: this.codesForm.value.length,
			guessCount: null,
			solved: null,
			text: null,
		}
		this.codesService.createCodes(code).subscribe(response => {
			console.log(response)
		})
	}
}