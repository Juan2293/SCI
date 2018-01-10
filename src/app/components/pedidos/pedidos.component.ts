import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import {PedidosService} from '../../services/pedidos.service';
import {ClientesService} from '../../services/clientes.service';
import {ActivatedRoute} from '@angular/router';
import {MensajesService} from '../../services/mensajes.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

   pedidosCliente: any[]= [];
   cliente: any= {};
   productosPorPedido: any[]= [];
   msg: any = '';
  constructor(private _pedidosService: PedidosService,
              private _clienteService: ClientesService,
              private activatedRoute: ActivatedRoute,
              private _confirmationService: ConfirmationService,
              private _mensajesService: MensajesService) {}


  ngOnInit() {
   this. getPedidosCliente();
  }

  getPedidosCliente() {
    this.activatedRoute.params.subscribe(
      params => {
         this._pedidosService.getPedidosByClienteId(params['clienteId']).subscribe(data => {
          this.pedidosCliente = data;

          for (let i = 0; i < this.pedidosCliente.length; i++) {
              this._pedidosService.getPedidoProductoByPedidoId(this.pedidosCliente[i].pedidoId).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
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

  archivarPedido(pedido) {

    pedido.archivado = true;
    this._pedidosService.archivarPedido(pedido).subscribe(success => {
      this.msg =  this._mensajesService.showInfo('Se archivó el pedido');
      this.getPedidosCliente();
    }, error => {
      console.error('ocurrio error');
    })
  }

  confirmArchivar(pedido: any) {

    this._confirmationService.confirm({

        message: '¿Archivar el pedido?',
        accept: () => {
            this.archivarPedido(pedido);
        }
    });
}
}
