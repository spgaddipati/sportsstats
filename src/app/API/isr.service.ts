import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, share } from 'rxjs/operators';
import { RESOURCE, ISR, WSR, IWORKORDER, IWORKACTIVITY, ICWISRSTATUSBYWO, WSRSTATUS } from './isr';

@Injectable({
  providedIn: 'root'
})
export class ISRService {
  private baseurl = 'http://sh9aac5/ctmsapi/api/ctms';
  private isrsUrl = 'api/isrs';
  private resUrl = 'api/resources';
  private wsrsUrl = 'api/wsrs';
  private cwisrsturl = "api/custstusbywo"
  private woUrl = 'api/workorders';
  private waUrl = 'api/workactivities';
  private wsrstsUrl = "api/wsrstatus";
  private  httpOptions = {
    headers: new HttpHeaders ({"Content-Type": "application/json"}),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }
  getISRs(): Observable<ISR[]> {
    return this.http.get<ISR[]>(this.isrsUrl)
      /* .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      ); */
  }
  getISRWorks(isrid): Observable<ISR[]> {
    const isrUrl = this.isrsUrl + '/?id='+isrid;
    return this.http.get<ISR[]>(isrUrl,this.httpOptions)
    /* .pipe(
      map((data: ISR[]) => data),
      catchError(this.handleError)
    ); */
  }
  postisr(isr:ISR):Observable<ISR>{
    return this.http.post<ISR>(this.isrsUrl,isr,this.httpOptions);
  }
  putisr(uid, isr:ISR):Observable<ISR>{
    const putUrl = this.isrsUrl + '/'+ uid;
    return this.http.put<ISR>(putUrl,isr, this.httpOptions);
  }
  deleteisr(uid:number){
    const delUrl = this.isrsUrl + '/'+ uid;
    return this.http.delete(delUrl, this.httpOptions);
  }
  getWSRStatuss(): Observable<WSRSTATUS[]> {
    return this.http.get<WSRSTATUS[]>(this.wsrstsUrl);
  }
  getISR(uid): Observable<ISR[]> {
    const isrUrl = this.isrsUrl + '/'+uid;
    return this.http.get<ISR[]>(isrUrl,this.httpOptions)
    /* .pipe(
      map((data: ISR[]) => data),
      catchError(this.handleError)
    ); */
  }
  getCWISRStatusByWO(wo):Observable<ICWISRSTATUSBYWO[]>{
    const cwisrsturl = this.cwisrsturl + '/?WorkOrder='+wo;
    return this.http.get<ICWISRSTATUSBYWO[]>(cwisrsturl,this.httpOptions);
     /* .pipe(
      map((data: ISR[]) => data),
      catchError(this.handleError)
    ); */
  }
  getISRbyDate(uid): Observable<ISR[]> {
    const isrUrl = this.isrsUrl + '/?WeekendDate='+uid;
    return this.http.get<ISR[]>(isrUrl,this.httpOptions);
    /*  .pipe(
      map((data: ISR[]) => data),
      catchError(this.handleError)
    );  */
  }
  getWSRbyDate(uid): Observable<WSR[]> {
    const isrUrl = this.wsrsUrl + '/?WeekendDate='+uid;
    return this.http.get<WSR[]>(isrUrl,this.httpOptions)
    /*  .pipe(
      map((data: WSR[]) => data),
      catchError(this.handleError)
    );  */
  }

  getworkorders(): Observable<IWORKORDER[]> {
    return this.http.get<IWORKORDER[]>(this.woUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getworkactivities(): Observable<IWORKACTIVITY[]> {
    return this.http.get<IWORKACTIVITY[]>(this.waUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getResourceInfo(pin): Observable<RESOURCE[]> {
    const resUrl = this.resUrl + '/?PIN='+pin;
    return this.http.get<RESOURCE[]>(resUrl)
    /* .pipe(
      tap(
        data => console.log(
          JSON.stringify(data)
          )),
      catchError(this.handleError)
    ); */
  }
  //to display work order, skill code hours cost when expand and pdf export Work orders, skills and hours
  getISRDetails(uid): Observable<ISR[]> {
    const Url = this.baseurl + '/isrs/'+uid;
    return this.http.get<ISR[]>(Url,this.httpOptions).pipe(
      map((data: ISR[]) => data),
      catchError(this.handleError)
    );
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
