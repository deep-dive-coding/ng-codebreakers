//Import is how code is shared across different files in javascript/typescript
import {Component, OnInit} from '@angular/core';
import {Codes} from '../shared/classes/Codes';
import {CodesService} from '../shared/services/codes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Guesses} from '../shared/classes/Guesses';
import {GuessesService} from '../shared/services/guesses.service';

//decorator that marks a class as an Angular Component
@Component({
	// url to the template containing the html (view) for this component.
	templateUrl: './guesses.component.html'
})

export class GuessesComponent implements OnInit {
	public code: Codes | null = null;
	public guessForm: FormGroup;
	public allGuesses: Guesses[] = [];
	public previousGuess: Guesses | null = null;
	private codeId: string;

	constructor(private codesService: CodesService, private formBuilder: FormBuilder, private route: ActivatedRoute, private guessService: GuessesService) {
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
		const guess: Guesses = {
			id: null,
			created: null,
			text: this.guessForm.value.guess,
			exactMatches: null,
			nearMatches: null
		}

		this.guessService.createGuesses(<string>codeId, guess).subscribe(response => {
			this.previousGuess = response
		})

	}

	setAllGuesses(codeId: string | null): void {
		this.guessService.getGuessByCodeId(<string>codeId).subscribe(response => {
			this.allGuesses = response
		})
	}


}
