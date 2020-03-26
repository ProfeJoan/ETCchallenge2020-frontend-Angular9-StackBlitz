import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Usuario} from "../usuario/usuario";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {

    public usuarioActualSubject: BehaviorSubject<Usuario>;
    public usuarioActual: Observable<Usuario>;

    // Base url
    baseurl = 'http://localhost:8080/etcchallenge2020-persistence-service/restapiusuario';

    constructor(private http: HttpClient) {
        this.usuarioActualSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioActual')));
        this.usuarioActual = this.usuarioActualSubject.asObservable();
    }

    usuarioActualValue(): Usuario {
        return this.usuarioActualSubject.value;
        //return localStorage.getItem('usuarioActual');
    }

    login(id: string, contrasena: string): Observable<Usuario> {
        return this.http.post<Usuario>(this.baseurl + `/autenticacion`, { id, contrasena })
            .pipe(map (user => {
                if (user) {
                    localStorage.setItem('usuarioActual', JSON.stringify(user));
                    this.usuarioActualSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('usuarioActual');
        //this.usuarioActual = null;
        this.usuarioActualSubject.next(null);
        //this.usuarioActualSubject = null;
    }

}
