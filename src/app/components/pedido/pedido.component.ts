import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent {

    selectedCliente:any = [];
  clientes:SelectItem [] = [];

  constructor(private _clientesService:ClientesService) {
    this.selectedCliente=null
    this.getClientes();
  }


  //se llena el Dropdown
  getClientes(){

      this.clientes.push( {label:'Seleccionar Cliente', value:null});
      this._clientesService.getClientes().subscribe( clientes =>{
      for(let cliente of clientes){
          this.clientes.push({label:cliente.nombre+" "+cliente.apellido, value:cliente })
      }

    });
  }

}
