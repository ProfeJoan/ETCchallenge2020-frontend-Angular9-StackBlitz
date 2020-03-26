import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

//import { AlertaService } from '../../services/autenticacion/alerta.service';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Usuario } from '../../services/usuario/usuario';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AutenticacionComponent implements OnInit,  CanActivate {
    loading = false;
    submitted = false;
    returnUrl: string;
    autenticacionForm: FormGroup;
    usuarioActual: Usuario;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private autenticacionService: AutenticacionService//,
        //private alertaService: AlertaService
    ) {
        // redirecciona al home si está actualmente logueado
        if (this.autenticacionService.usuarioActualValue()) { 
          this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
      this.initAutenticacionForm();
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  initAutenticacionForm() {
    this.autenticacionForm = this.fb.group({
      id: [null],
      contrasena: [null]
    });
  }

    autenticar() {
      this.submitted = true;
      this.loading = true;

      // Se detiene acá si el form es inválido
      if (this.autenticacionForm.invalid) {return;}

        
      this.autenticacionService.login(this.autenticacionForm.controls.id.value, this.autenticacionForm.controls.contrasena.value)
          //.pipe(first())
          .subscribe(
              data => { 
                 if (data) {
                   this.router.navigate(['/home']);
                 } else {
                   alert("Id o contraseña no válidos");
                 };
              },
              error => { this.loading = false;  alert("..::ERROR::.." + "\n\n" + error.message + "\n\n" + error.status); }
          );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //const usuarioActual = this.autenticacionService.usuarioActualValue;
        //const usuarioActual = this.autenticacionService.usuarioActualValue;
        //if (usuarioActual) {
        if (this.autenticacionService.usuarioActualValue()) {
            // Si está autorizado return true
            //alert("canActivate >>> true");
            return true;
        } else {
          // Si no está logueado redirecciona a la página de autenticación
          this.router.navigate(['/autenticacion'], { queryParams: { returnUrl: state.url }});
          //alert("canActivate >>> false");
          return false;
        }
    }

}

