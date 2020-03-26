import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacionService } from '../services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    router: Router;
    autenticacionService: AutenticacionService;

    constructor() {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //const usuarioActual = this.autenticacionService.usuarioActualValue;
        //const usuarioActual = this.autenticacionService.usuarioActualValue;
        //if (usuarioActual) {
        if (this.autenticacionService.usuarioActualValue) {
            // Si está autorizado return true
            //alert("AUTH");
            return true;
        } else {
          // Si no está logueado redirecciona a la página de autenticación
          this.router.navigate(['/autenticacion'], { queryParams: { returnUrl: state.url }});
          return false;
        }
    }
}
