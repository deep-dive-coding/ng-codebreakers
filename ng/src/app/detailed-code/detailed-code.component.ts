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
/**
 * Main component for the detailed code view.
 *
 * This component uses the url parameter codeId to grab all the pertinent information for a specific code, the code and
 * all the guesses related to code.
 */
export class DetailedCodeComponent implements OnInit {
	/**
	 * The code being displayed. The value is set on component initiation.
	 */
	public code: Code | null = null;
	/**
	 * Reactive Form for submitting a guess request for the code to the server,
	 */
	public guessForm: FormGroup;
	/**
	 * An array containing all the guesses returned from the server for the specific code
	 */
	public guesses: Guess[] = [];
	/**
	 * The response from the previous guess request submitted to the server.
	 */
	public previousGuess: Guess | null = null;
	/**
	 * The codeId grabbed from the url, the value is set in the constructor and cannot be updated after it has been initialized
	 * @var  string codeId
	 */
	private readonly codeId: string;

	/**
	 * Constructor method for the detailed code component. The constructor is called when bootstrapping the component
	 * and is called before ngOnInit. Values not related to the lifecycle of the component should be defined and set in
	 * the constructor.
	 *
	 * @param codeService HTTP service that interacts with the code endpoint on the server
	 * @param guessService Http service that interacts with the guess endpoint on the server
	 * @param formBuilder provided by angular for the creation of Reactive forms
	 * @param route Activated Route object provided by Angular to interact with the current route
	 */
	constructor(
		private codeService: CodeService,
		private guessService: GuessService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute
	) {
		// this.route.snapshot grabs pertinent url parameters of off the url on object instantiation.
		this.codeId = <string>this.route.snapshot.paramMap.get('codeId')

		//initializes the form for creating guesses. Form validation for the guess form is reinitialized on ngOnInit
		this.guessForm = this.formBuilder.group({
			guess: ['', [Validators.required]],
		})
	}

	/**
	 * Initialization lifecycle method, Used to update values after they have been resolved. NgOnInit is made available
	 * through the OnInit interface
	 */
	ngOnInit() {
		this.setCode(this.codeId)
		this.setGuessesByCodeId(this.codeId)
	}

	/**
	 * simple method that allows for the guess form to be updated dynamically depending on the length of the code returned from the server.
	 * @param length length  of the characters in the code. Used to update form validation for min and max length
	 */
	updateFormValidation(length: number): void {
		const minLengthValidator = Validators.minLength(length);
		const maxLengthValidator = Validators.maxLength(length);
		this.guessForm.controls['guess'].setValidators([Validators.required, minLengthValidator, maxLengthValidator]);
		this.guessForm.controls['guess'].updateValueAndValidity();

	}

	/**
	 * Simple mutator method that interacts with the code service to grab a specific code by code id and assign the value
	 * to the code state variable as well as update thw guess form validation.
	 * dynamically
	 *
	 * @param codeId The id of the code that is being set in the mutator
	 */
	setCode(codeId: string): void {
		this.codeService.getCodeByCodeId(codeId).subscribe(response => {
			this.code = response;
			//Since this is where the code is being returned from the server it seemed like the natural place to update
			// validation for the form.
			this.updateFormValidation(response.length);

		})
	}

	/**
	 * Method called by the guess form on submission of the form in the detailed code component.
	 * This method interacts with the guessService's createGuest method to preform a post request to the server.
	 *
	 * @param codeId the codeId for the code the guess based on.
	 */
	createGuess(codeId: string | null): void {
		// initial guess object that is going to be sent to the server.
		const guess: Guess = {
			id: null,
			created: null,
			text: this.guessForm.value.guess,
			exactMatches: null,
			nearMatches: null,
			solution: false
		}

		this.guessService.createGuess(<string>codeId, guess).subscribe(response => {
			this.previousGuess = response
			this.setGuessesByCodeId(this.codeId)
			if (response.solution === true) {
				this.setCode(this.codeId)
			}
		})
	}

	/**
	 * Simple mutator method that interacts with the guess service to grab all the guesses for a code from the server and sets
	 * them to the guesses state variable
	 * @param codeId the primary key of the code with which all the guesses are getting grabbed
	 */
	setGuessesByCodeId(codeId: string | null): void {
		this.guessService.getGuessByCodeId(<string>codeId).subscribe(response => {
			this.guesses = response
		})
	}


}
