import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, share } from 'rxjs/operators';
import { MLBTeams } from './isr';

@Injectable({
  providedIn: 'root'
})
export class MLBService {
  private mlbBaseUrl = "http://lookup-service-prod.mlb.com/json/"
  private mlbTeamsURL = "named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2022'"
  private mlbPlayerSearchURl ="named.search_player_all.bam?sport_code='mlb'&active_sw=Y&name_part="
  private  httpOptions = {
    headers: new HttpHeaders ({"Content-Type": "application/json"}),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }
  getMLBTeams() {
    const teamsurl = this.mlbBaseUrl + this.mlbTeamsURL;
     return this.http.get(teamsurl)
      /* .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      ); */
  }
  searchMLBPlayers(player : string) {
    const plaersUrl = this.mlbBaseUrl + this.mlbPlayerSearchURl;
     return this.http.get(plaersUrl+player)
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
