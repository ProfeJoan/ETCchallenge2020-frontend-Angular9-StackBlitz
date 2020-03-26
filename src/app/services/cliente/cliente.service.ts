import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  // Base url
  baseurl = 'http://localhost:8080/etcchallenge2020-persistence-service/restapicliente';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  agregarCliente(cliente): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseurl + '/agregarcliente', cliente, { observe: 'response' })
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    );
  }

  // GET
  obtenerClientes(): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseurl + '/obtenerclientes')
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    )
  }

  // DELETE
  borrarCliente(id: string): Observable<HttpResponse<any>>{
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
