import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PedidosService {

pedidos:any[]=[];
url:string = "http://192.168.0.12:8080/user/";


  constructor(private http:HttpClient) { }

  createPedido(pedidoDTO){

       return  this.http.post(this.url+'pedido',pedidoDTO).map(
         (success:any) => {
           console.log("funciono create pedido");
         },
         err => {
           console.log("Error occured create");
         }
       );
  }

  getPedidos(){

    return this.http.get(this.url+'pedidos').map((data:any)=>{
        this.pedidos=data;
        return this.pedidos;
      })
  }

}
class PedidoProducto{
    constructor(
      public pedido?,
      public producto?,
      public valor?,
      public cantidad?
    ){}
}
