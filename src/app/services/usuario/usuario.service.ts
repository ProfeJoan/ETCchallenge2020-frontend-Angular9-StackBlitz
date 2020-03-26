import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  // Base url
  baseurl = 'http://localhost:8080/etcchallenge2020-persistence-service/restapiusuario';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  agregarUsuario(usuario): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseurl + '/agregarusuario', usuario, { observe: 'response' })
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    );
  }

  // GET
  obtenerUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseurl + '/obtenerusuarios')
    .pipe(
      retry(1),
      catchError(this.errorAdmin)
    )
  }

  // DELETE
  borrarUsuario(id: string): Observable<HttpResponse<any>>{
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
       errorMessage = error.status + "\n\nEste error se ha producido al lado del usuario.";
     } else {
       // Get server-side error
       errorMessage = error.status;
     }
     console.log("Error:" + error.message);
     return throwError(errorMessage);
  }
}
