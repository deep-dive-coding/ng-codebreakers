//Import is how code is shared across different files in javascript/typescript
import {Component, OnInit} from '@angular/core';
import {Code} from '../shared/classes/Code';
import {CodeService} from '../shared/services/code.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './codes.component.html'
})


export class CodesComponent implements OnInit {
	public codes: Code[] = [];
	public codeForm: FormGroup;

	constructor(private codesService: CodeService, private formBuilder: FormBuilder, private router: Router) {
		this.codeForm = this.formBuilder.group({
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

	navigateToDetailedView(code: Code): void {
		this.router.navigate(['/detailed-code/', code.id]).catch(error => {
			console.error(error)
		})


	}

	createCode(): void {

		const code: Code = {
			id: null,
			created: null,
			pool: this.codeForm.value.pool,
			length: this.codeForm.value.length,
			guessCount: null,
			solved: null,
			text: null,
		}
		this.codesService.createCode(code).subscribe(response => {
			this.codeForm.reset()
			this.loadAllCodes()
			this.navigateToDetailedView(response)
		})
	}
}