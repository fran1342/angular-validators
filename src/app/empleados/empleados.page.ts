import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleadoForm : FormGroup;
  mensajes = {
    "nombre" : [
      {
        type : "required",
        mensaje : "El campo Nombre es requerido"
      },
      {
        type : "maxLength",
        mensaje : "No puede contener mas de 70 caracteres"
      },
      {
        type : "minLength",
        mensaje : "No puede contenes menos de 10 caracteres"
      },
      {
        type : "pattern",
        mensaje : "Solo puede contener letras y espacios"
      }
    ],
    "curp" : [
      {
        type : "required",
        mensaje: "El campo curp es requerido"
      },
      {
        type : "pattern",
        mensaje : "El curp es incorrecto"
      }
    ],
    "gen" : [
      {
        type : "required",
        mensaje : "El campo genero es requerido"
      }
    ],
    "fecha" : [
      {
        type : "required",
        mensaje : "El campo fecha es requerido"
      }
    ],
    "salario" : [
      {
        type : "required",
        mensaje: "El campo salario es requerido"
      },
      {
        type : "pattern",
        mensaje : "El campo solo puede contener numeros con decimales"
      }
    ],
    "depa" : [
      {
        type : "required",
        mensaje : "El campo departamento es requerido"
      }
    ],
    "jefe" : [
      {
        type : "required",
        mensaje : "El campo jefe directo Nombre es requerido"
      },
      {
        type : "maxLength",
        mensaje : "No puede contener mas de 70 caracteres"
      },
      {
        type : "minLength",
        mensaje : "No puede contenes menos de 10 caracteres"
      },
      {
        type : "pattern",
        mensaje : "Solo puede contener letras y espacios"
      }
    ],
    "terminos" : [
      {
        type: "pattern",
        mensaje : "Se deben validar los documentos del empleado"
      }
    ]
  }

  constructor(
    private formBuilder : FormBuilder,
    private toastCtrl : ToastController
  ) { 
    this.empleadoForm = this.formBuilder.group(
      {
        nombre : new FormControl('',Validators.compose([
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*')
        ])),
        curp : new FormControl('',Validators.compose([
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(18),
          Validators.pattern('/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/')
        ])),
        gen : new FormControl('',Validators.required),
        fecha : new FormControl('',Validators.required),
        salario : new FormControl('',Validators.compose([
          Validators.required,
          Validators.pattern('^[1-9]\d*(\.\d+)?$')
        ])),
        depa : new FormControl('',Validators.required),
        jefe : new FormControl('',Validators.compose([
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*')
        ])),
        terminos : new FormControl('',Validators.pattern('true'))
      }
    );
  }

  ngOnInit() {
  }

  async guardar(){
    
    if(this.empleadoForm.valid){
      let alerta= await this.toastCtrl.create({
        message:"registro correcto",
        position : "top",
        duration : 4000,
        color : "success"
      });
      alerta.present();
    }else{
      let alerta= await this.toastCtrl.create({
        message:"Todos los campos son requeridos",
        position : "top",
        duration : 4000,
        color : "danger"
      });
      alerta.present();
      return;
    }
  }

}
