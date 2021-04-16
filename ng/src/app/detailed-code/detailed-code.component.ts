//Import is how code is shared across different files in javascript/typescript
import {Component, OnInit} from '@angular/core';
import {Code} from '../shared/classes/Code';
import {CodeService} from '../shared/services/code.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Guess} from '../shared/classes/Guess';
import {GuessService} from '../shared/services/guess.service';

//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './detailed-code.component.html'
})

export class DetailedCodeComponent implements OnInit {
	public code: Code | null = null;
	public guessForm: FormGroup;
	public allGuesses: Guess[] = [];
	public previousGuess: Guess | null = null;
	private readonly codeId: string;

	constructor(private codesService: CodeService, private formBuilder: FormBuilder, private route: ActivatedRoute, private guessService: GuessService) {
		this.codeId = <string>this.route.snapshot.paramMap.get('codeId')
		this.guessForm = this.formBuilder.group({
			guess: ['', [Validators.required]],

		})
	}

	ngOnInit() {
		this.setCode(this.codeId)
		this.setAllGuesses(this.codeId)
	}

	setCode(codeId: string): void {
		this.codesService.getCodeByCodeId(codeId).subscribe(response => {
			this.code = response
		})
	}

	createGuess(codeId: string | null): void {
		const guess: Guess = {
			id: null,
			created: null,
			text: this.guessForm.value.guess,
			exactMatches: null,
			nearMatches: null
		}

		this.guessService.createGuess(<string>codeId, guess).subscribe(response => {
			this.previousGuess = response
		})

	}

	setAllGuesses(codeId: string | null): void {
		this.guessService.getGuessByCodeId(<string>codeId).subscribe(response => {
			this.allGuesses = response
		})
	}


}
