import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs/add/operator/map'


@Injectable()
export class ProductosService {

  productos:any;
  url:string = "http://192.168.0.12:8080/user/";

  constructor(private http:HttpClient) {

  }

  getProductos(){
    return this.http.get(this.url+"productos").map( (resp:any)=>{
      this.productos = resp;
      return this.productos;
    });
  }

  createProducto(producto:any){
    return this.http.post(this.url+"producto",producto).map(this.extractData);
  }
  deleteProducto(producto:any){
    return this.http.delete(this.url+"producto/"+producto.productoId).map(response=>{
    },error=>{
    });
  }
  updateProducto(producto:any){
    return this.http.put(this.url+"producto",producto);
  }

  private extractData(res: Response) {
      return res.text() ? res.json() : {}; ;
  }
}


export interface Producto{

 nombre: string;
 valor: number;
 cantidad_total:number;
 cantidad_disponible:number;

}
