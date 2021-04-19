import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Guess} from '../classes/Guess';

// Decorator that denotes a class can be used through dependency injection in a component.
@Injectable({providedIn: 'root'})

/**
 * A service that interacts and handles API requests to the codebreaker /detailed-code api endpoint.
 *
 * @see A service in Angular is a class that provides well defined behavior/functionality through the use of dependency injection
 *
 * @documentation https://angular.io/guide/dependency-injection
 **/
export class GuessService {

	/**
	 * url endpoint this service is going to be interacting with
	 * @var string guessesUrlEndpoint
	 */
	private partialGuessesUrlEndpoint = 'codebreaker/codes';

	/**
	 * constructor for this service. the Constructor is where injected services can be made accessible to the class in question

	 * @param http HttpClient
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * simple method that interacts with the detailed-code endpoint to grab a guess by the codeId foreign key
	 *
	 * @param
	 *  @return Observable<Guess[]> an observable that contains the code returned by the server that matches primary key provided
	 **/
	public getGuessByCodeId(codeId: string): Observable<Guess[]> {
		return (this.http.get<Guess[]>(`${this.partialGuessesUrlEndpoint}/${codeId}/guesses`))
	}

	/**
	 * simple method that interacts with the detailed-code endpoint to post a new guess
	 *  @param codeId string foreign key (codeId) for the guess being created
	 *  @param guess Guess Complete Guess created by the server.
	 *  @return Observable<Guess> an observable that contains the guess  created by the server.
	 **/
	public createGuess(codeId: string, guess: Guess): Observable<Guess> {
		return (this.http.post<Guess>(`${this.partialGuessesUrlEndpoint}/${codeId}/guesses`, guess));
	}

}
