import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Usuario } from './services/usuario/usuario';
import { AutenticacionService } from './services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ETC Challenge2020';

    constructor(
        private router: Router,
        private autenticacionService: AutenticacionService
    ) { }

    logout() {
        this.autenticacionService.logout();
        this.router.navigate(['/autenticacion']);
    }
}
