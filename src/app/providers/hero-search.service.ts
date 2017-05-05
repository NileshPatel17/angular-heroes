import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Hero} from '../models/index';

@Injectable()
export class HeroSearchService{
    constructor(private http:Http){}

    search(term:string):Observable<Hero[]>{
        return this.http
            .get(`api/heroes/?name=${term}`)
            .map(res=>res.json().data as Hero[]);
    }
}
/*
Passing every user keystroke directly to the HeroSearchService would create an excessive amount of HTTP requests, taxing server resources and burning through the cellular network data plan.

Instead, you can chain Observable operators that reduce the request flow to the string Observable. You'll make fewer calls to the HeroSearchService and still get timely results. Here's how:

    debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. You'll never make requests more frequently than 300ms.
    distinctUntilChanged ensures that a request is sent only if the filter text changed.
    switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. It cancels and discards previous search observables, returning only the latest search service observable.

With the switchMap operator (formerly known as flatMapLatest), every qualifying key event can trigger an http() method call. Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.

switchMap() preserves the original request order while returning only the observable from the most recent http method call. Results from prior calls are canceled and discarded.

If the search text is empty, the http() method call is also short circuited and an observable containing an empty array is returned.

Note that until the service supports that feature, canceling the HeroSearchService Observable doesn't actually abort a pending HTTP request. For now, unwanted results are discarded.

    catch intercepts a failed observable. The simple example prints the error to the console; a real life app would do better. Then to clear the search result, you return an observable containing an empty array.
*/