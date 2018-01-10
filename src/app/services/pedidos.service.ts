import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PedidosService {

pedidos: any;
url = 'http://192.168.0.12:8080/user/';
pedidoProducto: any[] = [];

  constructor(private http: HttpClient) { }

  createPedido(pedidoDTO) {

      // let body = JSON.stringify(pedidoDTO);
      // let headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       return  this.http.post(this.url + 'pedido', pedidoDTO).map(
         (success: any) => {
           console.log('funciono create pedido');
         },
         err => {
           console.log('Error occured create');
         }
       );
  }
  getPedidos() {
    return this.http.get(this.url + 'pedidos').map((data: any) => {
        this.pedidos = data;
        return this.pedidos;
      })
  }


  getPedidosByClienteId(cliente: any) {

     return this.http.get(this.url + 'pedidos/' + cliente ).map((data: any) => {
        this.pedidos = data;
        return this.pedidos;

      })
  }



  getPedidoProductoByPedidoId(pedidoId) {

    return this.http.get(this.url + 'pedido-producto/' + pedidoId).map((data: any) => {
      this.pedidoProducto = data;
      return this.pedidoProducto;
    })
  }

  archivarPedido(pedido) {

   return this.http.put(this.url + 'pedido', pedido).map((success: any) => {
      console.log('se archivó el pedido');
    }, error => {
      console.error('error en el archivar pedido');
    });
  }

}
class PedidoProducto {
    constructor(
      public pedido?,
      public producto?,
      public valor?,
      public cantidad?
    ) { }
}
