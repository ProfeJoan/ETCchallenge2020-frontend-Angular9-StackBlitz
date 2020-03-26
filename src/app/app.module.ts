import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Http client module */
import { HttpClientModule } from '@angular/common/http';

/* Forms module */
import { ReactiveFormsModule } from '@angular/forms';

/* app services */
import { ClienteService } from './services/cliente/cliente.service';
import { ParqueoService } from './services/parqueo/parqueo.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { AutenticacionService } from './services/autenticacion/autenticacion.service';

/* app components */
import { ClienteComponent } from './components/cliente/cliente.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ParqueoComponent,
    UsuarioComponent,
    HomeComponent,
    AutenticacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    //ClienteService,
    //ParqueoService,
    //UsuarioService,
    //HomeService,
    //AutenticacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
