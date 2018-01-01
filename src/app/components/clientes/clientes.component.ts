import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {ClientesService} from '../../services/clientes.service';
import {ConfirmationService} from 'primeng/primeng';
import {MensajesService} from '../../services/mensajes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
   providers: [],
  styles: []
})
export class ClientesComponent implements OnInit {

  //mensaje
  msgs:any[]=[];
  //status servicio
  statusCode: number;
  //all clientes
  clientes:any[]=[];
  //nuevo cliente
  newCliente:boolean;
  //validaciones
  clienteForm:any;

  constructor(

    private _clientesService:ClientesService,
    private _confirmationService:ConfirmationService,
    private _mensajesService:MensajesService,
    private formBuilder:FormBuilder,
    private router:Router
  ){

    this.clienteForm = this.formBuilder.group({
      'clienteId': new FormControl(),
      'nombre': new FormControl('',Validators.required),
      'apellido':new FormControl('',Validators.required),
      'direccion':new FormControl('',Validators.required),
      'correo':new FormControl(),
      'telefono':new FormControl('',Validators.required),
      'telefono_fijo':new FormControl()
    });

  }

  ngOnInit() {
      this.getClientes();
  }

  selectCliente(cliente: any) {
        this.newCliente = false;
        this.clienteForm.reset(cliente);
    }

  cloneCliente(c: any): any {
      let cliente = new Cliente();
      for(let propiedad in c) {
          cliente[propiedad] = c[propiedad];
      }
      return cliente;
  }

  confirm(clienteDT:any) {
      this._confirmationService.confirm({
          message: 'Quieres eliminar a <strong>'+ clienteDT.nombre+'</strong> de tus clientes?',
          accept: () => {
                let cliente = this.cloneCliente(clienteDT);
                this.deleteCliente(cliente);
          }
      });
  }

  showDialogToAdd() {
          this.newCliente = true;
          this.clienteForm.reset();
    }

  getClientes(){
      this._clientesService.getClientes().subscribe( clientes =>{
      this.clientes = clientes;
    });
  }

  save() {
    let cliente = this.clienteForm.value;
    if(this.newCliente){
        this._clientesService.createCliente(cliente).subscribe(successCode => {
        },  response =>{
          this.getClientes();
            this.statusCode =response.status;
            if(this.statusCode === 201){
                this.msgs = this._mensajesService.showSuccess("Se creó el cliente");
            }
        },
        ()=>{
        });
            this.clienteForm.reset();
    }else{
        this._clientesService.updateCliente(cliente).subscribe(
        response => {
        },
        error =>{        },
        ()=>{
          this.getClientes();
          this.msgs = this._mensajesService.showInfo("Se editó el cliente");
        });
    }

 }

 deleteCliente(cliente:any){
   this._clientesService.deleteCliente(cliente).subscribe(success=>{
   },error=>{
     this.msgs =  this._mensajesService.showError("Se eliminó el cliente");
     this.getClientes();
   },()=>{
   });
 }

 pedidosCliente(cliente:any){
    let nombre =  cliente.nombre.toLowerCase();
     this.router.navigate(['/pedidos',nombre,cliente.clienteId]);
 }

}

export class Cliente  {

    constructor(
      public nombre?,
      public apellido?,
      public direccion?,
      public telefono?,
      public telefono_fijo?,
      public correo?) {}
}
