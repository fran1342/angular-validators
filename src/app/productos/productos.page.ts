import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { PrecioValidator } from '../validators/precio.validator';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productoForm : FormGroup;
  mensajes={
    "nombre" : [
      {
        type : "required",
        mensaje : "El campo Nombre es requerido"
      },
      {
        type : "maxLength",
        mensaje : "No puede contener mas de 30 caracteres"
      },
      {
        type : "minLength",
        mensaje : "No puede contenes menos de 4 caracteres"
      },
      {
        type : "pattern",
        mensaje : "Solo puede contener letras y espacios"
      }
    ],
    "desc" : [
      {
        type : "required",
        mensaje: "El campo descripcion es requerido"
      }
    ],
    "precioC" : [
      {
        type : "required",
        mensaje: "El campo precio compra es requerido"
      },
      {
        type : "pattern",
        mensaje : "El campo solo puede contener numeros con decimales"
      }
    ],
    "precioV" : [
      {
        type : "required",
        mensaje: "El campo precio venta es requerido"
      },
      {
        type : "pattern",
        mensaje : "El campo solo puede contener numeros con decimales"
      }
    ],
    "precios_diferentes_group" : [
      {
        type:"areDifferent",
        mensaje : "El precio de venta debe ser menos al de compra"
      }
    ],
    "terminos" :  [
      {
        type : "pattern",
        mensaje : "Debes asegurar que si hay productos en existencia"
      }
    ],
    "cantidad" : [
      {
        type: "required",
        mensaje:"El campo cantidad es requerido"
      },
      {
        type : "pattern",
        mensaje:"El campo solo puede contener numeros"
      }
    ]
  }
  
  constructor(
    private formBuilder : FormBuilder,
    private toastCtrl : ToastController
  ) { 
    this.productoForm = this.formBuilder.group(
      {
        nombre : new FormControl('',Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z ]*')
        ])),
        desc : new FormControl('',Validators.required),
        precios_diferentes_group : new FormGroup({
          precioC : new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[1-9]\d*(\.\d+)?$')
          ])),
          precioV : new FormControl('',Validators.compose([
            Validators.required,
            Validators.pattern('^[1-9]\d*(\.\d+)?$')
          ])),
        },(formGroup : FormGroup) => {
          return PrecioValidator.areDifferent(formGroup)
        }),
        cantidad : new FormControl('',Validators.compose([
          Validators.required,
          Validators.pattern('[1-9]*')
        ])),
        terminos : new FormControl(true,Validators.pattern("true"))
      }
    );
  }

  ngOnInit() {
  }

  async guardar(){
    
    if(this.productoForm.valid){
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
