import { Component, OnInit } from '@angular/core';
import {PedidosService} from '../../services/pedidos.service';
import {ClientesService} from '../../services/clientes.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

   pedidosCliente: any[]= [];
   cliente: any= {};
   productosPorPedido: any[]= [];
  constructor(private _pedidosService: PedidosService,
              private _clienteService: ClientesService,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
         this._pedidosService.getPedidosByClienteId(params['clienteId']).subscribe(data=>{
          this.pedidosCliente = data;

          for (let i = 0; i < this.pedidosCliente.length; i++) {
              this._pedidosService.getPedidoProductoByPedidoId(this.pedidosCliente[i].pedidoId).subscribe(
                data => {
                    this.productosPorPedido[i] = data;
                }
              );
          }

        });
        this._clienteService.getClientesById(params['clienteId']).subscribe(cliente => {
          this.cliente = cliente;
        });
      });
  }


}
