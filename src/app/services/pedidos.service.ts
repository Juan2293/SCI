import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PedidosService {

pedidos:any[]=[];
ip_servicios:string = "192.168.0.12";


  constructor(private http:HttpClient) { }

  createPedido(pedido:any){

       return  this.http.post('http://'+this.ip_servicios+':8080/user/pedido',pedido).map(
         (success:any) => {
           console.log("funciono create pedido  ");
           console.log(success.status);

         },
         err => {
           console.log("Error occured create");
         }
       );
  }

}
