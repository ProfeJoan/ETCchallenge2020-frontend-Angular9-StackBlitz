import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { AuthGuard } from './misc/auth.guard';


const routes: Routes = [

  // Todas la rutas estan protegidas por CanActivate en caso de usuario sin loguear
  { path: '', pathMatch: 'full', component: AutenticacionComponent, canActivate: [AutenticacionComponent] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AutenticacionComponent] },
  { path: 'parqueo', component: ParqueoComponent, canActivate: [AutenticacionComponent] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AutenticacionComponent] },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionComponent] },
  { path: 'autenticacion', component: AutenticacionComponent },

  // Para cualquier otro path ingresado redirecciona a '/' que igual esta protegido por CanActivate
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
