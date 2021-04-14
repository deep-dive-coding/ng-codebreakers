import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Codes} from '../classes/Codes';

// Decorator that denotes a class can be used through dependency injection in a component.
@Injectable({providedIn: 'root'})

/**
 * A service that interacts and handles API requests to the codebreaker /codes api endpoint.
 *
 * @see A service in Angular is a class that provides well defined behavior/functionality through the use of dependency injection
 *
 * @documentation https://angular.io/guide/dependency-injection
 **/
export class CodesService {

	/**
	 * url endpoint this service is going to be interacting with
	 * @var string codesUrlEndpoint
	 */
	private codesUrlEndpoint = 'codebreaker/codes';

	/**
	 * constructor for this service. the Constructor is where injected services can be made accessible to the class in question

	 * @param http HttpClient
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * Simple method that interacts with the codes endpoint to grab all of the codes ever created on the service
	 *
	 * @return Observable<Codes[]> an observable that contains an array of all the codes returned from the server
	 **/
	public getAllCodes(): Observable<Codes[]> {
		return (this.http.get<Codes[]>(this.codesUrlEndpoint))
	}

	/**
	 * simple method that interacts with the codes endpoint to grab all unsolved codes
	 *
	 *  * @return Observable<Codes[]> an observable that contains an array of all unresolved codes returned from the server
	 **/

	public getAllUnresolvedCodes(): Observable<Codes[]> {
		return (this.http.get<Codes[]>(`${this.codesUrlEndpoint}?status=UNRESOLVED`))
	}

	/**
	 * simple method that interacts with the codes endpoint to grab a code by its primary key
	 *
	 *  @return Observable<Codes[]> an observable that contains the code returned by the server that matches primary key provided
	 **/

	public getCodeByCodeId(codeId: string): Observable<Codes> {
		return (this.http.get<Codes>(`${this.codesUrlEndpoint}/${codeId}`))
	}

	/**
	 * simple method that interacts with the codes endpoint to post a new code
	 * @param codes Codes partial code containing the pool of characters and length for the new code created by the server.
	 * @return Observable<Codes> an observable that contains the code created by the server.
	 **/
	public createCodes(codes: Codes): Observable<Codes> {
		return (this.http.post<Codes>(this.codesUrlEndpoint, codes));
	}

}
