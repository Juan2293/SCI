import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service';
import {Message} from 'primeng/components/common/api';
import {ConfirmationService} from 'primeng/primeng';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
   providers: [],
  styles: []
})
export class ClientesComponent implements OnInit {


  msgs: Message[] = [];

  loading: boolean = false;
  //status servicio
  statusCode: number;
  //all clientes
  clientes:any[]=[];
  //cliente
  cliente:any;
  //abrir/cerrrar modal
  displayDialog:boolean;
  //nuevo cliente
  newCliente:boolean;
  constructor( private _clientesService:ClientesService, private _confirmationService:ConfirmationService) { }

  showSuccess(mesaneje:string) {
      this.msgs = [];
      this.msgs.push({severity:'success', summary:"DONE", detail:mesaneje});
  }

  showError(mensaje:string) {
       this.msgs = [];
       this.msgs.push({severity:'error', summary:"ERROR", detail:mensaje});
   }

   showInfo(mensaje:string) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:"INFO", detail:mensaje});
    }


  ngOnInit() {

      this.getClientes();

  }
  selectCliente(cliente: any) {

        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Cliente Select', detail:'Nombre: ' + cliente.clienteId});
        this.newCliente = false;
        this.cliente = this.cloneCliente(cliente);
        this.displayDialog=true;
    }

    cloneCliente(c: any): any {
      let cliente = new Cliente();
      for(let propiedad in c) {
          cliente[propiedad] = c[propiedad];
      }
      return cliente;
  }

  confirm(cliente:any) {
      this._confirmationService.confirm({
          message: 'Quieres eliminar a <strong>'+ cliente.nombre+'</strong> de tus clientes?',
          accept: () => {
                this.cliente = this.cloneCliente(cliente);
                console.log("confirm ")
                console.log(this.cliente);
                this.deleteCliente(this.cliente);
          }
      });
  }


  showDialogToAdd() {
          this.newCliente = true;
          this.cliente = new Cliente();
          this.displayDialog = true;
      }
  getClientes(){

      this._clientesService.getClientes().subscribe( clientes =>{
      this.clientes = clientes;
    });


  }

  cleanMessage(){

  //setTimeout(this.msgs=[], 3000);
  //this.showError();
  }
  closeDialog(){
    if (this.displayDialog)
        this.displayDialog = false;
  }

  save() {

    let clientes = [...this.clientes];

    if(this.newCliente){

        this._clientesService.createCliente(this.cliente).subscribe(successCode => {
          console.log("success")
        },  response =>{

          this.clientes = clientes;
          this.getClientes();

            console.log("response");
            console.log(response.status);
            this.statusCode =response.status;
            if(this.statusCode === 201){
                this.showSuccess("Se creó el cliente");
            }

        },
        ()=>{
          console.log("fin del servicio")
        });

    }else{
        this._clientesService.updateCliente(this.cliente).subscribe(successCode => {
          console.log(successCode)
        },  response =>{

          this.clientes = clientes;
          this.getClientes();

            console.log("response update");
            console.log(response.status);
            this.statusCode =response.status;
            if(this.statusCode === 201){

            }
        },
      ()=>{
          this.getClientes();
          this.showInfo("Se editó el cliente");
          console.log("fin del servicio update")
        });
    }
        this.cliente = null;
        this.displayDialog = false;
 }
 deleteCliente(cliente:any){

   console.log("elegi el"+cliente);

   this._clientesService.deleteCliente(cliente).subscribe(success=>{

     console.log("delete success")
   },error=>{
     console.log("delete error");
     this.getClientes();
   },()=>{
     console.log("delete ultimo")

   });

 }


}

export class Cliente  {

    constructor(public nombre?, public apellido?, public direccion?, public telefono?, public telefono_fijo?, public correo?) {}
}
