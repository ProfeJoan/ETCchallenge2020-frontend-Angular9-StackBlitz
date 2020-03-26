import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  //constructor() { }

  //ngOnInit(): void { }

  usuarioForm: FormGroup;
  usuariosList: any = [];

  ngOnInit() {
    this.initUsuarioForm();
    this.cargarUsuarios();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public usuarioService: UsuarioService
  ){ }

  initUsuarioForm() {
    this.usuarioForm = this.fb.group({
      id: [null],
      contrasena: [null],
      perfil: [null]
    });
  }

   cargarUsuarios() {
    return this.usuarioService.obtenerUsuarios()
    .subscribe(
      (data: {}) => { (this.usuariosList = data); }
    );
  }

    borrarUsuario(usuario){
      var index = this.usuariosList.map(x => {return x.id}).indexOf(usuario.id);
      return this.usuarioService.borrarUsuario(usuario.id)
       .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Usuario borrado con éxito'); this.usuariosList.splice(index, 1); 
           } else {
             alert("..:: ERROR ::..\n No se pudo borrar el usuario");
             this.router.navigate(['/']);
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo borrar el usuario" + "\n\nCódigo de error: " + err) }
       );
    }

  agregarUsuario() {
    this.usuarioService.agregarUsuario(this.usuarioForm.value)
    .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Usuario agregado con éxito'); this.initUsuarioForm(); this.cargarUsuarios(); 
           } else {
             alert("..:: ERROR ::..\n El Id de usuario ya existe");
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo agregar el usuario" + "\n\nCódigo de error: " + err) }
    );
  }

}
