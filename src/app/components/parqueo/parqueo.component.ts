import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ParqueoService } from '../../services/parqueo/parqueo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parqueo',
  templateUrl: './parqueo.component.html',
  styleUrls: ['./parqueo.component.css']
})
export class ParqueoComponent implements OnInit {

  //constructor() { }

  //ngOnInit(): void { }

  parqueoForm: FormGroup;
  parqueosList: any = [];

  ngOnInit() {
    this.initParqueoForm();
    this.cargarParqueos();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public parqueoService: ParqueoService
  ){ }

  initParqueoForm() {
    this.parqueoForm = this.fb.group({
      id: [null],
      nombre: [null],
      telefono: [null],
      ubicacion: [null]
    });
  }

   cargarParqueos() {
    return this.parqueoService.obtenerParqueos()
    .subscribe(
      (data: {}) => { (this.parqueosList = data); }
    );
  }

    borrarParqueo(parqueo){
      var index = this.parqueosList.map(x => {return x.nombre}).indexOf(parqueo.nombre);
      return this.parqueoService.borrarParqueo(parqueo.id)
       .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Parqueo borrado con éxito'); this.parqueosList.splice(index, 1); 
           } else {
             alert("..:: ERROR ::..\n No se pudo borrar el parqueo");
             this.router.navigate(['/']);
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo borrar el parqueo" + "\n\nCódigo de error: " + err) }
       );
    }

  agregarParqueo() {
    this.parqueoService.agregarParqueo(this.parqueoForm.value)
    .subscribe(
         res => {
           if (JSON.stringify(res.body) === "true"){
             alert('Parqueo agregado con éxito'); this.initParqueoForm(); this.cargarParqueos(); 
           } else {
             alert("..:: ERROR ::..\n El Id de parqueo ya existe");
           };
         },
         err => { alert("..:: ERROR ::..\n No se pudo agregar el parqueo" + "\n\nCódigo de error: " + err) }
    );
  }

}
