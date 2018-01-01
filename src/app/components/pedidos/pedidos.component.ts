import { Component, OnInit } from '@angular/core';
import {PedidosService} from '../../services/pedidos.service';
import {ClientesService} from '../../services/clientes.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

   pedidosCliente:any[]=[];
   cliente:any={};
   productosPorPedido:any[]=[];
  constructor(private _pedidosService:PedidosService,
              private _clienteService:ClientesService,
              private activatedRoute:ActivatedRoute) {


        this.activatedRoute.params.subscribe(
          params =>{
             this._pedidosService.getPedidosByClienteId(params['clienteId']).subscribe(data=>{
              this.pedidosCliente = data;

              for (let i = 0; i < this.pedidosCliente.length; i++) {
                  this._pedidosService.getPedidoProductoByPedidoId(this.pedidosCliente[i].pedidoId).subscribe(
                    data=>{
                        this.productosPorPedido[i] =data;
                    }
                  );
              }

            });
            this._clienteService.getClientesById(params['clienteId']).subscribe(cliente=>{
              this.cliente = cliente;
            });
          });

          console.log(this.productosPorPedido);
   }
getProductosPedido(pedido):any{

  let pedidoProducto:any[]=[];
  this._pedidosService.getPedidoProductoByPedidoId(pedido.pedidoId).subscribe(data=>{
    pedidoProducto = data;
  })


return "1";

}


  ngOnInit() {

  }

  // getPedidosByClienteId(clienteId){
  //   this._pedidosService.getPedidosByClienteId(clienteId).subscribe(pedidos=>{
  //     this.pedidos=pedidos;
  //   })
  // }

}
