import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Usuario } from '../../services/usuario/usuario';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    title = 'ETCchallenge2020';
    usuarioActual: Usuario;
    usuarioActualLbl: string;

    constructor(
        private router: Router,
        private autenticacionService: AutenticacionService
    ) {
        this.usuarioActual = this.autenticacionService.usuarioActualValue();
        if (this.usuarioActual){
          this.usuarioActualLbl = this.usuarioActual.id;
          //this.router.navigate(['/']);
        } else {
          alert('Usuario en null');
          this.usuarioActualLbl = "";
        }
    }
}
