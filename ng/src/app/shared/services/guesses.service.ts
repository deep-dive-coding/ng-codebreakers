import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Guesses} from '../classes/Guesses';

// Decorator that denotes a class can be used through dependency injection in a component.
@Injectable({providedIn: 'root'})

/**
 * A service that interacts and handles API requests to the codebreaker /guesses api endpoint.
 *
 * @see A service in Angular is a class that provides well defined behavior/functionality through the use of dependency injection
 *
 * @documentation https://angular.io/guide/dependency-injection
 **/
export class GuessesService {

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
	 * simple method that interacts with the guesses endpoint to grab a guess by the codeId foreign key
	 *
	 * @param
	 *  @return Observable<Guesses[]> an observable that contains the code returned by the server that matches primary key provided
	 **/

	public getGuessByCodeId(codeId: string): Observable<Guesses[]> {
		return (this.http.get<Guesses[]>(`${this.partialGuessesUrlEndpoint}/${codeId}/guesses`))
	}

	/**
	 * simple method that interacts with the guesses endpoint to post a new guess
	 *  @param codeId foreign key (codeId) for the guess being created
	 *  @param guesses Guesses Complete Guess created by the server.
	 *  @return Observable<Codes> an observable that contains the guess  created by the server.
	 **/
	public createGuesses(codeId: string, guesses: Guesses): Observable<Guesses> {
		return (this.http.post<Guesses>(`${this.partialGuessesUrlEndpoint}/${codeId}/guesses`, guesses));
	}

}
