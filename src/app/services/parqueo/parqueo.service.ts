import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Parqueo } from './parqueo';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ParqueoService {

  // Base url
  baseurl = 'http://localhost:8080/etcchallenge2020-persistence-service/restapiparqueo';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  agregarParqueo(parqueo): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseurl + '/agregarparqueo', parqueo, { observe: 'response' })
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    )
  }

  // GET
  obtenerParqueos(): Observable<Parqueo> {
    return this.http.get<Parqueo>(this.baseurl + '/obtenerparqueos')
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    )
  }

  // DELETE
  borrarParqueo(id: string): Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.baseurl + `/${id}`, { observe: 'response' })
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    )
  }

  // Manejo de la exception
  errorAdmin(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.status + "\n\nEste error se ha producido al lado del cliente.";
     } else {
       // Get server-side error
       errorMessage = error.status;
     }
     console.log("Error:" + error.message);
     return throwError(errorMessage);
  }
}
