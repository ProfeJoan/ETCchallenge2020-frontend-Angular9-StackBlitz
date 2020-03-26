import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

import { ClienteService } from '../../services/cliente/cliente.service';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Usuario } from '../../services/usuario/usuario';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  //constructor() { }

  //ngOnInit(): void { }

  usuarioActual: Usuario;
  usuarioActualSubscription: Subscription;
  clienteForm: FormGroup;
  clientesList: any = [];

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public clienteService: ClienteService,
    private autenticacionService: AutenticacionService
  ){ 
    this.usuarioActualSubscription = this.autenticacionService.usuarioActual.subscribe(user => {
      this.usuarioActual = user;
    });
   }

  ngOnInit() {
    this.initClienteForm();
    this.cargarClientes();
  }

  initClienteForm() {
    this.clienteForm = this.fb.group({
      id: [null],
      nombre: [null],
      correo: [null]
    });
  }

   cargarClientes() {
    return this.clienteService.obtenerClientes()
    .subscribe(
      (data: {}) => { (this.clientesList = data); }
    );
  }

    borrarCliente(cliente){
      var index = this.clientesList.map(x => {return x.nombre}).indexOf(cliente.nombre);
      return this.clienteService.borrarCliente(cliente.id)
       .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Cliente borrado con éxito'); this.clientesList.splice(index, 1); 
           } else {
             alert("..:: ERROR ::..\n No se pudo borrar el cliente");
             this.router.navigate(['/']);
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo borrar el cliente" + "\n\nCódigo de error: " + err) }
       );
    }

  agregarCliente() {
    this.clienteService.agregarCliente(this.clienteForm.value)
    .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Cliente agregado con éxito'); this.initClienteForm(); this.cargarClientes(); 
           } else {
             alert("..:: ERROR ::..\n El Id de cliente ya existe");
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo agregar el cliente" + "\n\nCódigo de error: " + err) }
    );
  }

}
